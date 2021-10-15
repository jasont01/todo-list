import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { startOfDay } from 'date-fns';
import Item from './Item';
import CategoryHeader from './CategoryHeader';
import NewItemControl from './NewItemControl';

const categories = ['high', 'medium', 'low', 'none'];

const Items = ({ list, list: { items }, saveList }) => {
  const [sortedItems, setSortedItems] = useState(
    categories.map((category) => ({
      priority: category,
      items: [],
    }))
  );

  useEffect(() => {
    const sorted = categories.map((category) => {
      const filtered = items.filter((item) => item.priority === category);
      return {
        priority: category,
        items: filtered.sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    });
    setSortedItems(sorted);
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

  return (
    <div className='items-container'>
      {sortedItems.map((category) => (
        <div
          key={category.priority}
          className={`priority-wrapper priority-wrapper-${category.priority}`}
        >
          <CategoryHeader category={category} items={items} />
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
      <NewItemControl createNewItem={createNewItem} numItems={items.length} />
    </div>
  );
};

export default Items;
