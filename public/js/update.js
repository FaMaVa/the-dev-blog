const updatePostHandler = async (event) => {
  event.preventDefault();

  const wholeRoute = window.location.toString().split('/')
  const seperatedId = (wholeRoute[5].toString().split('?'));
  const id = (seperatedId[0]);
  console.log(wholeRoute);

  const post_title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();

  await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });


  document.location.replace('/dashboard');
};

document
  .querySelector('#update-post')
  .addEventListener('click', updatePostHandler);


const delPostHandler = async (event) => {
  event.preventDefault();

  const wholeRoute = window.location.toString().split('/')
  const seperatedId = (wholeRoute[5].toString().split('?'));
  const id = (seperatedId[0]);
  console.log(id);


  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard/');

};

document
  .querySelector('#delete-post')
  .addEventListener('click', delPostHandler);