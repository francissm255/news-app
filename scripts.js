const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const catURL = 'https://api.thecatapi.com/v1/images/search';

async function fetchNews() {//basic asynchronous function to fetch data from the URL endpoint
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);//A function call to display the news
    } catch (error) {
        console.error('There was an error!', error);
    }
}

async function fetchCat(node) {
    try {
        let response = await fetch(catURL);
        let data = await response.json();
        console.log(data);
        console.log(data[0]);
        displayCat(data[0], node);
    } catch (error) {
        console.error('There was an error!', error.message);
    }
}

function displayCat(a, node) {
    const kitten = document.createElement('img');
    kitten.src = a.url;
    kitten.alt = "random photo of a cat";
    node.insertBefore(kitten,node.firstElementChild);
}

function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    for (const a of articles) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('paper', 'card', 'border-0');

        //create and append a cat image to the article
        fetchCat(articleDiv);

        //create and append headline to articleDiv
        const title = document.createElement('h4');
        title.textContent = a.title;
        articleDiv.appendChild(title);

        // TODO: Use document.createElement and appendChild to create and append more elements
        newsDiv.appendChild(articleDiv);
    }
}

fetchNews();
