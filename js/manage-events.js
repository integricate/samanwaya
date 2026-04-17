// Events Management for Samanwaya Admin Panel

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    loadEvents();

    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }
});

// Load all events from localStorage
function loadEvents() {
    const events = getEvents();
    const tbody = document.getElementById('eventsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (events.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No events found. Add your first event!</td></tr>';
        return;
    }
    
    const currentUser = getCurrentUser();
    
    events.forEach(event => {
        const row = document.createElement('tr');
        
        let actions = `
            <button class="action-btn edit-btn" onclick="editEvent(${event.id})">Edit</button>
        `;
        
        // Only superadmin (umeshair) can delete events
        if (currentUser && currentUser.role === 'superadmin') {
            actions += `<button class="action-btn delete-btn" onclick="deleteEvent(${event.id})">Delete</button>`;
        }
        
        row.innerHTML = `
            <td>${escapeHtml(event.title)}</td>
            <td>${formatDate(event.date)}</td>
            <td>${escapeHtml(event.location)}</td>
            <td>${actions}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Get all events from localStorage
function getEvents() {
    const events = localStorage.getItem('samanwaya_events');
    return events ? JSON.parse(events) : [];
}

// Save events to localStorage
function saveEvents(events) {
    localStorage.setItem('samanwaya_events', JSON.stringify(events));
}

// Handle event form submission
function handleEventSubmit(e) {
    e.preventDefault();
    
    const eventId = document.getElementById('eventId').value;
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;
    
    const events = getEvents();
    
    if (eventId) {
        // Edit existing event
        const index = events.findIndex(e => e.id == eventId);
        if (index !== -1) {
            events[index] = { ...events[index], title, date, location, description };
            showMessage('Event updated successfully!', 'success');
        }
    } else {
        // Add new event
        const newEvent = {
            id: Date.now(),
            title,
            date,
            location,
            description,
            createdAt: new Date().toISOString()
        };
        events.push(newEvent);
        showMessage('Event created successfully!', 'success');
    }
    
    saveEvents(events);
    resetForm();
    loadEvents();
}

// Edit event
function editEvent(id) {
    const events = getEvents();
    const event = events.find(e => e.id === id);
    
    if (event) {
        document.getElementById('eventId').value = event.id;
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventDescription').value = event.description;
        
        window.scrollTo(0, 0);
    }
}

// Delete event (only for superadmin)
function deleteEvent(id) {
    const currentUser = getCurrentUser();
    
    if (!currentUser || currentUser.role !== 'superadmin') {
        showMessage('Only superadmin can delete events.', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this event?')) {
        let events = getEvents();
        events = events.filter(e => e.id !== id);
        saveEvents(events);
        loadEvents();
        showMessage('Event deleted successfully!', 'success');
    }
}

// Reset form
function resetForm() {
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
