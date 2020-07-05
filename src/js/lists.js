import { app, domSelectors } from './main';

const listsController = (() => {

  const lists = getLists();

  function getLists() {
    return JSON.parse(localStorage.getItem('todo-lists')) || createDefaultList();
  }

  // CURRENT LIST
  function getCurrentList() {
    const currentList = lists.indexOf(lists.find(list => list.active));
    // Default to first list if an active one not found
    return (currentList == -1) ? 0 : currentList;
  }

  // OPEN LIST
  function openList(index = 0) {
    lists[getCurrentList()].active = false;
    lists[index].active = true;
    //items = lists[index].items;
    app.update();
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
  function newList(e) {
    e.preventDefault();
    const name = (this.querySelector('#new-list-name')).value
    const list = {
      name,
      items: [],
      nextID: 0,
      active: false
    }
    lists.push(list);
    app.update();
    this.reset();
  }

  // EDIT LIST
  function editList(index) {
    const listEditForm = domSelectors.listsContainer.querySelector(`.list-edit-form[data-list-id="${index}"]`);
    const listName = domSelectors.listsContainer.querySelector(`.list-name[data-list-id="${index}"]`);
    const cancel = domSelectors.listsContainer.querySelector(`.list-edit[data-list-id="${index}"]`);

    listEditForm.classList.toggle('edit');
    listName.classList.toggle('edit');
    cancel.classList.toggle('edit');

    listEditForm.addEventListener('submit', editListSave);
    domSelectors.listsContainer.querySelector(`.list-name-edit[data-list-id="${index}"]`).select();
  }

  function editListSave(e) {
    e.preventDefault();
    const name = (this.querySelector('.list-name-edit')).value;
    const index = this.dataset.listId;
    lists[index].name = name;
    app.update();
  }

  // DELETE LIST
  function deleteList(index) {
    if (confirm(`Are you sure you want to delete ${lists[index].name}?\nAny items inside it will also be deleted!`)) {
      const currentList = getCurrentList();
      lists.splice(index, 1);
      // Open first list if currentlist is deleted otherwise just update
      (index == currentList) ? openList() : app.update();
    }
  }

  return { getLists, getCurrentList, openList, newList, editList, deleteList };

})();

export { listsController };