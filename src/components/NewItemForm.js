const NewItemForm = () => {
  return (
    <form className='new-item-form inactive'>
      <div className='form-group'>
        <input
          className='form-control form-control-sm'
          type='text'
          id='new-item-title'
          placeholder='Item'
          required
        />
      </div>
      <div className='form-row'>
        <div className='form-group col'>
          <div id='date-picker'></div>
        </div>
        <div className='form-goup col'>
          <select className='form-control form-control-sm' id='new-item-priority'>
            <option value='priority-none' selected disabled hidden>
              --Priority--
            </option>
            <option value='priority-none'>None</option>
            <option value='priority-high'>High</option>
            <option value='priority-med'>Medium</option>
            <option value='priority-low'>Low</option>
          </select>
        </div>
      </div>
      <button
        type='submit'
        id='new-item-add'
        className='btn btn-sm btn-primary'
        aria-label='add new item'
      >
        Add
      </button>
      <button
        type='reset'
        id='new-item-cancel'
        className='btn btn-sm btn-secondary'
        aria-label='cancel new item'
      >
        cancel
      </button>
    </form>
  );
};

export default NewItemForm;
