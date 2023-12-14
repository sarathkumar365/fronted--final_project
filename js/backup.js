const bookNowBttn = document.getElementsByClassName('book-now-button')
const userPreview = document.getElementById('user--preview')
const logoutBttn = document.getElementById('logout')
const showBttns = document.getElementById('show--bttns') 
const showUserName = document.getElementById('user--name')
const registrationForm = document.getElementById('registrationForm');

let userData = null;
let isLoggedin = false;
const storedData = getCookie('formData');
const storedFormData = JSON.parse(storedData);
userData = storedFormData;



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


function redirectToCheckout() {
    // Redirect to the checkout page
    window.location.href = '../html/checkout.html';
}

if (userData == null) {
    // Loop through all elements with the class 'book-now-button' and add a class to hide them
    for (let i = 0; i < bookNowBttn.length; i++) {
        bookNowBttn[i].classList.add('hidden');
        logoutBttn.innerHTML = 'SIGNIN'
        logoutBttn.addEventListener('click',login)
    }


} else {
    if(userPreview) {
        userPreview.classList.remove('hidden');
        userPreview.innerHTML = '';
        userPreview.innerHTML =  userData.name
        userPreview.classList.add('hidden')
    }
    
    if(logoutBttn) {
        logoutBttn.addEventListener('click',logout)
    }

    


}

console.log(isLoggedin);
if(isLoggedin) {
    showBttns.classList.add('hidden')
    showUserName.innerHTML= ''
    showUserName.innerHTML= userData.name
}

function logoutMain(){
    userData = null;
    window.location.reload()
}

function logout() {
    console.log('l');
    userData = null;
    window.location.href = '../index.html';
}

function login() {
    isLoggedin = true;
    window.location.href = '../html/signin.html';
}



// checkout functionality

function submitForm() {
    // Get the values from the form
    const selectedDay = document.getElementById('day').value;
    const duration = document.getElementById('duration').value;

    // Create an object to store form data
    const formData = {
        selectedDay: selectedDay,
        duration: duration
    };

    // Convert the object to a JSON string
    const formDataJSON = JSON.stringify(formData);

    // Store the JSON string in a cookie
    document.cookie = `reservationData=${formDataJSON}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;

    // Log to console (you can remove this in a real application)
    console.log(`Form data stored in cookie: ${formDataJSON}`);
    
    alert('submitted successfully!');
    setTimeout(function () {
        // Navigate to index.html after 2 seconds
        window.location.href = '../index.html';
    }, 1000);
}


// signin
function checkCredentials(event) {
    console.log('signin');
    event.preventDefault();

    // Get entered credentials
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    // Get stored data from cookies
    const storedData = getCookie('formData');

    if (storedData) {
        // Parse stored data
        const storedFormData = JSON.parse(storedData);

        // Check if entered credentials match stored data
        if (enteredEmail === storedFormData.email && enteredPassword === storedFormData.password) {
            alert('Login successful! Redirecting to the dashboard.');


            // Redirect to the dashboard or another page after successful login
            window.location.href = '../html/allvehicles.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } else {
        alert('No user data found. Please sign up.');
    }
}


//signup


        
if(registrationForm) {
    
registrationForm.addEventListener('submit', function (event) {
    console.log("call api");
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        // url: document.getElementById('url').value,
        yearOfBirth: document.getElementById('yearOfBirth').value,
        gender: document.getElementById('gender').value,
        comments: document.getElementById('comments').value,
        confirmationCheckbox: document.getElementById('confirmationCheckbox').checked,
    };

    // Store form data in browser cookies as JSON
    setCookie('formData', JSON.stringify(formData), 365);

    // Optionally, you can clear the form after storing the data
    clearForm();

    // You can redirect to another page or perform additional actions here
    // Redirect to the sign-in page
    window.location.href = '../html/signin.html';
});
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function clearForm() {
    registrationForm.reset();
    updateProgressBar(); // Reset progress bar when form is cleared
}

  



function clearForm() {
    document.getElementById('registrationForm').reset();
}

function clearForm() {
    document.getElementById('registrationForm').reset();
    updateProgressBar(); // Reset progress bar when form is cleared
}

function updateProgressBar() {
    const form = document.getElementById('registrationForm');
    const progress = document.getElementById('progressBar');
    const fields = form.querySelectorAll('input, select, textarea');
    const completedFields = Array.from(fields).filter(field => field.checkValidity());

    const progressValue = (completedFields.length / fields.length) * 100;
    progress.value = progressValue;
}
