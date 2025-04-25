document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDisplay = document.getElementById('errorMessage');


    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value;
        const password = passwordInput.value;

        // **KeyAuth Login API Endpoint**
        const loginEndpoint = 'https://keyauth.cc/api/login/'; // Note the trailing slash
        const KeyAuthApp = new KeyAuth({
            name: "dishant's app", // App name 
            ownerid: "0GoUg2pXH4", // Account ID
            version: "1.3", // Application version. Used for automatic downloads see video here https://www.youtube.com/watch?v=kW195PLCBKs
        })



        fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                key: keyAuthAppName, // KeyAuth might use 'key' for the app name
                ownerid: keyAuthOwnerId, // KeyAuth often uses 'ownerid'
                version: keyAuthApiVersion // If KeyAuth requires an API version
                // You might need to include other parameters as per KeyAuth's API
            }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Login failed');
                    }).catch(() => {
                        throw new Error(`Login failed with status ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                // **Check KeyAuth documentation for the successful response format**
                // They will likely return a 'token' or 'sessionid' upon successful login
                if (data && data.token) {
                    localStorage.setItem('authToken', data.token); // Store the token
                    window.location.href = 'amazon(clone).html'; // Redirect to your main page
                } else {
                    errorMessageDisplay.textContent = 'Login successful, but no authentication token received.';
                }
            })
            .catch(error => {
                console.error('KeyAuth Login Error:', error);
                errorMessageDisplay.textContent = error.message || 'An unexpected error occurred during login.';
            });
    });
});