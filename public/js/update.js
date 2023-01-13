const updatePostHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#content').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ post_title, post_content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    };

document
    .querySelector('.update')
    .addEventListener('submit', updatePostHandler);


const delPostHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    
};

document
    .querySelector('.delete')
    .addEventListener('button', delPostHandler);