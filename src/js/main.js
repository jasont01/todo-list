// Event Listeners
const newItemBtn = document.getElementById('new-item-btn');
const newListBtn = document.getElementById('new-list-btn');
const editItemBtns = document.querySelectorAll('.item-edit');
const deleteItemBtns = document.querySelectorAll('.item-delete');
const editListBtns = document.querySelectorAll('.list-edit');
const deleteListBtns = document.querySelectorAll('.list-delete');
const items = document.querySelectorAll('.item-select');
const lists = document.querySelectorAll('.list-select');

newItemBtn.addEventListener('click', showNewItemForm);
newListBtn.addEventListener('click', createNewList);

editItemBtns.forEach(btn => { btn.addEventListener('click', editItem) });
deleteItemBtns.forEach(btn => { btn.addEventListener('click', deleteItem) });
editListBtns.forEach(btn => { btn.addEventListener('click', editList) });
deleteListBtns.forEach(btn => { btn.addEventListener('click', deleteList) });
items.forEach(btn => { btn.addEventListener('mouseup', toggleItemDone) });
lists.forEach(btn => { btn.addEventListener('click', openList) });

// TOGGLE ITEM DONE **checkbox hover style when hover on item title??**
function toggleItemDone(e) {
  const itemID = e.target.dataset.itemId;
  const itemCheck = document.getElementById(`item-check${itemID}`);
  const itemName = document.querySelector(`.item-title[data-item-id="${itemID}"]`);
  console.log(itemName);
  // toggle checkbox if item name was clicked
  if (e.target.localName == 'span') itemCheck.checked = !itemCheck.checked;
  itemName.classList.toggle('done');
}

// HandleNewItem function/module ??
// SHOW NEW ITEM FORM
function showNewItemForm() {
  const addNewItemBtn = document.getElementById('new-item-add');
  const cancelNewItemBtn = document.getElementById('new-item-cancel');
  addNewItemBtn.addEventListener('click', createNewItem);
  cancelNewItemBtn.addEventListener('click', hideNewItemForm);
  //show form / modal
  
}

// HIDE NEW ITEM FORM
function hideNewItemForm() {
  // hide form / modal

  // clear form contents
}

// NEW ITEM
function createNewItem() {
  const itemNameField = document.getElementById('new-item-title');
  const dateField = document.getElementById('new-item-date');
  const priorityField = document.getElementById('new-item-priority');

  //create new item
  console.log(itemNameField.value, dateField.value, priorityField.value);
  // itemNameField.value, dateField.value,  priorityField.value
  // store in localstorage

  hideNewItemForm();
}

// EDIT ITEM
function editItem(e) {
  console.log('edit-item-btn');
  console.log(e.target.dataset.itemId);
}

// DELETE ITEM
function deleteItem(e) {
  console.log('delete-item-btn');
  console.log(e.target.dataset.itemId);
}

// NEW LIST
function createNewList() {
  console.log('new-list-btn');
}

// EDIT LIST
function editList(e) {
  console.log(`edit-list-btn ${e.target.dataset.listId} clicked`);
}

// DELETE LIST
function deleteList(e) {
  console.log(`delete-list-btn ${e.target.dataset.listId} clicked`);
}

// OPEN LIST
function openList(e) {
  console.log(`list ${e.target.dataset.listId} clicked`);
}

// SHOW NEW LIST FORM

// GET TODOs

// RESIZE WINDOW ??

