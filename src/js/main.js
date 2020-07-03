import { formatDistance, parse, differenceInDays, startOfDay } from 'date-fns';

// SELECTORS
const newItemBtn = document.getElementById('new-item-btn');
const newListBtn = document.getElementById('new-list-btn');
const listsContainer = document.querySelector('.lists');
const itemsContainer = document.querySelector('.todo-container');
const highPriority = document.querySelector('.items-high');
const medPriority = document.querySelector('.items-med');
const lowPriority = document.querySelector('.items-low');

// EVENT LISTENERS
newItemBtn.addEventListener('click', showNewItemForm);
newListBtn.addEventListener('click', showNewListForm);
itemsContainer.addEventListener('click', handleItemsClick);
listsContainer.addEventListener('click', handleListsClick);

// GLOBALS
const lists = JSON.parse(localStorage.getItem('todo-lists')) || createDefaultList();
let currentList = lists.indexOf(lists.find(list => list.active));
let items = lists[currentList].items;

// HANDLE ITEMS CLICK
function handleItemsClick(e) {
  if (e.target.matches('input') || (e.target.matches('i'))) {
    const id = e.target.dataset.itemId;
    const index = items.indexOf(items.find(item => item.id == id));
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

// UPDATE
function update() {
  localStorage.setItem('lists', JSON.stringify(lists));
  render();
}

// TOGGLE ITEM DONE
function toggleItem(index) {
  items[index].done = !items[index].done;
  update();
}

// OPEN LIST
function openList(index) {
  lists[index].active = true;
  lists[currentList].active = false;
  currentList = index;
  items = lists[currentList].items;
  update();
}

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

  console.warn('TODO: hide new item form');
}

// NEW ITEM
function createNewItem(e) {
  e.preventDefault();

  const id = lists[currentList].nextID
  const title = (this.querySelector('#new-item-title')).value
  const date = (this.querySelector('#new-item-date')).value
  const priority = (this.querySelector('#new-item-priority')).value

  const item = {
    id,
    title,
    date,
    priority,
    done: false
  }

  items.push(item);
  lists[currentList].nextID++;
  update();
  this.reset();

  hideNewItemForm();
}

// EDIT ITEM
function editItem(index) {

}

// DELETE ITEM
function deleteItem(index) {
  items.splice(index, 1);
  update();
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
    nextID: 0,
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
    nextID: 0,
    active: false
  }

  lists.push(list);
  console.table(list);

  update();
  this.reset();

  hideNewListForm();
}

// HIDE NEW LIST FORM
function hideNewListForm() {
  console.warn('TODO: hide new list form')
}

// EDIT LIST
function editList(index) {
  
}

// DELETE LIST
function deleteList(index) {
  // TODO add confirmation / warning that all items inside list will be deleted
  lists.splice(index, 1);
  update();
}

// RENDER
function render() {
  renderLists(lists, listsContainer);

  // TODO: sort by date
  // priority: none ??

  // Sort items by priority level
  const itemsHigh = items.filter(item => { if (item.priority == 'priority-high') return item });
  const itemsMed = items.filter(item => { if (item.priority == 'priority-med') return item });
  const itemsLow = items.filter(item => { if (item.priority == 'priority-low') return item });

  renderItems(itemsHigh, highPriority);
  renderItems(itemsMed, medPriority);
  renderItems(itemsLow, lowPriority);
}

function renderLists(lists = [], listsContainer) {
  listsContainer.innerHTML = lists.map((list, i) => {
    return `
    <li class="list list-${i}">
    <input type="radio" name="list-radio" id="list${i}" data-list-id="${i}" ${(list.active) ? 'checked' : ''} />
    <label for="list${i}" class="list-name" data-list-id="${i}">${list.name}</label>
    <i class="fas fa-trash list-controls list-delete" data-list-id="${i}"></i>
    <i class="fas fa-edit list-controls list-edit" data-list-id="${i}"></i>
    </li>
    `;
  }).join('');
}

function renderItems(items = [], container) {
  // show / hide priority header
  container.previousElementSibling.style.display = (items.length > 0) ? "block" : "none";
  container.innerHTML = items.map((item) => {
    const id = item.id;
    const date = dueDate(item.date);

    const html = `
    <li>
    <div class="squaredThree">
    <input type="checkbox" id="item-check${id}" data-item-id="${id}" ${(item.done) ? 'checked' : ''} />
    <label for="item-check${id}" class="item-title ${(item.done) ? 'done' : ''}" data-item-id="${id}">${item.title}</label>
    </div>
    <i class="fas fa-trash item-delete" data-item-id="${id}"></i>
    <i class="fas fa-edit item-edit" data-item-id="${id}"></i>
    <span class="due-date">${date}</span>
    </li>
    `;
    return html;
  }).join('');
}

function dueDate(itemDate) {
  const date = parse(itemDate, 'MM-dd-yyyy', new Date());
  const daysFromToday = differenceInDays(date, startOfDay(new Date()));

  if (daysFromToday > 1) return formatDistance(date, startOfDay(new Date()));
  if (daysFromToday == 1) return "tomorrow";
  //if (daysFromToday == 0) return "<b>today!</b>";
  if (daysFromToday == 0) return "today";
  //todo past dates. isYesterday()
}

// RESIZE WINDOW ??

////////
render();