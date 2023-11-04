function solve(params) {
    const baseUrl = `http://localhost:3030/jsonstore/collections/students`;
    const resultsTable = document.querySelector('#results');
    resultsTable.classList.add('table');
    const tbody = resultsTable.querySelector('tbody');
    displayTable();
    const form = document.querySelector('form');
    const [firstName, lastName, facultyNumber, grade] = form.querySelectorAll('input');
    const submitBtn = form.querySelector('button');
    submitBtn.addEventListener('click', (ev) => {
        if(!firstName.value || !lastName.value || !facultyNumber.value || !grade.value) {
            throw new Error ('Invalid input');
        }else{
            addStudent();
        }
    });

    async function addStudent(){
        try {
            const studentData = {
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            }
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });
            const data = await response.json();
            firstName.value = '';
            lastName.value = '';
            facultyNumber.value = '';
            grade.value = '';
            displayTable();
        } catch (error) {
            throw new Error('Invalid input');
        }
        
    }

    async function displayTable() {
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            for (const student in data) {
                let firstName = data[student].firstName;
                let lastName = data[student].lastName;
                let facultyNumber = data[student].facultyNumber;
                let grade = data[student].grade;
                let studentId = data[student]._id;
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <th>${firstName}</th>
                <th>${lastName}</th>
                <th>${facultyNumber}</th>
                <th>${grade}</th>`;
                tbody.appendChild(tr);
            }
        } catch (error) {
            throw new Error('Invalid input');
        }
    }
}
solve()