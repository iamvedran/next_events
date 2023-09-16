import { connectDatabase, insertDocument } from '../../helpers/db-utils';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
        }

        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: 'Database connection failed.' });
            return;
        }
        try {
            await insertDocument(client, 'newsletter', { email: userEmail });
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting document failed.' });
            return;
        }

        res.status(201).json({ message: 'Success!' });
    }
}

export default handler;