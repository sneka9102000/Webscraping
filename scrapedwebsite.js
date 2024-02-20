const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsiteAndStore(definition) {
    try {
      const articles = [];
      for (let page = definition.pagination.start_page; page <= definition.pagination.end_page; page++) {
        const response = await axios.get(`${definition.website}?page=${page}`);
        const $ = cheerio.load(response.data);
        $(definition.content_selector).each((index, element) => {
          const title = $(element).find('h2').text();
          const body = $(element).find('p').text();
          const article = new Article(title, body);
          articles.push(article);
        });
      }
      await storeInDatabase(articles);
      return articles;
    } catch (error) {
      console.error('Error scraping website and storing in database:', error);
      return [];
    }
  }
  
