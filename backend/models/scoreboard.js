const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

//TODO: mongoDB docs say you should only create one client instance and reuser servlets??

/**
 * We will do the following
 * 1. Connect to the mongoDB cluster
 * 2. Call functions that query the database
 * 3. Disconnect from the cluster
 */

// Connection uri
const uri = process.env.mongodbUri;

// Create an instance of the Mongo Client
const client = new MongoClient(uri);

async function main() {

    // Connect to the client
    try {
        await client.connect();

        // Return all the databases in the cluster
        // await listDatabases(client);

        // Create: add one document
        // await createRanking(client, {
        //     name: "Player 4.5",
        //     score: 1500,
        //     date_added: new Date()
        // });

        // Return top 5 results
        return await findTopFiveScores(client);


        // await collectionLength(client);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}


/**
 * Return all the Databases within our mongo cluster
 * @param {MongoClient} client mongoClient
 */
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}

/**
 * Add one new document
 * @param {Object} newPlayer - A new player who just completed their game session
 * @param {string} newPlayer.name - The name of the player
 * @param {number} newPlayer.score - The end score of the player's current game session
 * @param {Date} newPlayer.date_added - The date the score was added
 */
async function createRanking(newPlayer) {

    try {
        await client.connect();

        // Access the "project_2048" database > "scoresAndRanks" collection
        const result = await client.db("project_2048").collection("scoresAndRanks").insertOne(newPlayer); // insertOne will add a single document to the collection

        console.log(`New score created with the following id: ${result.insertedId}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }


}

/**
 * Add many documents
 * @param {MongoClient} client mongoDB client instance
 * @param {Object} newPlayer - A new player who just completed their game session
 * @param {string} newPlayer.name - The name of the player
 * @param {number} newPlayer.score - The end score of the player's current game session
 * @param {Date} newPlayer.date_added - The date the score was added
 */
async function createMultipleRankings(client, newPlayers) {

    // Access the "project_2048" database > "scoresAndRanks" collection
    const results = await client.db("project_2048").collection("scoresAndRanks").insertMany(newPlayers);

    console.log(`${results.insertedCount} new listings created with the following id(s):`);
    console.log(results.insertedIds);
}

/**
 * Find the top 5 highest score entries
 */
async function findTopFiveScores() {

    // Connect to the client
    try {
        await client.connect();

        // Return top 5 results
        const result = await client.db("project_2048").collection("scoresAndRanks")
            .aggregate([
                // Sort all entries by highest score
                { $sort: { score: -1 } },
                // Take the top 5 scores
                { $limit: 5 }
            ])
            .toArray();

        return result;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

/**
 * Get the total number of documents in the collection
 * @param {MongoClient} client mongoDB client instance
 */
async function collectionLength(client) {

    const count = await client.db("project_2048").collection("scoresAndRanks")
        .count();

    console.log(`${count} document(s) exist in this collection`);
}

// Run main, but also catch and show any errors
// main().catch(console.error);

module.exports = {
    findTopFiveScores,
    createRanking
};