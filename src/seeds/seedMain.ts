import 'dotenv/config';
import { connect } from 'mongoose';
import SeederUser from './_seedData/users';
import SeederRole from './_seedData/roles';
import SeederUserRole from './_seedData/user-role';
import SeederTenant from './_seedData/tenant';

export interface SeedDataModel {
    data: any[];
    collectionName: string;
}

const dbConn = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const mongoUrl = `${dbConn}/${dbName}`;

// Connect database
const connectDatabase = async () => {
    return connect(mongoUrl);
};

const seeders = [
    SeederTenant,
    SeederRole,
    SeederUser,
    SeederUserRole,
];

const seed = async () => {
    try {
        connectDatabase().then(async (client) => {
            seeders.forEach((model) => {
                // client.connection.db
                //     .collection(model.collectionName)
                //     .deleteMany({});

                client.connection.db
                    .collection(model.collectionName)
                    .countDocuments((error, count: number) => {
                        if (error) {
                            console.log('seed error', error);
                            return;
                        }

                        if (count === 0) {
                            client.connection.db
                                .collection(model.collectionName)
                                .insertMany(model.data)
                                .then((result) => {
                                    console.log(
                                        `insert ${model.collectionName} success`,
                                        result,
                                    );
                                })
                                .catch(function (error) {
                                    console.log(
                                        `insert ${model.collectionName} error`,
                                        error,
                                    );
                                });
                        }
                    });
            });
        });
    } catch (err) {
        console.log(err);
    }
};

seed().then(() => console.log('Seed success'));
