// Select form and table elements
const form = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').querySelector('tbody');

// Function to load data from localStorage and populate the table
const loadData = () => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentToTable(student));
};

// Function to add a student to the table
const addStudentToTable = (student) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit-btn" onclick="editStudent(this)">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

    studentTable.appendChild(row);
};

// Function to save data to localStorage
const saveData = () => {
    const students = [];
    studentTable.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        students.push({
            name: cells[0].textContent,
            id: cells[1].textContent,
            email: cells[2].textContent,
            contact: cells[3].textContent,
        });
    });
    localStorage.setItem('students', JSON.stringify(students));
};

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get values from form inputs
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Input validation
    if (!name || !id || !email || !contact) {
        alert('All fields are required!');
        return;
    }

    // Add student to the table
    addStudentToTable({ name, id, email, contact });

    // Save the updated data to localStorage
    saveData();

    // Clear the form fields
    form.reset();
});

// Function to edit a student record
const editStudent = (btn) => {
    const row = btn.parentElement.parentElement; // Get the row containing the clicked button
    const cells = row.querySelectorAll('td');

    // Populate the form fields with current row data
    document.getElementById('studentName').value = cells[0].textContent;
    document.getElementById('studentID').value = cells[1].textContent;
    document.getElementById('email').value = cells[2].textContent;
    document.getElementById('contact').value = cells[3].textContent;

    // Remove the row from the table
    row.remove();

    // Save the updated data to localStorage
    saveData();
};

// Function to delete a student record
const deleteStudent = (btn) => {
    const row = btn.parentElement.parentElement; // Get the row containing the clicked button
    row.remove(); // Remove the row from the table
    saveData(); // Save the updated data to localStorage
};

// Initialize the table by loading data from localStorage
loadData();
