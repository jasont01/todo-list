import { format, formatDistance, differenceInDays, startOfDay } from 'date-fns';
import { renderDatePicker } from './datepicker';

//  TODO:       
//        refactor / modules? / this??
//        Responsive
//   Future Plans:
//        add custom priority levels
//        add pagination
//        add custom fonts / colors
//        set initial date in datePicker popup to item.date (need to learn react)

// SELECTORS
const newItemBtn = document.getElementById('new-item-btn');
const newListBtn = document.getElementById('new-list-btn');
const newListForm = document.querySelector('.new-list-form');
const newItemForm = document.querySelector('.new-item-form');
const listsContainer = document.querySelector('.lists');
const itemsContainer = document.querySelector('.todo-container');

// EVENT LISTENERS
newItemBtn.addEventListener('click', showNewItemForm);
newListBtn.addEventListener('click', showNewListForm);
itemsContainer.addEventListener('click', handleItemsClick);
listsContainer.addEventListener('click', handleListsClick);

// GLOBALS
const lists = JSON.parse(localStorage.getItem('todo-lists')) || createDefaultList();
const priorityLevels = ['none', 'high', 'med', 'low'];
let items = lists[getCurrentList()].items;

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
      if (index == getCurrentList()) return;
      openList(index);
    } else {
      if (e.target.classList.contains('list-edit')) editList(index);
      if (e.target.classList.contains('list-delete')) deleteList(index);
    }
  }
}

// CURRENT LIST
function getCurrentList() {
  const currentList = lists.indexOf(lists.find(list => list.active));
  // Default to first list if an active one not found
  return (currentList == -1) ? 0 : currentList;
}

// ITEM INDEX
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
function openList(index = 0) {
  lists[getCurrentList()].active = false;
  lists[index].active = true;
  items = lists[index].items;
  update();
}

//function clearEdits() {
//  Array.from(document.getElementsByClassName('edit')).forEach(node => {
//    node.classList.remove('edit');
//  });
//}

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
  const id = lists[getCurrentList()].nextID
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
  lists[getCurrentList()].nextID++;
  update();
  this.reset();
}

// EDIT ITEM
function editItem(id) {
  const index = getIndexFromID(id);
  const datePickerDiv = itemsContainer.querySelector(`.item-date-edit[data-item-id="${id}"]`);
  renderDatePicker(datePickerDiv);
  const datePickerInput = datePickerDiv.querySelector('.date-picker');
  datePickerInput.value = format(new Date(items[index].date), 'MM-dd-yyyy');

  const itemEditForm = itemsContainer.querySelector(`.item-edit-form[data-item-id="${id}"]`);
  const itemName = itemsContainer.querySelector(`.item-title[data-item-id="${id}"]`)
  const itemDate = itemsContainer.querySelector(`.due-date[data-item-id="${id}"]`)
  const cancel = itemsContainer.querySelector(`.item-edit[data-item-id="${id}"]`)

  itemEditForm.classList.toggle('edit');
  itemName.classList.toggle('edit');
  itemDate.classList.toggle('edit');
  cancel.classList.toggle('edit');

  itemEditForm.addEventListener('submit', editItemSave);
  itemsContainer.querySelector(`.item-name-edit[data-item-id="${id}"]`).select();
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
  const listEditForm = listsContainer.querySelector(`.list-edit-form[data-list-id="${index}"]`);
  const listName = listsContainer.querySelector(`.list-name[data-list-id="${index}"]`);
  const cancel = listsContainer.querySelector(`.list-edit[data-list-id="${index}"]`);

  listEditForm.classList.toggle('edit');
  listName.classList.toggle('edit');
  cancel.classList.toggle('edit');

  listEditForm.addEventListener('submit', editListSave);
  listsContainer.querySelector(`.list-name-edit[data-list-id="${index}"]`).select();
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
  if (confirm(`Are you sure you want to delete ${lists[index].name}?\nAny items inside it will also be deleted!`)) {
    const currentList = getCurrentList();
    lists.splice(index, 1);
    // Open first list if currentlist is deleted otherwise just update
    (index == currentList) ? openList() : update();
  }
}

// RENDER
function render() {
  // Reset button/form status
  newItemForm.classList.add('inactive');
  newListForm.classList.add('inactive');
  newListBtn.classList.remove('inactive');
  newItemBtn.classList.remove('inactive');

  // Check if page is full
  checkLimits();

  // Render lists
  renderLists(lists, listsContainer);

  // Render items
  priorityLevels.forEach(level => {
    renderItems(sortItems(`priority-${level}`), itemsContainer.querySelector(`.items-${level}`))
  });

  // Hide priority header if all items are priority-none
  const priorityNone = items.every( item => {
    return item.priority == 'priority-none';
  });
  if (priorityNone) {
    itemsContainer.querySelector('.priority-none').style.display = "none";
  }
}

function checkLimits() {
  const MAX_LISTS = 16;
  const MAX_ITEMS = 10;
  // Disable buttons when page is full
  newItemBtn.disabled = (items.length >= MAX_ITEMS)
  newListBtn.disabled = (lists.length >= MAX_LISTS)
}

function sortItems(priority) {
  // Filter items by priority level
  const filtered = items.filter(item => { if (item.priority == priority) return item });
  // Sort by date
  return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
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
      <i class="fas fa-trash list-controls list-delete ${ (lists.length == 1) ? 'only-list' : ''}" data-list-id="${i}"></i>
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
          <option value="priority-none" ${ (item.priority == 'priority-none') ? 'selected' : ''}>None</option>
          <option value="priority-high" ${ (item.priority == 'priority-high') ? 'selected' : ''}>High</option>
          <option value="priority-med" ${ (item.priority == 'priority-med') ? 'selected' : ''}>Medium</option>
          <option value="priority-low" ${ (item.priority == 'priority-low') ? 'selected' : ''}>Low</option>
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
  return formatDistance(date, startOfDay(today), { addSuffix: true });
}

////////
render();
renderDatePicker(document.getElementById('date-picker'));