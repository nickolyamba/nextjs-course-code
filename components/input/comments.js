import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
    const router = useRouter();
    const { eventId } = router.query;
    const { data, error } = useSWR(`/api/comments/${eventId}`);

    const [comments, setComments] = useState(null);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        console.log({ data });
        if (data) {
            setComments(data);
        }
    }, [data]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => {
            return !prevStatus;
        });
    }

    async function addCommentHandler(commentData) {
        // send data to API
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
            timeout: 3000,
        };

        try {
            const response = await fetch(`/api/comments/${eventId}`, reqOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const newCommnent = await response.json();
            setComments((comments) => [newCommnent, ...comments]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList comments={comments} />}
        </section>
    );
}

// export const getStaticProps = async (ctx) => {
//     const { eventId } = ctx.params;
//     const comments = await dbService.getComments(eventId);

//     return {
//         props: {
//             comments,
//             revalidate: 10,
//         },
//     };
// };

export default Comments;
