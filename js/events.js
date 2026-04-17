// Events display for public pages

document.addEventListener('DOMContentLoaded', function() {
    loadPublicEvents();
});

function loadPublicEvents() {
    const eventsList = document.getElementById('events-list');
    const noEvents = document.getElementById('no-events');
    
    if (!eventsList) return;
    
    const events = getPublicEvents();
    
    if (events.length === 0) {
        eventsList.style.display = 'none';
        if (noEvents) noEvents.style.display = 'block';
        return;
    }
    
    eventsList.innerHTML = '';
    eventsList.style.display = 'grid';
    if (noEvents) noEvents.style.display = 'none';
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        card.innerHTML = `
            <div class="event-date">${formatDate(event.date)}</div>
            <div class="event-content">
                <h3>${escapeHtml(event.title)}</h3>
                <p class="event-meta">📍 ${escapeHtml(event.location)}</p>
                <p>${escapeHtml(event.description)}</p>
            </div>
        `;
        
        eventsList.appendChild(card);
    });
}

function getPublicEvents() {
    const events = localStorage.getItem('samanwaya_events');
    return events ? JSON.parse(events) : [];
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
