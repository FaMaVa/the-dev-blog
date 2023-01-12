const updatePostHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#content').value.trim();

    if (post_title && description) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ post_title, post_content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert('Failed to update post');
        }
    }
};

document
    .querySelector('.update')
    .addEventListener('submit', updatePostHandler);


const delPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.delete')
    .addEventListener('button', delPostHandler);