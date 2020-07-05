import { displayController } from './display';

const storageController = (() => {

  const STORAGE_KEY = "todo-lists";

  //const lists = JSON.parse(localStorage.getItem(STORAGE_KEY)) || createDefaultList();

  function getLists() {
    const lists = JSON.parse(localStorage.getItem(STORAGE_KEY)) || createDefaultList();
    return lists;
  }

  // UPDATE
  function updateLists(lists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    displayController.render();
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

  return { getLists, updateLists };
})();

export { storageController };