// load-header.js

// Create a new div element
const headerContainer = document.createElement('div');
// Fetch the header.html content and insert it into the div
fetch('/html/facultyheader.html')
    .then(response => response.text())
    .then(data => {
        headerContainer.innerHTML = data;
        // Append the header content to the body of the current HTML page
        document.body.insertBefore(headerContainer, document.body.firstChild);
    })
    .catch(error => console.error('Error loading header:', error));


// header.js
