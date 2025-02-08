function getCurrentDate() {
    let today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

function checkFormVisibility() {
    let lastAddedDate = localStorage.getItem("lastAddedDate");
    let todayDate = getCurrentDate();

    if (lastAddedDate === todayDate) {
        document.getElementById("workForm").style.display = "none"; // Hide form if today's details are added
    }
}

function Add_Work_Details(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    let today = new Date();
    let date = getCurrentDate(); // YYYY-MM-DD format
    let day = today.toLocaleDateString('en-GB', { weekday: 'long' });

    let mrng630 = document.getElementById("mrng630").value;
    let mrng930 = document.getElementById("mrng930").value;
    let noon330 = document.getElementById("noon330").value;
    let evng630 = document.getElementById("evng630").value;
    let nt830 = document.getElementById("nt830").value;

    let table = document.getElementById("scheduleTable").getElementsByTagName('tbody')[0];

    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${day}</td>
        <td>${mrng630}</td>
        <td>${mrng930}</td>
        <td>${noon330}</td>
        <td>${evng630}</td>
        <td>${nt830}</td>
    `;

    localStorage.setItem("lastAddedDate", date); // Save today's date in local storage

    document.querySelector("form").reset();
    document.getElementById("workForm").style.display = "none"; // Hide form after adding details
}

document.addEventListener("DOMContentLoaded", checkFormVisibility); // Run on page load
