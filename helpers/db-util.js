import { MongoClient } from 'mongodb';

async function connectDatabase() {
    try {
        const client = await MongoClient.connect(
            'mongodb+srv://nick:iuRzeKTFvsphU233@cluster.gybv3.mongodb.net/events?retryWrites=true&w=majority'
        );

        return client;
    } catch (error) {
        console.error(error);
    }
}

async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}

async function getAllDocuments(client, collection, sort) {
    const db = client.db();

    const documents = await db.collection(collection).find().sort(sort).toArray();

    return documents;
}

export { connectDatabase, getAllDocuments, insertDocument };
