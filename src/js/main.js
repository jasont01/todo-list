import { format, formatDistance, differenceInDays, startOfDay } from 'date-fns';
import { renderDatePicker } from './datepicker';

//  TODO:       
//        priority: none
//        refactor / modules? / this??
//        Responsive
//   Future:
//        pagination ?
//        change fonts / colors?
//        set initial date in datePicker to item.date (need to learn react)

// SELECTORS
const newItemBtn = document.getElementById('new-item-btn');
const newListBtn = document.getElementById('new-list-btn');
const newListForm = document.querySelector('.new-list-form');
const newItemForm = document.querySelector('.new-item-form');
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
  if (e.target.matches('input[type="checkbox"') || (e.target.matches('i'))) {
    const id = e.target.dataset.itemId;
    const index = getIndexFromID(id);
    if (e.target.matches('input')) {
      toggleItem(index);
    } else {
      if (e.target.classList.contains('item-edit')) editItem(id);
      if (e.target.classList.contains('item-delete')) deleteItem(index);
    }
  }
}

// HANDLE LISTS CLICK
function handleListsClick(e) {
  if (e.target.matches('input[type="radio"]') || (e.target.matches('i'))) {
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

function getIndexFromID(id) {
  return items.indexOf(items.find(item => item.id == id));
}

// UPDATE
function update() {
  localStorage.setItem('todo-lists', JSON.stringify(lists));
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
  const cancelNewItemBtn = document.getElementById('new-item-cancel');
  newItemForm.addEventListener('submit', createNewItem);
  cancelNewItemBtn.addEventListener('click', render);

  newItemForm.classList.remove('inactive');
  newItemBtn.classList.add('inactive');
  document.getElementById('new-item-title').focus();
}

// NEW ITEM
function createNewItem(e) {
  e.preventDefault();
  const id = lists[currentList].nextID
  const title = (this.querySelector('#new-item-title')).value
  const date = new Date((this.querySelector('.date-picker')).value)
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
}

// EDIT ITEM
function editItem(id) {
  const index = getIndexFromID(id);
  const datePickerDiv = document.querySelector(`.item-date-edit[data-item-id="${id}"]`);
  renderDatePicker(datePickerDiv);
  const datePickerInput = datePickerDiv.querySelector('.date-picker');
  datePickerInput.value = format(new Date(items[index].date), 'MM-dd-yyyy');
  
  const itemEditForm = document.querySelector(`.item-edit-form[data-item-id="${id}"]`);
  const itemName = document.querySelector(`.item-title[data-item-id="${id}"]`)
  const itemDate = document.querySelector(`.due-date[data-item-id="${id}"]`)
  const cancel = document.querySelector(`.item-edit[data-item-id="${id}"]`)

  itemEditForm.classList.toggle('edit');
  itemName.classList.toggle('edit');
  itemDate.classList.toggle('edit');
  cancel.classList.toggle('edit');
  
  itemEditForm.addEventListener('submit', editItemSave);
}

function editItemSave(e) {
  e.preventDefault();
  const title = (this.querySelector('.item-name-edit')).value;
  const date = (this.querySelector('.date-picker')).value;
  const priority = (this.querySelector('.item-priority-edit')).value;

  const id = this.dataset.itemId;
  const index = getIndexFromID(id);
  items[index].title = title;
  items[index].date = date;
  items[index].priority = priority;

  update();
}

// DELETE ITEM
function deleteItem(index) {
  items.splice(index, 1);
  update();
}

// SHOW NEW LIST FORM
function showNewListForm() {
  const cancelNewListBtn = document.getElementById('new-list-cancel');
  newListForm.addEventListener('submit', createNewList);
  cancelNewListBtn.addEventListener('click', render);
  newListForm.classList.toggle('inactive');
  newListBtn.classList.toggle('inactive');
  document.getElementById('new-list-name').focus();
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
  update();
  this.reset();
}

// EDIT LIST
function editList(index) {
  const listEditForm = document.querySelector(`.list-edit-form[data-list-id="${index}"]`);
  const listName = document.querySelector(`.list-name[data-list-id="${index}"]`)
  const cancel = document.querySelector(`.list-edit[data-list-id="${index}"]`)

  listEditForm.classList.toggle('edit');
  listName.classList.toggle('edit');
  cancel.classList.toggle('edit');
  
  listEditForm.addEventListener('submit', editListSave); 
}

function editListSave(e) {
  e.preventDefault();
  const name = (this.querySelector('.list-name-edit')).value;
  const index = this.dataset.listId;
  lists[index].name = name;
  update();
}

// DELETE LIST
function deleteList(index) {
  if (confirm("Are you sure you want to delete this list and any items inside it?")) {
    lists.splice(index, 1);
    update();
  }
}

// RENDER
function render() {
  newItemForm.classList.add('inactive');
  newListForm.classList.add('inactive');
  newListBtn.classList.remove('inactive');
  newItemBtn.classList.remove('inactive');
  checkLimits();
  
  // Sort items by priority level
  const itemsHigh = items.filter(item => { if (item.priority == 'priority-high') return item });
  const itemsMed = items.filter(item => { if (item.priority == 'priority-med') return item });
  const itemsLow = items.filter(item => { if (item.priority == 'priority-low') return item });
  // Sort by date
  itemsHigh.sort((a,b) => new Date(a.date) - new Date(b.date));
  itemsMed.sort((a,b) => new Date(a.date) - new Date(b.date));
  itemsLow.sort((a,b) => new Date(a.date) - new Date(b.date));
  
  renderLists(lists, listsContainer);
  renderItems(itemsHigh, highPriority);
  renderItems(itemsMed, medPriority);
  renderItems(itemsLow, lowPriority);
}

function checkLimits() {
  const MAX_LISTS = 16;
  const MAX_ITEMS = 10;
  // Disable new-* buttons when page is full
  newItemBtn.disabled = (items.length >= MAX_ITEMS)
  newListBtn.disabled = (lists.length >= MAX_LISTS)
}

function renderLists(lists = [], listsContainer) {
  listsContainer.innerHTML = lists.map((list, i) => {
    return `
    <li class="list list-${i}">
      <input type="radio" name="list-radio" id="list${i}" data-list-id="${i}" ${(list.active) ? 'checked' : ''} />
      <label for="list${i}" class="list-name" data-list-id="${i}">${list.name}</label>
      <form class="list-edit-form" data-list-id="${i}">
        <input type="text" class="form-control form-control-sm list-name-edit" data-list-id="${i}" value="${list.name}" />
        <button type="submit" class="btn btn-sm btn-primary">Save</button>
      </form>
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
      <form class="item-edit-form" data-item-id="${id}">
        <input type="text" class="form-control form-control-sm item-name-edit" data-item-id="${id}" value="${item.title}" />
        <select class="form-control form-control-sm item-priority-edit" data-item-id="${id}">
          <option value="priority-high" ${ (item.priority == 'priority-high') ? 'selected' : '' }>High</option>
          <option value="priority-med" ${ (item.priority == 'priority-med') ? 'selected' : '' }>Medium</option>
          <option value="priority-low" ${ (item.priority == 'priority-low') ? 'selected' : '' }>Low</option>
        </select>
        <div class="item-date-edit" data-item-id="${id}"></div>
        <button type="submit" class="btn btn-sm btn-primary">Save</button>
      </form>
      <i class="fas fa-trash item-delete" data-item-id="${id}"></i>
      <i class="fas fa-edit item-edit" data-item-id="${id}"></i>
      <span class="due-date" data-item-id="${id}">${date}</span>
    </li>
    `;
    return html;
  }).join('');
}

function dueDate(itemDate) {
  const date = new Date(itemDate);
  const today = new Date();
  const daysFromToday = differenceInDays(date, startOfDay(today));

  if (daysFromToday == -1) return "yesterday";
  if (daysFromToday == 0) return "today";
  //if (daysFromToday == 0) return "<b>today!</b>";
  if (daysFromToday == 1) return "tomorrow";
  return formatDistance(date, startOfDay(today),{ addSuffix: true });
}

////////
render();
renderDatePicker(document.getElementById('date-picker'));