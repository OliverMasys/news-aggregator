/*
 * JavaScript Boilerplate for News Aggregator Project
 * 
 * This JavaScript file is part of the Web APIs assignment.
 * Your task is to complete the functions with appropriate module pattern, observer pattern, singleton pattern.
 * 
 * Follow the TODO prompts and complete each section to ensure the
 * News Aggregator App works as expected.
 */

// Singleton Pattern: ConfigManager
const ConfigManager = (function() {
    let instance;

    function createInstance() {
        return {
            theme: 'dark',
            apiUrl: 'https://newsapi.org/v2/top-headlines',
            apiKey: 'your_api_key_here' // TODO: Replace with your NewsAPI key
        };
    }

    // TODO: Return getInstance function

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }




})();

// Module Pattern: NewsFetcher
const NewsFetcher = (function () {
    // TODO: Create config object with getInstance of ConfigManager
    const config = ConfigManager.getInstance();
    
    async function fetchArticles() {
        // TODO: return fetch data adjusted for only articles
        try {
            const response = await fetch(`${config.apiUrl}?country=us&apiKey=${config.apiKey}`);
            const data = await response.json();
            return data.articles;
        } catch (error) {
            console.error("Error", error);
            return[];
        }
     }

    return {
        getArticles: fetchArticles
    };
})();

// Observer Pattern: NewsFeed
function NewsFeed() {
    this.observers = [];
    this.articles = [];
}

// TODO: Create NewsFeed prototype
















// Instantiate the NewsFeed
const newsFeed = new NewsFeed();

// Observer 1: Update Headline
function updateHeadline(article) {
    const headlineElement = document.getElementById('headline').querySelector('p');
    headlineElement.textContent = article.title;
}

// Observer 2: Update Article List
function updateArticleList(article) {
    const articleListElement = document.getElementById('articles');
    const listItem = document.createElement('li');
    listItem.textContent = article.title;
    articleListElement.appendChild(listItem);
}

// TODO: Subscribe Observers



// Fetch and display articles
NewsFetcher.getArticles().then(articles => {
    articles.forEach(article => {
        newsFeed.addArticle(article);
    });
});

// Display Config Info
const configInfo = ConfigManager.getInstance();
document.getElementById('configInfo').textContent = `Theme: ${configInfo.theme}`;

