import { storageController } from './storage';

const listsController = (() => {

  const lists = storageController.getLists();

  // CURRENT LIST
  function getCurrentListIndex() {
    const currentListIndex = lists.indexOf(lists.find(list => list.active));
    // Default to first list if an active one not found
    return (currentListIndex == -1) ? 0 : currentListIndex;
  }
  
  function updateCurrentList(items) {
    const currentList = getCurrentList();
    currentList.items = items;
    storageController.updateLists(lists);
  }

  function getCurrentList() {
    return lists[getCurrentListIndex()];
  }

  function getNextID() {
    const currentList = getCurrentList();
    return (currentList.nextID + 1);
  }

  function incrementID() {
    const currentList = getCurrentList();
    currentList.nextID++;
  }

  // OPEN LIST
  function openList(index = 0) {
    getCurrentList().active = false;
    lists[index].active = true;
    storageController.updateLists(lists);
  }

  // NEW LIST
  function newList(e) {
    e.preventDefault();
    const name = (this.querySelector('#new-list-name')).value || 'untitled list';
    const newList = {
      name,
      items: [],
      nextID: 0,
      active: false
    }
    //const lists = storageController.getLists();
    lists.push(newList);
    storageController.updateLists(lists);
    this.reset();
  }

  // EDIT LIST
  function editList(e) {
    e.preventDefault();
    const name = (this.querySelector('.list-name-edit')).value;
    const index = this.dataset.listId;
    //const lists = storageController.getLists();
    lists[index].name = name;
    storageController.updateLists(lists);
  }

  // DELETE LIST
  function deleteList(index) {
    if (confirm(`Are you sure you want to delete ${lists[index].name}?\nAny items inside it will also be deleted!`)) {
      const isCurrentList = (index == getCurrentListIndex());
      lists.splice(index, 1);
      // Open first list if currentlist is deleted otherwise just update
      (isCurrentList) ? openList() : storageController.updateLists(lists);
    }
  }

  return { updateCurrentList, getCurrentListIndex, getCurrentList, incrementID, getNextID, openList, newList, editList, deleteList };

})();

export { listsController };