// // import { isLoggedIn } from "./script";

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

// function getCookie(name) {
//     const cookies = document.cookie.split(';');
//     for (const cookie of cookies) {
//         const [cookieName, cookieValue] = cookie.split('=');
//         if (cookieName.trim() === name) {
//             return cookieValue;
//         }
//     }
//     return null;
// }

// // export {getCookie};