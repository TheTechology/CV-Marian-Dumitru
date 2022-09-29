// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBnt = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".gorcery-list");
const clearBnt = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//SUBMIT FORM
form.addEventListener("submit", addItem);
//clera iteams
clearBnt.addEventListener("click", cleraItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");
    //add class
    element.classList.add("grocery-item");
    //add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>

      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener('click', editItem)
    //apend child
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    //show container
    container.classList.add("show-container");

  

    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML=value
    displayAlert('value change','success')
   
    setBackToDefault()
  } else {
    displayAlert("empthy value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// cleraItems
function cleraItems() {
  const iteams = document.querySelectorAll(".grocery-item");

  if (iteams.length > 0) {
    iteams.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empthy list", "danger");
  setBackToDefault();
  
}

// delete function
function deleteItem(e) {
  const element=e.currentTarget.parentElement.parentElement
  const id=element.dataset.id
  list.removeChild(element)
  if(list.children.length ===0){
    container.classList.remove('show-container')
  }
  displayAlert('item removed', 'danger')
  setBackToDefault()
  
 

}
// edit function
function editItem(e) {
  const element=e.currentTarget.parentElement.parentElement
  //set edit item 
  editElement=e.currentTarget.parentElement.previousElementSibling
  //set from value
  grocery.value=editElement.innerHTML
  editFlag=true
  editID=element.dataset.id
  submitBnt.textContent='edit'

}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBnt.textContent = "submit";
}

// ****** LOCAL STORAGE **********
