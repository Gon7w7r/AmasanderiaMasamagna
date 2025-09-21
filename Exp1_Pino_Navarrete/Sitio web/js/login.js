// js/login.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validación básica como pide el documento
        if (password.length >= 4 && password.length <= 10) {
            if (username === 'admin' && password === 'admin123') {
                window.location.href = 'admin_index.html';
            } else {
                document.getElementById('errorMessage').style.display = 'block';
            }
        } else {
            alert('La contraseña debe tener entre 4 y 10 caracteres');
        }
    });
});