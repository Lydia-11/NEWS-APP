const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
const searchTerm = searchInput.value.trim();
if (searchTerm !== '') {
    // Fetch news articles based on the search term
    fetchNews(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`);
}
});


async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles); 
    } catch(error) {
        console.error('There was an error!', error);
    }
}

fetchNews();

function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    for(const article of articles) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const title = document.createElement('h2');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        articleDiv.appendChild(description);

        if (article.urlToImage) {
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title;
            articleDiv.appendChild(image);
        }

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank'; // Corrected target attribute
        articleDiv.appendChild(link);

        newsDiv.appendChild(articleDiv);
    }
}
