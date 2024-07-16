document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Login successful, redirecting to ${data.redirectTo}`); // Log successful login and redirect URL
            window.location.href = data.redirectTo;
        } else {
            console.log('Invalid credentials response received'); // Log invalid credentials response
            alert('Credenciais inválidas');
        }
    });
});