// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Load stored data from localStorage
function loadWorkDetails() {
    const storedData = JSON.parse(localStorage.getItem('workDetails')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""; // Clear table before adding new data
    
    storedData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.day}</td>
            <td>${entry.mrng630}</td>
            <td>${entry.mrng930}</td>
            <td>${entry.noon330}</td>
            <td>${entry.evng630}</td>
            <td>${entry.nt830}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Hide form if today's data exists
    const today = getTodayDate();
    if (storedData.some(entry => entry.date === today)) {
        document.querySelector('form').style.display = 'none';
    }
}

// Add new work details
function Add_Work_Details(event) {
    event.preventDefault(); // Prevent page reload
    
    const today = new Date();
    const date = getTodayDate();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });
    
    const newEntry = {
        date,
        day,
        mrng630: document.getElementById('mrng630').value,
        mrng930: document.getElementById('mrng930').value,
        noon330: document.getElementById('noon330').value,
        evng630: document.getElementById('evng630').value,
        nt830: document.getElementById('nt830').value
    };
    
    let storedData = JSON.parse(localStorage.getItem('workDetails')) || [];
    
    // Prevent duplicate entry for the same day
    if (!storedData.some(entry => entry.date === date)) {
        storedData.push(newEntry);
        localStorage.setItem('workDetails', JSON.stringify(storedData));
        loadWorkDetails();
    }
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadWorkDetails);

// Attach event listener to the submit button
document.querySelector('form').addEventListener('submit', Add_Work_Details);
