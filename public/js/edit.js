





const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-text').value.trim();

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      console.log(id)

      if (title && content) {
        console.log(title)
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            title, 
            content 
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace(`/post/${id}`);
        } else {
          alert('Failed to update post');
        }
      }
    }
  };


  document
  .querySelector('.update-post-form')
  .addEventListener('click', newFormHandler);