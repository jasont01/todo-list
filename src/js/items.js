import { listsController } from './lists';

const itemsController = (() => {

  function getItems() {
    const currentList = listsController.getCurrentList();
    return currentList.items;
  }

  // ITEM INDEX
  function getIndexFromID(id) {
    const items = getItems();
    const item = items.find(item => item.id == id);
    return items.indexOf(item);
  }

  function updateItems(items) {
    listsController.updateCurrentList(items);
  }

  // TOGGLE ITEM DONE
  function toggleItem(id) {
    const index = getIndexFromID(id);
    const items = getItems();
    items[index].done = !items[index].done;
    updateItems(items);
  }

  // NEW ITEM
  function newItem(e) {
    e.preventDefault();
    const id = listsController.getNextID();
    const title = (this.querySelector('#new-item-title')).value;
    const date = new Date(this.querySelector('.date-picker').value + 'T00:00');
    const priority = (this.querySelector('#new-item-priority')).value;
    const item = {
      id,
      title,
      date,
      priority,
      done: false
    }
    const items = getItems();
    items.push(item);
    listsController.incrementID();
    updateItems(items);
    this.reset();
  }

  // EDIT ITEM
  function editItem(e) {
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

    updateItems(items);
  }

  // DELETE ITEM
  function deleteItem(id) {
    const items = getItems();
    const index = getIndexFromID(id);
    items.splice(index, 1);
    updateItems(items);
  }

  return { toggleItem, newItem, editItem, deleteItem };
})();

export { itemsController };