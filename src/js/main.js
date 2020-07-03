// EVENT LISTENERS
const newItemBtn = document.getElementById('new-item-btn');
const newListBtn = document.getElementById('new-list-btn');
newItemBtn.addEventListener('click', showNewItemForm);
newListBtn.addEventListener('click', showNewListForm);

const itemsContainer = document.querySelector('.todo-container');
itemsContainer.addEventListener('click', handleItemsClick);

const highPriority = document.querySelector('.items-high');
const medPriority = document.querySelector('.items-med');
const lowPriority = document.querySelector('.items-low');

const listsContainer = document.querySelector('.lists');
listsContainer.addEventListener('click', handleListsClick);

//const items = JSON.parse(localStorage.getItem('items')) || [];
const lists = JSON.parse(localStorage.getItem('lists')) || createDefaultList();

let currentList = lists.map(list => { return list.active }).indexOf(true);
//if (currentList == -1) currentList = 0; // temp fix
let items = lists[currentList].items;

// HANDLE ITEMS CLICK
function handleItemsClick(e) {
  if (e.target.matches('input') || (e.target.matches('i'))) {
    const index = e.target.dataset.itemId;
    
    if (e.target.matches('input')) {
      toggleItem(index);
    } else {
      if (e.target.classList.contains('item-edit')) editItem(index);
      if (e.target.classList.contains('item-delete')) deleteItem(index);
    }
  }
}

// HANDLE LISTS CLICK
function handleListsClick(e) {
  if (e.target.matches('input') || (e.target.matches('i'))) {
    const index = e.target.dataset.listId;
    
    if (e.target.matches('input')) {
      if (index == currentList) return;
      openList(index);
    } else {
      if (e.target.classList.contains('list-edit')) editList(index);
      if (e.target.classList.contains('list-delete')) deleteList(index);
    }
  }
}

// WRITE TO LOCALSTORAGE
function write() {
  localStorage.setItem('lists', JSON.stringify(lists));
}

// TOGGLE ITEM DONE
function toggleItem(index) {
  items[index].done = !items[index].done;
  write();
  render();
}

// OPEN LIST
function openList(index) {
  lists[index].active = true;
  lists[currentList].active = false;
  currentList = index;
  //getItemsFromList();
  items = lists[currentList].items;
  write();
  render();
}

// HandleNewItem function/module ??
// SHOW NEW ITEM FORM
function showNewItemForm() {
  const newItemForm = document.querySelector('.new-item-form');
  const cancelNewItemBtn = document.getElementById('new-item-cancel');
  newItemForm.addEventListener('submit', createNewItem);
  cancelNewItemBtn.addEventListener('click', hideNewItemForm);
  
  console.warn('TODO: show new item form')
}

// HIDE NEW ITEM FORM
function hideNewItemForm() {
  console.warn('TODO: hide new item form')
  console.warn('TODO: reset date on dateselector')
}

// NEW ITEM
function createNewItem(e) {
  e.preventDefault();
  
  const title = (this.querySelector('#new-item-title')).value
  const date = (this.querySelector('#new-item-date')).value
  const priority = (this.querySelector('#new-item-priority')).value

  const item = {
    title,
    date,
    priority,
    done: false
  }

  items.push(item);

  write();
  render();
  this.reset();

  hideNewItemForm();
}

// EDIT ITEM
function editItem(index) {
  console.log('edit-item-btn');
  console.log(index);
}

// DELETE ITEM
function deleteItem(index) {
  console.log('delete-item-btn');
  console.log(index);
}

// SHOW NEW LIST FORM
function showNewListForm() {
  const newListForm = document.querySelector('.new-list-form');
  const cancelNewListBtn = document.getElementById('new-list-cancel');
  newListForm.addEventListener('submit', createNewList);
  cancelNewListBtn.addEventListener('click', hideNewListForm);
  
  console.warn('TODO: show new list form')
}

// DEFAULT LIST
function createDefaultList() {
  const defaultArray = []

  const defaultList = {
    name: "Default List",
    items: [],
    active: true
  }
  defaultArray.push(defaultList)
  return defaultArray;
}
// NEW LIST
function createNewList(e) {
  e.preventDefault();
  
  const name = (this.querySelector('#new-list-name')).value

  const list = {
    name,
    items: [],
    //items: [],
    //items: [],
    active: false
  }

  lists.push(list);
  console.table(list);

  write();
  render();
  this.reset();

  hideNewListForm();
}

// HIDE NEW LIST FORM
function hideNewListForm() {
  console.warn('TODO: hide new list form')
}

// EDIT LIST
function editList(index) {
  console.log(`edit-list-btn ${index} clicked`);
}

// DELETE LIST
function deleteList(index) {
  console.log(`delete-list-btn ${index} clicked`);
}

// RENDER
function render() {
  renderLists(lists, listsContainer);
  
  //sort items by priority then date, render each set
  //set display:none to any priority-* that is empty
  
  const itemsHigh = items.filter(item => { if (item.priority == 'priority-high') return item });
  console.log(itemsHigh);
  const itemsMed = items.filter(item => { if (item.priority == 'priority-med') return item });
  console.log(itemsMed.length);
  const itemsLow = items.filter(item => { if (item.priority == 'priority-low') return item });
  console.log(itemsLow.length);

  renderItems(itemsHigh, highPriority);
  renderItems(itemsMed, medPriority);
  renderItems(itemsLow, lowPriority);
}

function renderLists(lists = [], listsContainer) {
  listsContainer.innerHTML = lists.map((list, i) => {
    return `
    <li class="list list-${i}">
    <input type="radio" name="list-radio" id="list${i}" data-list-id="${i}" ${ (list.active) ? 'checked' : '' } />
    <label for="list${i}" class="list-name" data-list-id="${i}">${list.name}</label>
    <i class="fas fa-trash list-controls list-delete" data-list-id="${i}"></i>
    <i class="fas fa-edit list-controls list-edit" data-list-id="${i}"></i>
    </li>
    `;
  }).join('');
}

function renderItems(items = [], container) {
  container.innerHTML = items.map((item, i) => {
    return `
    <li>
    <div class="squaredThree">
    <input type="checkbox" id="item-check${i}" data-item-id="${i}" ${ (item.done) ? 'checked' : '' } />
    <label for="item-check${i}" class="item-title ${ (item.done) ? 'done' : '' }" data-item-id="${i}">${item.title}</label>
    </div>
    <i class="fas fa-trash item-delete" data-item-id="${i}"></i>
    <i class="fas fa-edit item-edit" data-item-id="${i}"></i>
    <span class="due-date">${item.date}</span>
    </li>
    `;
  }).join('');
}

// RESIZE WINDOW ??

////////
render();