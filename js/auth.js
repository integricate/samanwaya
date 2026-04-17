// Authentication system for Samanwaya admin panel
// Note: This is a client-side authentication for GitHub Pages (static site)
// For production, use server-side authentication

const USERS = [
    { username: 'jagdishayer', password: 'admin//2-1', role: 'admin' },
    { username: 'umeshair', password: 'umeshair@24', role: 'superadmin' },
    { username: 'adminthird', password: 'admin9-6', role: 'admin' },
    { username: 'adminforth', password: 'admin10-6', role: 'admin' }
];

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            const user = USERS.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Store user session in localStorage
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: user.username,
                    role: user.role,
                    isLoggedIn: true
                }));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid username or password. Please try again.';
                errorMessage.style.display = 'block';
            }
        });
    }
    
    // Check if user is already logged in
    checkAuth();
});

// Check authentication status
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    const currentPage = window.location.pathname;
    
    // If trying to access admin pages without login
    if (currentPage.includes('/admin/') && !currentPage.includes('login.html')) {
        if (!currentUser) {
            window.location.href = 'login.html';
            return false;
        }
    }
    
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout functionality
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Get current user
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check if user is superadmin
function isSuperAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'superadmin';
}
