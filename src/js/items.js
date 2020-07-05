import { format } from 'date-fns';
import { app, domSelectors } from './main';
import { listsController } from './lists';
import { renderDatePicker } from './datepicker';

const itemsController = (() => {

  const lists = listsController.getLists();

  function getItems() {
    return lists[listsController.getCurrentList()].items;
  }

  // ITEM INDEX
  function getIndexFromID(id) {
    const items = getItems();
    return items.indexOf(items.find(item => item.id == id));
  }

  // TOGGLE ITEM DONE
  function toggleItem(id) {
    const index = getIndexFromID(id);
    const items = getItems();
    items[index].done = !items[index].done;
    app.update();
  }

  // NEW ITEM
  function newItem(e) {
    e.preventDefault();
    const id = lists[listsController.getCurrentList()].nextID
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
    const items = getItems();
    items.push(item);
    lists[listsController.getCurrentList()].nextID++;
    app.update();
    this.reset();
  }

  // EDIT ITEM
  function editItem(id) {
    const items = getItems();
    const index = getIndexFromID(id);
    const datePickerDiv = domSelectors.itemsContainer.querySelector(`.item-date-edit[data-item-id="${id}"]`);
    renderDatePicker(datePickerDiv);
    const datePickerInput = datePickerDiv.querySelector('.date-picker');
    datePickerInput.value = format(new Date(items[index].date), 'MM-dd-yyyy');

    const itemEditForm = domSelectors.itemsContainer.querySelector(`.item-edit-form[data-item-id="${id}"]`);
    const itemName = domSelectors.itemsContainer.querySelector(`.item-title[data-item-id="${id}"]`)
    const itemDate = domSelectors.itemsContainer.querySelector(`.due-date[data-item-id="${id}"]`)
    const cancel = domSelectors.itemsContainer.querySelector(`.item-edit[data-item-id="${id}"]`)

    itemEditForm.classList.toggle('edit');
    itemName.classList.toggle('edit');
    itemDate.classList.toggle('edit');
    cancel.classList.toggle('edit');

    itemEditForm.addEventListener('submit', editItemSave);
    domSelectors.itemsContainer.querySelector(`.item-name-edit[data-item-id="${id}"]`).select();
  }

  function editItemSave(e) {
    e.preventDefault();
    const title = (this.querySelector('.item-name-edit')).value;
    const date = (this.querySelector('.date-picker')).value;
    const priority = (this.querySelector('.item-priority-edit')).value;

    const id = this.dataset.itemId;
    const index = getIndexFromID(id);
    const items = getItems();
    items[index].title = title;
    items[index].date = date;
    items[index].priority = priority;

    app.update();
  }

  // DELETE ITEM
  function deleteItem(id) {
    const items = getItems();
    const index = getIndexFromID(id);
    items.splice(index, 1);
    app.update();
  }

  return { getItems, toggleItem, newItem, editItem, deleteItem };
})();

export { itemsController };