  const axios = require('axios');
  const cheerio = require('cheerio');
  const storeInDatabase = require('./db');
  const Article = require('./scraped');

  async function scrapeWebsiteAndStore() {
      try {
          // Load scraping definition from page.json
          const definition = require('./page.json');

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
          console.log(articles)
          await storeInDatabase(articles);
          return articles;
      } catch (error) {
          console.error('Error scraping website and storing in database:', error);
          return [];
      }
  }

  // Call the function to initiate scraping and storing
  scrapeWebsiteAndStore();
