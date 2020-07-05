import { displayController } from './render';

const listsController = (() => {

  const lists = getLists();

  function getLists() {
    return JSON.parse(localStorage.getItem('todo-lists')) || createDefaultList();
  }

  // UPDATE
  function update() {
    localStorage.setItem('todo-lists', JSON.stringify(lists));
    displayController.render();
  }

  function updateCurrentList(items) {
    const currentList = getCurrentList();
    lists[currentList].items = items;
    update();
  }

  // CURRENT LIST
  function getCurrentList() {
    const currentList = lists.indexOf(lists.find(list => list.active));
    // Default to first list if an active one not found
    return (currentList == -1) ? 0 : currentList;
  }

  function getNextID() {
    const id = lists[getCurrentList()].nextID;
    return (id + 1);
  }

  function incrementID() {
    lists[getCurrentList()].nextID++;
  }

  // OPEN LIST
  function openList(index = 0) {
    lists[getCurrentList()].active = false;
    lists[index].active = true;
    update();
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
    update();
    this.reset();
  }

  // EDIT LIST
  function editList(e) {
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

  return { getLists, updateCurrentList, getCurrentList, incrementID, getNextID, openList, newList, editList, deleteList };

})();

export { listsController };