
const registrationForm = document.getElementById('registrationForm');

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