import { itemsController } from './items';
import { listsController } from './lists';

const eventHandler = (() => {

  // HANDLE ITEMS CLICK
  function itemClick(e) {
    if (e.target.matches('input[type="checkbox"') || (e.target.matches('i'))) {
      const id = e.target.dataset.itemId;
      if (e.target.matches('input')) {
        itemsController.toggleItem(id);
      } else {
        if (e.target.classList.contains('item-edit')) itemsController.editItem(id);
        if (e.target.classList.contains('item-delete')) itemsController.deleteItem(id);
      }
    }
  }

  // HANDLE LISTS CLICK
  function listClick(e) {
    if (e.target.matches('input[type="radio"]') || (e.target.matches('i'))) {
      const index = e.target.dataset.listId;

      if (e.target.matches('input')) {
        if (index == listsController.getCurrentList()) return;
        listsController.openList(index);
      } else {
        if (e.target.classList.contains('list-edit')) listsController.editList(index);
        if (e.target.classList.contains('list-delete')) listsController.deleteList(index);
      }
    }
  }

  //function clearEdits() {
  //  Array.from(document.getElementsByClassName('edit')).forEach(node => {
  //    node.classList.remove('edit');
  //  });
  //}

  return { itemClick, listClick };
})();

export { eventHandler };