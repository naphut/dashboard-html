
let employees = [
    {id: 1, lastName: "Doe", firstName: "John", profileImg: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg", amount: "$120"}
];
let incomeRecords = [];

function renderEmployees(data = employees) {
    const tbody = document.querySelector('#EmployeeTable tbody');
    tbody.innerHTML = '';
    data.forEach(employee => {
        tbody.innerHTML += `
            <tr data-id="${employee.id}">
                <td data-label="Profile" class="profile-col"><img src="${employee.profileImg}" alt="Profile" class="profile-img"></td>
                <td data-label="Last Name" class="name-col">${employee.lastName}</td>
                <td data-label="First Name" class="name-col">${employee.firstName}</td>
                <td data-label="Amount" class="amount-col">${employee.amount}</td>
                <td data-label="Action" class="action-col">
                    <button class="btn edit-employee">Edit</button>
                    <button class="btn delete-employee">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
    updateIncomeEmployeeSelect();
}

function renderIncome(data = incomeRecords) {
    const tbody = document.querySelector('#incomeTable tbody');
    tbody.innerHTML = '';
    data.forEach(record => {
        tbody.innerHTML += `
            <tr data-id="${record.id}">
                <td data-label="Date" class="date-col">${record.date}</td>
                <td data-label="Employee" class="employee-col">${record.employee}</td>
                <td data-label="Amount" class="amount-col">${record.amount}</td>
                <td data-label="Action" class="action-col">
                    <button class="btn edit-income">Edit</button>
                    <button class="btn delete-income">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
}

function updateDashboard() {
    document.getElementById('totalEmployee').textContent = employees.length;
    const income = incomeRecords.reduce((sum, r) => sum + parseFloat(r.amount.replace('$', '')), 0);
    document.getElementById('totalIncome').textContent = `$${income.toFixed(2)}`;
}

function updateIncomeEmployeeSelect() {
    const addSelect = document.getElementById('incomeEmployee');
    const editSelect = document.getElementById('editIncomeEmployee');
    [addSelect, editSelect].forEach(select => {
        select.innerHTML = '<option value="">Select Employee</option>';
        employees.forEach(employee => {
            select.innerHTML += `<option value="${employee.id}">${employee.firstName} ${employee.lastName}</option>`;
        });
    });
}

const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const addModal = document.getElementById('addModal');
const editEmployeeModal = document.getElementById('editEmployeeModal');
const editIncomeModal = document.getElementById('editIncomeModal');
const imageSearchModal = document.getElementById('imageSearchModal');
const addBtn = document.getElementById('addNew');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const closeBtns = document.getElementsByClassName('close');
const addForm = document.getElementById('addForm');
const editEmployeeForm = document.getElementById('editEmployeeForm');
const editIncomeForm = document.getElementById('editIncomeForm');
const imageSearchForm = document.getElementById('imageSearchForm');
const recordType = document.getElementById('recordType');
const employeeFields = document.getElementById('employeeFields');
const incomeFields = document.getElementById('incomeFields');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const searchImageInput = document.getElementById('searchImage');
const searchImagePreview = document.getElementById('searchImagePreview');
let currentSection = 'dashboard';

menuToggle.onclick = function() {
    sideMenu.classList.toggle('open');
}

closeMenu.onclick = function() {
    sideMenu.classList.remove('open');
}

addBtn.onclick = function(e) {
    e.preventDefault();
    addModal.style.display = 'block';
    recordType.value = currentSection === 'Employee' ? 'employee' : currentSection === 'income' ? 'income' : '';
    toggleFields();
}

searchBtn.onclick = function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm.toLowerCase() === 'image') {
        imageSearchModal.style.display = 'block';
    } else {
        performTextSearch(searchTerm);
    }
}

Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        addModal.style.display = 'none';
        editEmployeeModal.style.display = 'none';
        editIncomeModal.style.display = 'none';
        imageSearchModal.style.display = 'none';
        addForm.reset();
        editEmployeeForm.reset();
        editIncomeForm.reset();
        imageSearchForm.reset();
        imagePreview.style.display = 'none';
        searchImagePreview.style.display = 'none';
        employeeFields.style.display = 'none';
        incomeFields.style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target == addModal || event.target == editEmployeeModal || event.target == editIncomeModal || event.target == imageSearchModal) {
        addModal.style.display = 'none';
        editEmployeeModal.style.display = 'none';
        editIncomeModal.style.display = 'none';
        imageSearchModal.style.display = 'none';
        addForm.reset();
        editEmployeeForm.reset();
        editIncomeForm.reset();
        imageSearchForm.reset();
        imagePreview.style.display = 'none';
        searchImagePreview.style.display = 'none';
        employeeFields.style.display = 'none';
        incomeFields.style.display = 'none';
    } else if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target) && sideMenu.classList.contains('open')) {
        sideMenu.classList.remove('open');
    }
}

recordType.onchange = toggleFields;

function toggleFields() {
    if (recordType.value === 'employee') {
        employeeFields.style.display = 'block';
        incomeFields.style.display = 'none';
        employeeFields.querySelectorAll('input').forEach(input => input.required = true);
        incomeFields.querySelectorAll('input').forEach(input => input.required = false);
    } else if (recordType.value === 'income') {
        employeeFields.style.display = 'none';
        incomeFields.style.display = 'block';
        employeeFields.querySelectorAll('input').forEach(input => input.required = false);
        incomeFields.querySelectorAll('input').forEach(input => input.required = true);
    } else {
        employeeFields.style.display = 'none';
        incomeFields.style.display = 'none';
    }
}

imageInput.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

searchImageInput.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            searchImagePreview.src = e.target.result;
            searchImagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

addForm.onsubmit = function(e) {
    e.preventDefault();
    if (recordType.value === 'employee') {
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const amount = document.getElementById('employeeAmount').value;
        const imageFile = imageInput.files[0];
        if (lastName && firstName && amount && imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newEmployee = {
                    id: employees.length + 1,
                    lastName: lastName,
                    firstName: firstName,
                    profileImg: e.target.result,
                    amount: amount.startsWith('$') ? amount : `$${amount}`
                };
                employees.push(newEmployee);
                renderEmployees();
                addModal.style.display = 'none';
                addForm.reset();
                imagePreview.style.display = 'none';
                alert('Employee added successfully!');
            }
            reader.readAsDataURL(imageFile);
        }
    } else if (recordType.value === 'income') {
        const employeeId = document.getElementById('incomeEmployee').value;
        const amount = document.getElementById('incomeAmount').value;
        const date = document.getElementById('incomeDate').value;
        if (employeeId && amount && date) {
            const employee = employees.find(e => e.id === parseInt(employeeId));
            const newRecord = {
                id: incomeRecords.length + 1,
                date: date,
                employee: `${employee.firstName} ${employee.lastName}`,
                amount: amount.startsWith('$') ? amount : `$${amount}`
            };
            incomeRecords.push(newRecord);
            renderIncome();
            addModal.style.display = 'none';
            addForm.reset();
            alert('Income record added successfully!');
        }
    }
}

editEmployeeForm.onsubmit = function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editEmployeeId').value);
    const employee = employees.find(e => e.id === id);
    const newLastName = document.getElementById('editLastName').value;
    const newFirstName = document.getElementById('editFirstName').value;
    const newAmount = document.getElementById('editEmployeeAmount').value;
    if (newLastName && newFirstName && newAmount) {
        const oldFullName = `${employee.firstName} ${employee.lastName}`;
        employee.lastName = newLastName;
        employee.firstName = newFirstName;
        employee.amount = newAmount.startsWith('$') ? newAmount : `$${newAmount}`;
        incomeRecords.forEach(r => {
            if (r.employee === oldFullName) r.employee = `${newFirstName} ${newLastName}`;
        });
        renderEmployees();
        renderIncome();
        editEmployeeModal.style.display = 'none';
        alert('Employee updated successfully!');
    }
}

editIncomeForm.onsubmit = function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editIncomeId').value);
    const record = incomeRecords.find(r => r.id === id);
    const employeeId = document.getElementById('editIncomeEmployee').value;
    const newAmount = document.getElementById('editIncomeAmount').value;
    const newDate = document.getElementById('editIncomeDate').value;
    if (employeeId && newAmount && newDate) {
        const employee = employees.find(e => e.id === parseInt(employeeId));
        record.employee = `${employee.firstName} ${employee.lastName}`;
        record.amount = newAmount.startsWith('$') ? newAmount : `$${newAmount}`;
        record.date = newDate;
        renderIncome();
        editIncomeModal.style.display = 'none';
        alert('Income record updated successfully!');
    }
}

imageSearchForm.onsubmit = function(e) {
    e.preventDefault();
    const file = searchImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const searchImg = e.target.result;
            if (currentSection === 'Employee') {
                const filtered = employees.filter(e => e.profileImg === searchImg);
                renderEmployees(filtered);
            }
            imageSearchModal.style.display = 'none';
            imageSearchForm.reset();
            searchImagePreview.style.display = 'none';
            alert(filtered.length ? 'Image search completed!' : 'No matches found.');
        }
        reader.readAsDataURL(file);
    }
}

document.addEventListener('click', function(e) {
    const row = e.target.closest('tr');
    if (!row) return;
    const id = parseInt(row.getAttribute('data-id'));
    if (e.target.classList.contains('edit-employee')) {
        const employee = employees.find(e => e.id === id);
        document.getElementById('editEmployeeId').value = id;
        document.getElementById('editLastName').value = employee.lastName;
        document.getElementById('editFirstName').value = employee.firstName;
        document.getElementById('editEmployeeAmount').value = employee.amount;
        editEmployeeModal.style.display = 'block';
    }
    if (e.target.classList.contains('delete-employee')) {
        if (confirm(`Are you sure you want to delete ${employees.find(e => e.id === id).firstName} ${employees.find(e => e.id === id).lastName}? This will also remove their income records.`)) {
            employees = employees.filter(e => e.id !== id);
            incomeRecords = incomeRecords.filter(r => !r.employee.includes(employees.find(e => e.id === id)?.firstName));
            renderEmployees();
            alert('Employee deleted successfully!');
        }
    }
    if (e.target.classList.contains('edit-income')) {
        const record = incomeRecords.find(r => r.id === id);
        document.getElementById('editIncomeId').value = id;
        const employee = employees.find(e => `${e.firstName} ${e.lastName}` === record.employee);
        document.getElementById('editIncomeEmployee').value = employee ? employee.id : '';
        document.getElementById('editIncomeAmount').value = record.amount;
        document.getElementById('editIncomeDate').value = record.date;
        editIncomeModal.style.display = 'block';
    }
    if (e.target.classList.contains('delete-income')) {
        if (confirm(`Are you sure you want to delete this income record for ${incomeRecords.find(r => r.id === id).employee} on ${incomeRecords.find(r => r.id === id).date}?`)) {
            incomeRecords = incomeRecords.filter(r => r.id !== id);
            renderIncome();
            alert('Income record deleted successfully!');
        }
    }
});

document.querySelectorAll('.side-menu li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.side-menu li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        const target = this.getAttribute('data-target');
        currentSection = target;
        document.getElementById(target).style.display = 'block';
        document.getElementById('searchInput').value = '';
        if (target === 'Employee') {
            renderEmployees();
            searchInput.focus(); // Focus the search input when Employee is clicked
        }
        if (target === 'income') renderIncome();
        sideMenu.classList.remove('open');
    });
});

document.getElementById('settingsForm').onsubmit = function(e) {
    e.preventDefault();
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
    alert('Settings saved!');
};

function performTextSearch(searchTerm) {
    if (currentSection === 'Employee') {
        const filtered = employees.filter(e => 
            e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderEmployees(filtered);
    }
    if (currentSection === 'income') {
        const filtered = incomeRecords.filter(r => 
            r.employee.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderIncome(filtered);
    }
}

let searchTimeout;
searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    const searchTerm = e.target.value.trim();
    searchTimeout = setTimeout(() => {
        if (searchTerm.toLowerCase() !== 'image') {
            performTextSearch(searchTerm);
        }
    }, 300);
});

function adjustContentMargin() {
    const headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelector('.content').style.marginTop = `${headerHeight}px`;
}
window.addEventListener('resize', adjustContentMargin);
window.addEventListener('load', adjustContentMargin);

// Initial render
renderEmployees();
renderIncome();
updateDashboard();
