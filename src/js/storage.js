/* eslint-disable import/no-cycle */
import displayController from './display';

const storageController = (() => {
  const STORAGE_KEY = 'todo-lists';

  // DEFAULT LIST
  function createDefaultList() {
    const defaultArray = [];
    const defaultList = {
      name: 'Default List',
      items: [],
      nextID: 0,
      active: true,
    };
    defaultArray.push(defaultList);
    return defaultArray;
  }

  function getLists() {
    const lists = JSON.parse(localStorage.getItem(STORAGE_KEY)) || createDefaultList();
    return lists;
  }

  // UPDATE
  function updateLists(lists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    displayController.render();
  }

  return { getLists, updateLists };
})();

export { storageController as default };
