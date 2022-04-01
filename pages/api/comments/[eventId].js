import dbService from '../../../services/DbService';

async function commentsHandler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email || !name || !text) {
            return res.status(400).json({
                message: 'Email, name, and text are required',
            });
        }

        console.log({ email, name, text });

        const commentId = new Date().getTime();
        const savedObj = await dbService.addComment(eventId, { email, name, text, id: commentId });

        res.status(201).send({
            message: 'Successfully saved to database',
            ...savedObj,
        });
    } else if (req.method === 'GET') {
        const comments = await dbService.getComments(eventId);
        comments.sort((a, b) => b.id - a.id);
        res.status(200).json(comments);
    } else {
        return res.status(400).json({ message: 'Invalid REST Method' });
    }
}

export default commentsHandler;
