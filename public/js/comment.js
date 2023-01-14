const commentHandler = async (event) => {
    event.preventDefault();

    const wholeRoute = window.location.toString().split('/')
    const id = (wholeRoute[4]);
    console.log(id);

        const comment_content = document.querySelector('#yourComment').value.trim();

        if (comment_content) {
            const response = await fetch(`/api/comment/${id}`, {
                method: 'POST',
                body: JSON.stringify({ comment_content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace(`/post/${id}`);
            } else {
                alert('Failed to create comment');
            }
        }
    };

    document
        .querySelector('.newComment')
        .addEventListener('submit', commentHandler);