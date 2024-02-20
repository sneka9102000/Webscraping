const { MongoClient } = require('mongodb');

async function storeInDatabase(articles) {
  try {
    // Connection to MongoDB using the connection string from MongoDB Compass
    const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
    await client.connect();

    // Selecting the database and collection
    const db = client.db('project_scrape');
    const collection = db.collection('articles');

    // Inserted the scraped articles into the collection
    await collection.insertMany(articles);

    console.log('Scraped content stored in the database.');

    // Closed the connection
    await client.close();
  } catch (error) {
    console.error('Error storing scraped content in the database:', error);
  }
}
