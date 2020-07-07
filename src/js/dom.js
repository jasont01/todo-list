// SELECTORS
const domSelectors = (() => {
  const notebook = document.querySelector('.notebook');
  const newItemBtn = document.getElementById('new-item-btn');
  const newListBtn = document.getElementById('new-list-btn');
  const newListForm = document.querySelector('.new-list-form');
  const newItemForm = document.querySelector('.new-item-form');
  const listsContainer = document.querySelector('.lists');
  const itemsContainer = document.querySelector('.todo-container');
  const cancelNewItemBtn = document.getElementById('new-item-cancel');
  const cancelNewListBtn = document.getElementById('new-list-cancel');

  return { notebook, newItemBtn, newListBtn, newListForm, newItemForm, listsContainer, 
          itemsContainer, cancelNewItemBtn, cancelNewListBtn };
})();

export { domSelectors };