import { useState, useEffect } from 'react';

import Item from './Item';

const Items = ({ items }) => {
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
    const sorted = categories.map((category) => ({
      ...category,
      items: items.filter((item) => item.priority === category.priority),
    }));
    setCategories(sorted);
  }, [items]);

  return (
    <div className='todo-container'>
      {/* <span className='priority priority-high'>High Priority</span>
      <ul className='items-high'>
        {items_high.map((item) => (
          <Item item={item} />
        ))}
      </ul>
      <span className='priority priority-med'>Medium Priority</span>
      <ul className='items-med'></ul>
      <span className='priority priority-low'>Low Priority</span>
      <ul className='items-low'></ul>
      <span className='priority priority-none'>No Priority</span>
      <ul className='items-none'></ul> */}
      {categories.map((category) => (
        <div key={category.priority}>
          <span className={`priority priority-${category.priority}`}>
            {category.priority} Priority
          </span>
          <ul className={`items-${category.priority}`}>
            {category.items.map((item) => {
              return <Item key={item.id} item={item} />;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Items;
