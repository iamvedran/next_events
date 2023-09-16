import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils'

const handler = async (req, res) => {
    const eventId = req.query.eventId;

    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        console.log("Database connection failed.")
        res.status(500).json({ message: 'Database connection failed.' });
        return;
    }


    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !text.trim() === '' || !name.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' });
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
        } catch (error) {
            res.status(500).json({ message: 'Inserting document failed.' });
        }

        newComment._id = result.insertedId;

        console.log(result);

        res.status(201).json({ message: 'Inserted comment!', comment: newComment });
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 });
            res.status(200).json({ comments: documents.filter(doc => doc.eventId === eventId) });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
            return;
        }
    }

    client.close();
}

export default handler;