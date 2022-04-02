import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/db-util';

async function handler(req, res) {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId,
        };

        let result;

        try {
            const client = await connectDatabase();
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added comment.', comment: newComment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Inserting comment failed!' });
        }
    }

    if (req.method === 'GET') {
        try {
            const client = await connectDatabase();
            const documents = await getAllDocuments(client, 'comments', { _id: -1 });
            res.status(200).json({ comments: documents });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Getting comments failed.' });
        }
    }
}

export default handler;
