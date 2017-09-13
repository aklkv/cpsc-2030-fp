const fortune = require('fortune');
const nedbAdapter = require('fortune-nedb');

module.exports = fortune({
    user: {
        name: {
            type: String
        },
        email: {
          type: String
        },
        department: {
            type: String
        },
        password: {
          type: String
        },
        articles: {
            link: 'article',
            inverse: 'author',
            isArray: true
        },
        category: {
          link: 'category',
          inverse: 'authors'
        }
    },
    article: {
        title: {
            type: String
        },
        body: {
            type: String
        },
        createdAt: {
            type: Date
        },
        author: {
            link: 'user',
            inverse: 'articles'
        },
        category: {
            link: 'category',
            inverse: 'articles'
        }
    },
    category: {
        name: {
            type: String
        },
        authors: {
          link: 'user',
          inverse: 'category',
          isArray: true
        },
        articles: {
            link: 'article',
            inverse: 'category',
            isArray: true
        }
    }
}, {
    adapter: [
      nedbAdapter, {
        dbPath: 'data',
        autoload: true
      }
    ]
});
