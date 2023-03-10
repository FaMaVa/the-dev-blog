const newPostHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#yourTitle').value.trim();
  const post_content = document.querySelector('#yourContent').value.trim();

  if (post_title && post_content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ post_title, post_content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.replace('/dashboard')
  }
};

document
  .querySelector('.newPost')
  .addEventListener('submit', newPostHandler);