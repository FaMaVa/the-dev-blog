const commentHandler = async (event) => {
    event.preventDefault();

    const comment_content = document.querySelector('#yourComment').value.trim();

    if (comment_content) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment_content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/dashboard/${user_id}`);
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('.newComment')
    .addEventListener('submit', newFormHandler);