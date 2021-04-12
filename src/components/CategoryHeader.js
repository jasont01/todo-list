import { useState, useEffect } from 'react';

const CategoryHeader = ({ category, items }) => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    setShowHeader(
      category.items.length === 0
        ? false
        : category.priority === 'none'
        ? !items.every((item) => item.priority === 'none')
        : true
    );
  }, [items, category]);

  return (
    <>
      {showHeader && (
        <span className={`priority priority-${category.priority}`}>
          {category.priority === 'none' ? 'no' : category.priority} Priority
        </span>
      )}
    </>
  );
};

export default CategoryHeader;
