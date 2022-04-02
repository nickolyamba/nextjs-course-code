import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        try {
            const client = await connectDatabase();
            await insertDocument(client, 'newsletter', { email: userEmail });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Inserting data failed!' });
            return;
        }

        res.status(201).json({ message: 'Signed up!' });
    }
}

export default handler;
