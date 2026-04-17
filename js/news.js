// News display for public pages

document.addEventListener('DOMContentLoaded', function() {
    loadPublicNews();
});

function loadPublicNews() {
    const newsList = document.getElementById('news-list');
    const noNews = document.getElementById('no-news');
    
    if (!newsList) return;
    
    const news = getPublicNews();
    
    if (news.length === 0) {
        newsList.style.display = 'none';
        if (noNews) noNews.style.display = 'block';
        return;
    }
    
    newsList.innerHTML = '';
    newsList.style.display = 'block';
    if (noNews) noNews.style.display = 'none';
    
    // Show only the latest news (daily news)
    const latestNews = news[0];
    
    const article = document.createElement('article');
    article.className = 'news-article';
    
    article.innerHTML = `
        <h3>${escapeHtml(latestNews.title)}</h3>
        <p class="news-date">Published on ${formatDate(latestNews.publishedAt)}</p>
        <p>${escapeHtml(latestNews.content)}</p>
    `;
    
    newsList.appendChild(article);
}

function getPublicNews() {
    const news = localStorage.getItem('samanwaya_news');
    return news ? JSON.parse(news) : [];
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
