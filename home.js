 window.addEventListener('DOMContentLoaded',(event)=>{
     createInnerHtml();
 });
 const createInnerHtml = () =>{
     const innerHtml = `
     <tr>
                 <th></th>
                 <th>Name</th>
                 <th>Gender</th>
                 <th>Department</th>
                 <th>Salary</th>
                 <th>Start Date</th>
                 <th>Action</th>
                </tr>
                <tr>
                    <td>
                        <img class="profile" alt="" src="../assets/profile-images/Ellipse -3.png">
                    </td>
                    <td>Hatim Karma</td>
                    <td>Male</td>
                    <td>
                        <div class="dept-label">HR</div>
                        <div class="dept-label">Finance</div>
                    </td>
                    <td>3000000</td>
                    <td>1 Nov 2020</td>
                    <td>
                        <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                        <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
                    </td>
                </tr>
     `;
     document.querySelector('#table-display').innerHTML = innerHtml;
 }
 let isUpdate = false;
let employeePayrollObj = {};

let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
   localStorage.removeItem('editEmp');    
});

const getEmployeePayrollDataFromStorage = () => {
  console.log(localStorage.getItem("EmployeePayrollList"));
    return localStorage.getItem('EmployeePayrollList') ?
 JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

//Template Literate ES6 Feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>start Date</th><th>Actions</th>";
   if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;  
    let empPayrollList = createEmployeePayrollJSON();
    for (const employeePayrollData of empPayrollList) {
        innerHtml = `${innerHtml}

            <tr>
            <td> <img class ="profile" alt="" src="${employeePayrollData._profilePic}"></td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${employeePayrollData._startDate}</td>
                <td>
                    <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp (1).svg">
                     <img name="${employeePayrollData._id}" onclick="edit(this)" alt="edit"  src="../assets/edit_icon.svg"">
               
                    </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: "pappu kumar",
            _gender: "male",
            _department: [
              "HR","Engineer"
            ],
            _salary: "40000",
            _startDate: "1 may 2020",
            _notes: "",
            _id: new Date().getTime(),
            _profilePic: "../assets/Ellipse -9.png"
          },
          {
            _name: "Aahan Thakur",
            _gender: "male",
            _department: [
              "Finance"
            ],
            _salary: "450000",
            _startDate: "1 oct 2020",
            _notes: "",
            _id: new Date().getTime(),
            _profilePic: "../assets/Ellipse -10.png"
          }
        ];
        return empPayrollListLocal;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class = 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}
const remove = (node) => {
    let employeePayrollData = empPayrollList.find(empData => empData._id = node.id);
    if(!employeePayrollData) 
        return;
    const index = empPayrollList.map(empData=>empData._id)
                                .indexOf(employeePayrollData._id);
                                empPayrollList.splice(index,1);
    localStorage.setItem('empPayrollList',JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
}
const update = (node) => {
    // console.log("Thakur");
    let employeePayrollData = empPayrollList.find(empData => empData._id = node.id);
    if(!employeePayrollData) 
        return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}
