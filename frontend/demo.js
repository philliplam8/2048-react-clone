
const { MongoClient, ServerApiVersion } = require('mongodb');

/**
 * We will do the following in the main function
 * 1. Connect to the mongoDB cluster
 * 2. Call functions that query the database
 * 3. Disconnect from the cluster
 */
async function main() {

    // Connection uri
    const uri = "mongodb+srv://admin:nIoCwOUCZQLXmLSP@cluster0.ojile.mongodb.net/?retryWrites=true&w=majority";

    // Create an instance of the mongo client
    const client = new MongoClient(uri);

    // CONNECT TO CLIENT
    // Since client.connect could return an error, let's wrap this in a try/catch
    //   tryCode - Code block to run
    //   catchCode - Code block to handle errors
    //   finallyCode - Code block to be executed regardless of the try result
    try {
        // client.connect returns a promise, so we'll need to add await to block further execution until this is ready
        await client.connect();

        // RETURN all databases in cluster
        // await listDatabases(client);

        // CREATE: add one document
        // await createListing(client, {
        //     name: "Lovely loft (demo)",
        //     summary: "A charming loft in Paris (demo)",
        //     bedrooms: 1,
        //     bathrooms: 1
        // });

        // CREATE: add multiple documents
        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views (demo createMultipleListings)",
        //         summary: "Modern home with infinite views from the infinity pool",
        //         property_type: "House",
        //         bedrooms: 5,
        //         bathrooms: 4.5,
        //         beds: 5
        //     },
        //     {
        //         name: "Private room in London (demo createMultipleListings)",
        //         property_type: "Apartment",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Beautiful Beach House (demo createMultipleListings)",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         bedrooms: 4,
        //         bathrooms: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     }
        // ]);

        // // READ: find one document
        await findOneListingByName(client, "Infinite Views (demo createMultipleListings)");

        // // READ: find multiple documents
        await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        });

        // UPDATE: update one existing document
        // await updateListingByName(client, "Infinite Views (demo createMultipleListings)", { bedrooms: 6, beds: 8 });

        // UPDATE: upsert -- aka update if it exists, or add if it doesn't
        // await upsertListingName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 2 });

        // UPDATE: all listings to have property type
        // await updateAllListingsToHavePropertyType(client);

    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);

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

// CRUD OPERATIONS

// CREATE --------------------------------------------------------------------------------------------------
/**
 * Add one new document
 * @param {MongoClient} client mongoDB client instance
 * @param {*} newListing 
 */
async function createListing(client, newListing) {

    // Access the "sample_airbnb" database > "listingsAndReviews" collection
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing); // insertOne will add a single document to the collection

    console.log(`New listing created iwth the following id: ${result.insertedId}`);
}

/**
 * Add multiple new documents
 * @param {MongoClient} client mongoDB client instance
 * @param {*} newListings 
 */
async function createMultipleListings(client, newListings) {

    // Access the "sample_airbnb" database > "listingsAndReviews" collection
    const results = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings); // insertMany will add multiple documents to the collection

    console.log(`${results.insertedCount} new listings created with the following id(s):`);
    console.log(results.insertedIds);
}


// READ ----------------------------------------------------------------------------------------------------

/**
 * Query for ONE document
 * @param {MongoClient} client mongoDB client instance
 * @param {string} nameOfListing 
 */
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing }); // fetches the first document that matches the query

    // depending on the query, we may or not get a result --so let's add an if
    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

/**
 * Query for multiple documents at a time 
 * @param {MongoClient} client mongoDB client instance
 * @param {*} param1 uses desctructing...
 */
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // This "find" function will return a mongodb "cursor"
    // MongoDB has many query operators (ex: $gte = greater than or equal)
    // sort -1 = descending order
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: minimumNumberOfBedrooms },
        bathrooms: { $gte: minimumNumberOfBathrooms }
    }).sort({ last_review: -1 }).limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    // Logging code
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }

}

// UPDATE --------------------------------------------------------------------------------------------------

// Update single document using updateOne
// Note: mongoDB function $set operator replaces the value of a field with the specified value
/**
 * 
 * @param {MongoClient} client mongoDB client instance
 * @param {*} nameOfListing existing document
 * @param {*} updatedListing new document item within document
 */
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

/**
 * MongoDB optional feature for updating called "upsert" 
 * updates a document if it exists, or insert a document if it doesn't exist
 * @param {MongoClient} client mongoDB client instance
 * @param {*} nameOfListing existing document
 * @param {*} updatedListing new document item within document
 */
async function upsertListingName(client, nameOfListing, updatedListing) {

    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .updateOne({ name: nameOfListing }, { $set: updatedListing }, { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}

/**
 * Update all items within the document to have a property type
 * @param {MongoClient} client mongoDB client instance
 */
async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

// DELETE --------------------------------------------------------------------------------------------------
