/* eslint-disable eqeqeq */
/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import {
  format, formatDistance, differenceInDays, startOfDay,
} from 'date-fns';
import { renderDatePicker } from './datepicker';
import storageController from './storage';
import listsController from './lists';
import itemsController from './items';
import domSelectors from './dom';

const displayController = (() => {
  // PRIORITY LEVELS
  const priorityLevels = ['none', 'high', 'med', 'low'];

  function sortItems(items, priority) {
    // Filter items by priority level
    const filtered = items.filter((item) => (item.priority == priority));
    // Sort by date
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  function dueDate(itemDate) {
    const date = new Date(itemDate);
    const today = new Date();
    const daysFromToday = differenceInDays(date, startOfDay(today));

    if (daysFromToday == -1) return 'yesterday';
    if (daysFromToday == 0) return 'today';
    // if (daysFromToday == 0) return "<b>today!</b>";
    if (daysFromToday == 1) return 'tomorrow';
    return formatDistance(date, startOfDay(today), { addSuffix: true });
  }

  function renderLists(lists = [], listsContainer) {
    listsContainer.innerHTML = lists
      .map((list, i) => `
  <li class="list list-${i}">
    <input type="radio" name="list-radio" id="list${i}" data-list-id="${i}" ${list.active ? 'checked' : ''} />
    <label for="list${i}" class="list-name" data-list-id="${i}">${list.name}</label>
    <form class="list-edit-form" data-list-id="${i}">
      <input type="text" class="form-control form-control-sm list-name-edit" data-list-id="${i}" value="${list.name}" />
      <button type="submit" class="btn btn-sm btn-primary">Save</button>
    </form>
    <i class="fas fa-trash list-controls list-delete ${lists.length == 1 ? 'only-list' : ''}" data-list-id="${i}"></i>
    <i class="fas fa-edit list-controls list-edit" data-list-id="${i}"></i>
  </li>
  `)
      .join('');
  }

  function renderItems(items = [], container) {
    // show / hide priority header
    container.previousElementSibling.style.display = items.length > 0 ? 'block' : 'none';
    container.innerHTML = items
      .map((item) => {
        const { id } = item;
        const date = dueDate(item.date);

        const html = `
  <li>
    <div class="squaredThree">
      <input type="checkbox" id="item-check${id}" data-item-id="${id}" ${item.done ? 'checked' : ''} />
      <label for="item-check${id}" class="item-title ${item.done ? 'done' : ''}" data-item-id="${id}">${item.title}</label>
    </div>
    <form class="item-edit-form" data-item-id="${id}">
      <input type="text" class="form-control form-control-sm item-name-edit" data-item-id="${id}" value="${item.title}" />
      <select class="form-control form-control-sm item-priority-edit" data-item-id="${id}">
        <option value="priority-none" ${item.priority == 'priority-none' ? 'selected' : ''}>None</option>
        <option value="priority-high" ${item.priority == 'priority-high' ? 'selected' : ''}>High</option>
        <option value="priority-med" ${item.priority == 'priority-med' ? 'selected' : ''}>Medium</option>
        <option value="priority-low" ${item.priority == 'priority-low' ? 'selected' : ''}>Low</option>
      </select>
      <div class="item-date-edit" data-item-id="${id}" data-item-date="${format(new Date(item.date), 'yyyy-MM-dd')}"></div>
      <button type="submit" class="btn btn-sm btn-primary">Save</button>
    </form>
    <i class="fas fa-trash item-delete" data-item-id="${id}"></i>
    <i class="fas fa-edit item-edit" data-item-id="${id}"></i>
    <span class="due-date" data-item-id="${id}">${date}</span>
  </li>
  `;
        return html;
      })
      .join('');
  }

  // RENDER
  function render() {
    const lists = storageController.getLists();
    const currentList = listsController.getCurrentList();
    const { items } = currentList;

    // Reset button/form status
    domSelectors.newItemForm.classList.add('inactive');
    domSelectors.newListForm.classList.add('inactive');
    domSelectors.newListBtn.classList.remove('inactive');
    domSelectors.newItemBtn.classList.remove('inactive');

    // Disable buttons when page is full
    domSelectors.newItemBtn.disabled = items.length >= 10;
    domSelectors.newListBtn.disabled = lists.length >= 16;

    // Render lists
    renderLists(lists, domSelectors.listsContainer);

    // Render items
    priorityLevels.forEach((level) => {
      renderItems(
        sortItems(items, `priority-${level}`),
        domSelectors.itemsContainer.querySelector(`.items-${level}`),
      );
    });

    // Hide priority header if all items are priority-none
    const priorityNone = items.every((item) => item.priority == 'priority-none');
    if (priorityNone) {
      domSelectors.itemsContainer.querySelector(
        '.priority-none',
      ).style.display = 'none';
    }
  }

  // SHOW NEW ITEM FORM
  function showNewItemForm() {
    renderDatePicker(document.getElementById('date-picker'));
    domSelectors.newItemForm.classList.remove('inactive');
    domSelectors.newItemBtn.classList.add('inactive');
    document.getElementById('new-item-title').focus();
  }

  // SHOW NEW LIST FORM
  function showNewListForm() {
    domSelectors.newListForm.classList.toggle('inactive');
    domSelectors.newListBtn.classList.toggle('inactive');
    document.getElementById('new-list-name').focus();
  }

  // SHOW EDIT LIST
  function showEditList(index) {
    const listEditForm = domSelectors.listsContainer.querySelector(
      `.list-edit-form[data-list-id="${index}"]`,
    );
    const listName = domSelectors.listsContainer.querySelector(
      `.list-name[data-list-id="${index}"]`,
    );
    const cancel = domSelectors.listsContainer.querySelector(
      `.list-edit[data-list-id="${index}"]`,
    );

    listEditForm.classList.toggle('edit');
    listName.classList.toggle('edit');
    cancel.classList.toggle('edit');

    listEditForm.addEventListener('submit', listsController.editList);
    domSelectors.listsContainer
      .querySelector(`.list-name-edit[data-list-id="${index}"]`)
      .select();
  }

  // SHOW EDIT ITEM
  function showEditItem(id) {
    const datePickerDiv = domSelectors.itemsContainer.querySelector(
      `.item-date-edit[data-item-id="${id}"]`,
    );
    renderDatePicker(datePickerDiv, new Date(`${datePickerDiv.dataset.itemDate}T00:00`));
    const datePickerInput = datePickerDiv.querySelector('.date-picker');
    datePickerInput.value = datePickerDiv.dataset.itemDate;

    const itemEditForm = domSelectors.itemsContainer.querySelector(
      `.item-edit-form[data-item-id="${id}"]`,
    );
    const itemName = domSelectors.itemsContainer.querySelector(
      `.item-title[data-item-id="${id}"]`,
    );
    const itemDate = domSelectors.itemsContainer.querySelector(
      `.due-date[data-item-id="${id}"]`,
    );
    const cancel = domSelectors.itemsContainer.querySelector(
      `.item-edit[data-item-id="${id}"]`,
    );

    itemEditForm.classList.toggle('edit');
    itemName.classList.toggle('edit');
    itemDate.classList.toggle('edit');
    cancel.classList.toggle('edit');

    itemEditForm.addEventListener('submit', itemsController.editItem);
    domSelectors.itemsContainer
      .querySelector(`.item-name-edit[data-item-id="${id}"]`)
      .select();
  }

  return {
    render,
    showNewItemForm,
    showNewListForm,
    showEditList,
    showEditItem,
  };
})();

export { displayController as default };
