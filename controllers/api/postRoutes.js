const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async  (req,res) =>{
  try{
    const postData = await Post.findAll({})
    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts)
  } catch (err){
    res.status(500).json(err)
  }
 })


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',withAuth, async (req,res)=>{
  try{
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    if(!updatedPost[0]) {
      res.status(404).json({ message: 'No Post with this ID!'})
    }

    res.status(200).json(updatedPost)
  }catch (err) {
    res.status(500).json(err)
  }
})









router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
