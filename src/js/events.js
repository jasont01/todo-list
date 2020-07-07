import { domSelectors } from './dom';
import { itemsController } from './items';
import { listsController } from './lists';
import { displayController } from './display';
import { responsive } from './responsive';

const eventHandler = (() => {

  const initialize = () => {
    // EVENT LISTENERS
    domSelectors.itemsContainer.addEventListener('click', itemClick);
    domSelectors.listsContainer.addEventListener('click', listClick);

    domSelectors.newItemBtn.addEventListener('click', displayController.showNewItemForm);
    domSelectors.newListBtn.addEventListener('click', displayController.showNewListForm);

    domSelectors.newItemForm.addEventListener('submit', itemsController.newItem);
    domSelectors.newListForm.addEventListener('submit', listsController.newList);
    domSelectors.cancelNewItemBtn.addEventListener('click', displayController.render);
    domSelectors.cancelNewListBtn.addEventListener('click', displayController.render);

    window.addEventListener('resize', responsive.doResize);

    displayController.render();
  };

  // HANDLE ITEMS CLICK
  function itemClick(e) {
    if (e.target.matches('input[type="checkbox"') || (e.target.matches('i'))) {
      const id = e.target.dataset.itemId;
      if (e.target.matches('input')) {
        itemsController.toggleItem(id);
      } else {
        if (e.target.classList.contains('item-edit')) displayController.showEditItem(id);
        if (e.target.classList.contains('item-delete')) itemsController.deleteItem(id);
      }
    }
  }

  // HANDLE LISTS CLICK
  function listClick(e) {
    if (e.target.matches('input[type="radio"]') || (e.target.matches('i'))) {
      const index = e.target.dataset.listId;

      if (e.target.matches('input')) {
        if (index == listsController.getCurrentListIndex()) return;
        listsController.openList(index);
      } else {
        if (e.target.classList.contains('list-edit')) displayController.showEditList(index);
        if (e.target.classList.contains('list-delete')) listsController.deleteList(index);
      }
    }
  }

  //function clearEdits() {
  //  Array.from(document.getElementsByClassName('edit')).forEach(node => {
  //    node.classList.remove('edit');
  //  });
  //}

  return { initialize };
})();

export { eventHandler };