import { useState } from 'react';
import {
  FaRegFolder,
  FaRegFolderOpen,
  FaFolderOpen,
  FaEdit,
  FaTrash,
  FaWindowClose,
} from 'react-icons/fa';
import EditListForm from '../forms/EditListForm';

const List = ({
  list,
  list: { id, name, active },
  changeActive,
  onlyList,
  saveList,
  deleteList,
}) => {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const updateList = (name) => {
    saveList({ ...list, name: name });
    setEditMode(false);
  };

  return (
    <li className='list'>
      {editMode ? (
        <EditListForm id={id} name={name} updateList={updateList} />
      ) : (
        <div
          className='list-wrapper'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => !active && changeActive(id)}
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
          <span className='list-name'>{name}</span>
        </div>
      )}
      <div className='list-controls'>
        {editMode ? (
          <FaWindowClose
            className='list-edit'
            onClick={() => setEditMode(false)}
          />
        ) : (
          <FaEdit className='list-edit' onClick={() => setEditMode(true)} />
        )}
        {!onlyList && (
          <FaTrash
            className='list-delete'
            onClick={() => deleteList(id, name)}
          />
        )}
      </div>
    </li>
  );
};

export default List;
