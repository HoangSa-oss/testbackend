import 'dotenv/config';
import { connect } from 'mongoose';

const dbConn = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const mongoUrl = `${dbConn}/${dbName}`;
const domain_collection = 'domains';

// Connect database
const connectDatabase = async () => {
    return await connect(mongoUrl);
};

let domainsCached = [];

export function getQueryParam(url, paramName) {
    const regex = new RegExp(`[?&]${paramName}=([^&#]*)`, 'i');
    const result = regex.exec(url);
    return result ? decodeURIComponent(result[1]) : null;
}

export async function getWhiteListDomains(cached = false) {
    try {
        if (domainsCached.length && !cached) return domainsCached;
        console.log('getWhiteListDomains');
        const client = await connectDatabase();
        const collection = client.connection.db.collection(domain_collection);
        const filter = { active: true };
        const projection = { url: 1, _id: 0 }; // Exclude _id field

        const cursor = collection.find(filter, { projection });
        const domains = await cursor.toArray();
        domainsCached = domains.map((d: any) => d.url);
        return domainsCached;
    } catch (err) {
        console.log(err);
        return [];
    }
}
