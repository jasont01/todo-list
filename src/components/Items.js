import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { startOfDay } from 'date-fns';
import Button from 'react-bootstrap/Button';
import NewItemForm from './NewItemForm';
import Item from './Item';

const MAX_ITEMS = 10;

const Items = ({ list, list: { items }, saveList }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [categories, setCategories] = useState([
    {
      priority: 'high',
      items: [],
    },
    {
      priority: 'medium',
      items: [],
    },
    {
      priority: 'low',
      items: [],
    },
    {
      priority: 'none',
      items: [],
    },
  ]);

  useEffect(() => {
    const sorted = categories.map((category) => {
      const filtered = items.filter(
        (item) => item.priority === category.priority
      );
      return {
        ...category,
        items: filtered.sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    });
    setCategories(sorted);
  }, [items]);

  const createNewItem = (name, date, priority) => {
    const newItem = {
      id: nanoid(),
      name: name,
      date: startOfDay(date),
      priority: priority,
      isDone: false,
    };
    const updatedList = { ...list, items: [...list.items, newItem] };
    saveList(updatedList);
    setShowNewItemForm(false);
  };

  const saveItem = (updatedItem) => {
    const data = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveList({ ...list, items: data });
  };

  const deleteItem = (id) => {
    const data = items.filter((item) => item.id !== id);
    saveList({ ...list, items: data });
  };

  const showHeader = (category) => {
    if (category.items.length === 0) return false;
    return category.priority === 'none'
      ? !items.every((item) => item.priority === 'none')
      : true;
  };

  return (
    <div className='items-container'>
      {categories.map((category) => (
        <div
          key={category.priority}
          className={`priority-wrapper priority-wrapper-${category.priority}`}
        >
          {showHeader(category) && (
            <span className={`priority priority-${category.priority}`}>
              {category.priority === 'none' ? 'no' : category.priority} Priority
            </span>
          )}
          <ul className={`items items-${category.priority}`}>
            {category.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                saveItem={saveItem}
                deleteItem={deleteItem}
              />
            ))}
          </ul>
        </div>
      ))}
      <div className='controls'>
        {showNewItemForm ? (
          <NewItemForm
            createNewItem={createNewItem}
            cancelNewItem={() => setShowNewItemForm(false)}
          />
        ) : (
          <Button
            id='new-item-btn'
            disabled={items.length >= MAX_ITEMS}
            onClick={() => setShowNewItemForm(true)}
          >
            <FaPlus />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Items;
