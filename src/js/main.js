// Event Listeners
const newItemBtn = document.querySelector('#new-item-btn');
const newListBtn = document.querySelector('#new-list-btn');
const editItemBtns = document.querySelectorAll('.item-edit');
const deleteItemBtns = document.querySelectorAll('.item-delete');
const editListBtns = document.querySelectorAll('.list-edit');
const deleteListBtns = document.querySelectorAll('.list-delete');
const items = document.querySelectorAll('.item-select');
const lists = document.querySelectorAll('.list-select');

newItemBtn.addEventListener('click', createNewItem);
newListBtn.addEventListener('click', createNewList);

editItemBtns.forEach(btn => { btn.addEventListener('click', editItem) });
deleteItemBtns.forEach(btn => { btn.addEventListener('click', deleteItem) });
editListBtns.forEach(btn => { btn.addEventListener('click', editList) });
deleteListBtns.forEach(btn => { btn.addEventListener('click', deleteList) });
items.forEach(btn => { btn.addEventListener('mouseup', toggleItemDone) });
lists.forEach(btn => { btn.addEventListener('click', openList) });

// TOGGLE ITEM DONE **checkbox hover style when hover on item title??**
function toggleItemDone() {
  console.log('toggle-item');
}

// NEW ITEM
function createNewItem() {
  console.log('new-item-btn');
}

// EDIT ITEM
function editItem() {
  console.log('edit-item-btn');
}

// DELETE ITEM
function deleteItem() {
  console.log('delete-item-btn');
}

// NEW LIST
function createNewList() {
  console.log('new-list-btn');
}

// EDIT LIST
function editList() {
  console.log('edit-list-btn');
}

// DELETE LIST
function deleteList() {
  console.log('delete-list-btn');
}

// OPEN LIST
function openList() {
  console.log('list clicked');
}

// SHOW NEW ITEM FORM

// SHOW NEW LIST FORM

// GET TODOs

// RESIZE WINDOW ??