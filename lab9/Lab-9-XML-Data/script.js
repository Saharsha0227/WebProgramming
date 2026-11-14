/* ========================================================
   JavaScript for Student Information System (Lab 9)
   Pure Vanilla JavaScript (fetch + DOMParser)
   ======================================================== */

// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to HTML elements
    const loadBtn = document.getElementById("loadBtn");
    const tableWrapper = document.getElementById("tableWrapper");
    const tableBody = document.getElementById("studentTableBody");
    const statusMessage = document.getElementById("statusMessage");

    // Attach click event listener to the "LOAD STUDENT DATA" button
    loadBtn.addEventListener("click", loadStudentData);

    /**
     * Function to fetch XML, parse it, and populate the HTML table
     */
    function loadStudentData() {
        // Step 1: Provide loading feedback to user
        showStatus("Fetching student records from XML...", "info");
        tableBody.innerHTML = ""; // Clear existing table rows
        tableWrapper.classList.add("hidden"); // Temporarily hide table while loading

        // Step 2: Fetch the external XML file using fetch() API
        fetch("students.xml")
            .then(response => {
                // Check if the HTTP response status is OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`Failed to load XML file (HTTP status: ${response.status})`);
                }
                // Return response body as text
                return response.text();
            })
            .then(xmlText => {
                // Step 3: Parse the XML text into a DOM Document using DOMParser
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                // Check for XML parsing errors
                const parseError = xmlDoc.getElementsByTagName("parsererror");
                if (parseError.length > 0) {
                    throw new Error("XML Parsing Error: Invalid XML syntax in students.xml");
                }

                // Step 4: Extract all <student> elements
                const students = xmlDoc.getElementsByTagName("student");

                // Check if any student records were found
                if (students.length === 0) {
                    showStatus("No student records found in the XML file.", "info");
                    return;
                }

                // Step 5: Loop through each student element and dynamically create table rows
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];

                    // Extract data from child elements safely
                    const id = getElementValue(student, "id");
                    const name = getElementValue(student, "name");
                    const gender = getElementValue(student, "gender");
                    const course = getElementValue(student, "course");
                    const email = getElementValue(student, "email");
                    const city = getElementValue(student, "city");

                    // Create a new table row (<tr>)
                    const row = document.createElement("tr");

                    // Create and populate table cells (<td>) for each data field
                    row.innerHTML = `
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${gender}</td>
                        <td>${course}</td>
                        <td>${email}</td>
                        <td>${city}</td>
                    `;

                    // Append the new row to the table body
                    tableBody.appendChild(row);
                }

                // Step 6: Reveal the table and show success message
                tableWrapper.classList.remove("hidden");
                showStatus(`Successfully loaded ${students.length} student record(s).`, "success");
            })
            .catch(error => {
                // Step 7: Handle any network or parsing errors
                console.error("Error loading XML data:", error);
                showStatus(`Error: ${error.message}. Please ensure the XML file exists and is served over HTTP/HTTPS (e.g., Live Server).`, "error");
            });
    }

    /**
     * Helper function to safely get text content of an XML child tag
     * @param {Element} parent - The parent XML element (<student>)
     * @param {string} tagName - The child tag name (e.g. "name", "id")
     * @returns {string} - The trimmed text content or "N/A" if missing
     */
    function getElementValue(parent, tagName) {
        const elements = parent.getElementsByTagName(tagName);
        if (elements.length > 0 && elements[0].textContent) {
            return elements[0].textContent.trim();
        }
        return "N/A";
    }

    /**
     * Helper function to display informative status messages
     * @param {string} message - Message text to display
     * @param {string} type - "info" | "success" | "error"
     */
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
    }
});

