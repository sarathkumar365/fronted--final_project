const bookNowBttn = document.getElementById('bnb')
const bookBttn = document.getElementsByClassName('book-now-button')
const userPreview = document.getElementById('user--preview')
const logoutBttn = document.getElementById('logout')
const showBttns = document.getElementById('show--bttns') 
const showUserName = document.getElementById('user--name')
const registrationForm = document.getElementById('registrationForm');

    // Get stored data from cookies
    const storedData = getCookie('currentUser');
    const storedFormData = JSON.parse(storedData);

    if(storedFormData) {
        if(storedFormData.isLoggedIn) {
            //optional chaining
            showBttns?.classList.add('hidden')
            logoutBttn?.classList.remove('hidden')

            // show book now bttn
            // bookNowBttn?.classList.remove('hidden')
            // console.log(bookBttn);
            Array.from(bookBttn)?.forEach(function(element) {
                element.classList.remove('hidden'); 
            });
            logoutBttn?.classList.remove('hidden')
        } else {
        }
    }

// save logged in user
const currentUser = {
};


console.log(currentUser);

// signin logic

// function checkCredentials(event) {
//     console.log('signin');
//     event.preventDefault();

//     // Get entered credentials
//     const enteredEmail = document.getElementById('loginEmail').value;
//     const enteredPassword = document.getElementById('loginPassword').value;

//     // Get stored data from cookies
//     const storedData = getCookie('formData');

//     if (storedData) {
//         // Parse stored data
//         const storedFormData = JSON.parse(storedData);

//         // Check if entered credentials match stored data
//         if (enteredEmail === storedFormData.email && enteredPassword === storedFormData.password) {

//             currentUser.name = storedFormData.name;
//             currentUser.isLoggedIn = true;
//             // Store form data in browser cookies as JSON
//             setCookie('currentUser', JSON.stringify(currentUser), 365);
           
//             alert('Login successful! Redirecting to the dashboard.');


//             // Redirect to the dashboard or another page after successful login
//             window.location.href = '../html/allvehicles.html';
//         } else {
//             alert('Invalid credentials. Please try again.');
//         }
//     } else {
//         alert('No user data found. Please sign up.');
//     }
// }

function checkCredentials(event) {
    console.log('signin');
    event.preventDefault();

    // Get entered credentials
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    // Check for admin credentials
    if (enteredEmail === 'admin@gmail.com' && enteredPassword === '123') {
        // Admin login successful
        alert('Admin login successful! Redirecting to the admin page.');
        window.location.href = '../html/admin.html';
        return; // Exit the function to avoid executing the user login code
    }

    // Get stored data from cookies
    const storedData = getCookie('formData');

    if (storedData) {
        // Parse stored data
        const storedFormData = JSON.parse(storedData);

        // Check if entered credentials match stored data
        if (enteredEmail === storedFormData.email && enteredPassword === storedFormData.password) {
            currentUser.name = storedFormData.name;
            currentUser.isLoggedIn = true;

            // Store form data in browser cookies as JSON (consider more secure methods)
            setCookie('currentUser', JSON.stringify(currentUser), 365);

            // Consider using a modal or other UI elements for success messages
            alert('User login successful! Redirecting to the dashboard.');

            // Redirect to the dashboard or another page after successful login
            window.location.href = '../html/allvehicles.html';
        } else {
            // Consider using a modal or other UI elements for error messages
            alert('Invalid credentials. Please try again.');
        }
    } else {
        // Consider using a modal or other UI elements for informative messages
        alert('No user data found. Please sign up.');
    }
}


// logout

if(logoutBttn) {
    logoutBttn.addEventListener('click', logout)
}

function logout() {
    currentUser.isLoggedIn = false;
    deleteCookie('currentUser')
    window.location.href = '../index.html';
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }


// Function to delete a cookie by setting its value to an empty string
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// Example: Deleting a cookie named "userToken"
deleteCookie('userToken');


// checkout functionality


// // Helper function to retrieve existing form data from the cookie
// Helper function to retrieve existing form data from the cookie
function getExistingFormData() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('reservationData='))
        ?.split('=')[1];

    try {
        return cookieValue ? JSON.parse(cookieValue) : [];
    } catch (error) {
        console.error('Error parsing existing form data:', error);
        return [];
    }
}

function submitForm() {
    try {
        // Get the values from the form
        const selectedDay = document.getElementById('day').value;
        const duration = document.getElementById('duration').value;

        currentData = getCookie(currentUser)
        const modifiedData = JSON.parse(storedData);

        // Create an object to store new form data
        const newFormData = {
            user: modifiedData.name,
            selectedDay: selectedDay,
            duration: duration
        };

        console.log(newFormData);

        // Retrieve existing data from the cookie
        const existingData = getExistingFormData();

        // Append the new data to the existing array
        existingData.push(newFormData);

        // Convert the updated array to a JSON string
        const updatedFormDataJSON = JSON.stringify(existingData);

        // Store the updated JSON string in a cookie
        document.cookie = `reservationData=${updatedFormDataJSON}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;

        // Log to console (you can remove this in a real application)
        console.log(`Form data stored in cookie: ${updatedFormDataJSON}`);

        // Display success message
        alert('Form submitted successfully!');

        // Navigate to index.html after a delay
        setTimeout(function () {
            window.location.href = '../index.html';
        }, 1000);
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle the error, show an error message, etc.
    }
}


