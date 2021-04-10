import { useState } from 'react';
import {
  FaRegFolder,
  FaRegFolderOpen,
  FaFolderOpen,
  FaEdit,
  FaTrash,
  FaWindowClose,
} from 'react-icons/fa';

// /*
// <li class="list list-${i}">

// <input type="radio" name="list-radio" id={`list${i}`} data-list-id={i} {list.active && 'checked'} />
// <label for={`list${i}`} class="list-name" data-list-id={i}>{list.name}</label>

// <form class="list-edit-form" data-list-id={i}>
//   <input type="text" class="form-control form-control-sm list-name-edit" data-list-id={i} value={list.name} />
//   <button type="submit" class="btn btn-sm btn-primary">Save</button>
// </form>

// <i class="fas fa-trash list-controls list-delete {lists.length == 1 ? 'only-list' : ''}" data-list-id={i}></i>
// <i class="fas fa-edit list-controls list-edit" data-list-id={i}></i>

// </li>
// */

const List = ({ list: { id, name, active }, changeActive }) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (!active) {
      changeActive(id);
    }
  };

  return (
    <li className='list'>
      <div
        className='list-wrapper'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className='folder'>
          {active ? (
            <FaFolderOpen />
          ) : hover ? (
            <FaRegFolderOpen />
          ) : (
            <FaRegFolder />
          )}
        </span>
        <span className='list-name' onClick={handleClick}>
          {name}
        </span>
      </div>
      <div className='list-controls'>
        <FaEdit className='list-edit' />
        <FaTrash className='list-delete' />
      </div>
    </li>
  );
};

export default List;
