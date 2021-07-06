window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length ==0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";

        } catch (e) {
            textError.textContent = e;
        }
    });
   
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

// function demo()  {
//     console.log('demo');
//     try {
//         let employeePayrollData = createEmployeePayroll();
//         console.log("employeePayrollData",employeePayrollData);
//         createAndUpdateStorage(employeePayrollData);
//     } catch (e) {
//         return;
//     }
// }

const save = () => {
try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
} catch (e) {
    return;
}
}

function createAndUpdateStorage(employeePayrollData) {
console.log("createAndUpdateStorage")
let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
} else {
    employeePayrollList = [employeePayrollData]
}
alert(employeePayrollList.toString());
localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
let employeePayrollData = new EmployeePayrollData();
try {
    employeePayrollData.name = getInputValueById('#name');
} catch (e) {
    setTextValue('.text-error', e);
    throw e;
}
employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
employeePayrollData.department = getSelectedValues('[name=department]');
employeePayrollData.salary = getInputValueById('#salary');
employeePayrollData.notes = getInputValueById('#notes');
let date = getInputValueById('#day') + " " +getInputValueById('#month')+ " "+
            getInputValueById('#year');
            console.log(date);
            employeePayrollData.startDate = new Date(date);
// employeePayrollData.date = Date.parse(date);
// console.log('employeePayrollData' +employeePayrollData.toString())
alert(employeePayrollData.toString());
return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
let allItems = document.querySelectorAll(propertyValue);
let setItems = [];
allItems.forEach(item => {
    if(item.checked) setItems.push(item.value);
});
return selItems;
}
const getInputValueById = (id) => {
let value = document.querySelector(id).value;
return value;
}

const getInputElementValue = (id) => {
let value = document.getElementById(id).value;
return value;
}

const resetForm = () => {
setValue('#name', '');
unsetSelectedValues('[name=profile]');
unsetSelectedValues('[name=gender]');
unsetSelectedValues('[name=department]');
document.querySelector(".salary-output").textContent=400000;
document.querySelector("#day").value = 05;
document.querySelector("#month").value = 05;
document.querySelector("#year").value = 2019;
document.querySelector("#notes").value= "";
document.querySelector(".date-error").textContent = "";
// setValue('#salary','');
// setValue('#notes','');
// setValue('#day','1');
// setValue('#month', 'january');
// setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
let allItems = document.querySelectorAll(propertyValue);
allItems.forEach(item => {   
item.checked = false;
});
}

const setTextValue =(id, value) => {
const element = document.querySelector(id);
element.textContent = value;
}

const setValue =(id, value) => {
const element = document.querySelector(id);
element.value = value;
}

const checkForUpdate = () =>{
const employeePayrollJSON = localStorage.getItem('editEmp');
isUpdate = employeePayrollJSON ? true :false;
if(!isUpdate) return;
employeePayrollObj = JSON.parse(employeePayrollJSON);
setForm();
}
const setForm = () =>{
document.querySelector('#name').value = employeePayrollObj._name;
setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
setSelectedValues('[name=gender]',employeePayrollObj._gender);
setSelectedValues('[name=department]',employeePayrollObj._department);
document.querySelector("#salary").value = employeePayrollObj._salary;
document.querySelector(".salary-output").textContent = employeePayrollObj._salary;
document.querySelector('#notes').value = employeePayrollObj._notes;
let date = stringifyDate(employeePayrollObj._startDate).split("/");
document.querySelector('#day').value = date[0];
document.querySelector('#month').value = date[1];
document.querySelector('#year').value = date[2];
}
const stringifyDate = (date)=> {
const options = {day: 'numeric', month: 'String', year:'numeric'};
const newDate = !date ? "undefined":new Date(Date.parse(date)).toLocaleDateString('en-IN',options);
return newDate;
}
