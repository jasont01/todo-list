import { eventHandler } from './events';
import { displayManager } from './render';
import { listsController } from './lists';
import { itemsController } from './items';

//  TODO:       
//        refactor / modules? / this??
//        Responsive
//   Future Plans:
//        add custom priority levels
//        add pagination
//        add custom fonts / colors
//        set initial date in datePicker popup to item.date (need to learn react)

// SELECTORS
const domSelectors = (() => {
    const newItemBtn = document.getElementById('new-item-btn');
    const newListBtn = document.getElementById('new-list-btn');
    const newListForm = document.querySelector('.new-list-form');
    const newItemForm = document.querySelector('.new-item-form');
    const listsContainer = document.querySelector('.lists');
    const itemsContainer = document.querySelector('.todo-container');
    const cancelNewItemBtn = document.getElementById('new-item-cancel');
    const cancelNewListBtn = document.getElementById('new-list-cancel');

    return { newItemBtn, newListBtn, newListForm, newItemForm, listsContainer, 
            itemsContainer, cancelNewItemBtn, cancelNewListBtn };
})();

const app = (() => {

  const initialize = () => {
    // EVENT LISTENERS
    domSelectors.newItemBtn.addEventListener('click', displayManager.showNewItemForm);
    domSelectors.newListBtn.addEventListener('click', displayManager.showNewListForm);
    domSelectors.itemsContainer.addEventListener('click', eventHandler.itemClick);
    domSelectors.listsContainer.addEventListener('click', eventHandler.listClick);

    domSelectors.newItemForm.addEventListener('submit', itemsController.newItem);
    domSelectors.cancelNewItemBtn.addEventListener('click', displayManager.render);
    domSelectors.newListForm.addEventListener('submit', listsController.newList);
    domSelectors.cancelNewListBtn.addEventListener('click', displayManager.render);

    displayManager.render();
  };

  // UPDATE
  function update() {
    const lists = listsController.getLists(); // I HATE JAVASCRIPT!!!!!!!
    localStorage.setItem('todo-lists', JSON.stringify(lists));
    displayManager.render();
  }

  return { initialize, update };
})();

window.onload = () => {
  app.initialize();
}

export { domSelectors, app };