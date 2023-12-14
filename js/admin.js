document.addEventListener('DOMContentLoaded', function () {
    // Function to get the existing reservation data from the cookie
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

    // Function to set the reservation data in the cookie
    function setFormData(formData) {
        const formDataJSON = JSON.stringify(formData);
        document.cookie = `reservationData=${formDataJSON}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
    }

    // Function to dynamically populate the table with reservation data
    function populateReservationTable() {
        const reservationTableBody = document.getElementById('reservationTableBody');
        const existingData = getExistingFormData();

        existingData.forEach((data, index) => {
            const row = document.createElement('tr');
            const userCell = document.createElement('td');
            const dayCell = document.createElement('td');
            const durationCell = document.createElement('td');
            const actionCell = document.createElement('td');
            const doneButton = document.createElement('button');

            userCell.textContent = data.user; // Populate user cell
            dayCell.textContent = data.selectedDay;
            durationCell.textContent = data.duration;

            doneButton.textContent = 'Done';
            doneButton.classList.add('done-button');

            doneButton.addEventListener('click', function () {
                // Remove the clicked entry from stored data
                existingData.splice(index, 1);

                // Update the cookie with the modified data
                setFormData(existingData);

                // Refresh the page to see the updated data
                location.reload();
            });

            actionCell.appendChild(doneButton);

            row.appendChild(userCell);
            row.appendChild(dayCell);
            row.appendChild(durationCell);
            row.appendChild(actionCell);

            reservationTableBody.appendChild(row);
        });
    }

    // Call the function to populate the table when the page is loaded
    populateReservationTable();
});
