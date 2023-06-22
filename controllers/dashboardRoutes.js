const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include:{
              model: User,
              attributes: ['name'],
            }
          }
        ]
      });

      if(!postData){
        res.status(404).json({message:"No Post with that id" })
      }
  
      const post = postData.get({ plain: true });
  
      res.render('edit', {
        ...post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;