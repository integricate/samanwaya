// News Management for Samanwaya Admin Panel

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    loadNews();

    const newsForm = document.getElementById('newsForm');
    if (newsForm) {
        newsForm.addEventListener('submit', handleNewsSubmit);
    }
});

// Load all news from localStorage
function loadNews() {
    const news = getNews();
    const tbody = document.getElementById('newsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (news.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No news articles found. Publish your first article!</td></tr>';
        return;
    }
    
    news.forEach(article => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${escapeHtml(article.title)}</td>
            <td>${formatDate(article.publishedAt)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editNews(${article.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteNews(${article.id})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Get all news from localStorage
function getNews() {
    const news = localStorage.getItem('samanwaya_news');
    return news ? JSON.parse(news) : [];
}

// Save news to localStorage
function saveNews(news) {
    localStorage.setItem('samanwaya_news', JSON.stringify(news));
}

// Handle news form submission
function handleNewsSubmit(e) {
    e.preventDefault();
    
    const newsId = document.getElementById('newsId').value;
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    
    const news = getNews();
    
    if (newsId) {
        // Edit existing news
        const index = news.findIndex(n => n.id == newsId);
        if (index !== -1) {
            news[index] = { ...news[index], title, content };
            showMessage('News updated successfully!', 'success');
        }
    } else {
        // Add new news (only one daily news is kept)
        const newArticle = {
            id: Date.now(),
            title,
            content,
            publishedAt: new Date().toISOString()
        };
        
        // For daily news, we keep only the latest one
        // If you want to keep history, remove this line
        news.length = 0;
        
        news.push(newArticle);
        showMessage('News published successfully!', 'success');
    }
    
    saveNews(news);
    resetNewsForm();
    loadNews();
}

// Edit news
function editNews(id) {
    const news = getNews();
    const article = news.find(n => n.id === id);
    
    if (article) {
        document.getElementById('newsId').value = article.id;
        document.getElementById('newsTitle').value = article.title;
        document.getElementById('newsContent').value = article.content;
        
        window.scrollTo(0, 0);
    }
}

// Delete news
function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news article?')) {
        let news = getNews();
        news = news.filter(n => n.id !== id);
        saveNews(news);
        loadNews();
        showMessage('News deleted successfully!', 'success');
    }
}

// Reset form
function resetNewsForm() {
    document.getElementById('newsForm').reset();
    document.getElementById('newsId').value = '';
}

// Show message
function showMessage(message, type) {
    const messageArea = document.getElementById('messageArea');
    if (messageArea) {
        messageArea.innerHTML = `
            <div class="${type === 'success' ? 'success-message' : 'error-message'}">
                ${escapeHtml(message)}
            </div>
        `;
        
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 3000);
    }
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
