const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-text').value.trim();

  if (title && content) {
    console.log(title)
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        content 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);