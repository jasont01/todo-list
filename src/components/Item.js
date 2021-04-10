//  <li>
//    <div class="squaredThree">
//      <input type="checkbox" id="item-check${id}" data-item-id="${id}" ${item.done ? 'checked' : ''} />
//      <label for="item-check${id}" class="item-title ${item.done ? 'done' : ''}" data-item-id="${id}">${item.title}</label>
//    </div>
//    <form class="item-edit-form" data-item-id="${id}">
//      <input type="text" class="form-control form-control-sm item-name-edit" data-item-id="${id}" value="${item.title}" />
//      <select class="form-control form-control-sm item-priority-edit" data-item-id="${id}">
//        <option value="priority-none" ${item.priority == 'priority-none' ? 'selected' : ''}>None</option>
//        <option value="priority-high" ${item.priority == 'priority-high' ? 'selected' : ''}>High</option>
//        <option value="priority-med" ${item.priority == 'priority-med' ? 'selected' : ''}>Medium</option>
//        <option value="priority-low" ${item.priority == 'priority-low' ? 'selected' : ''}>Low</option>
//      </select>
//      <div class="item-date-edit" data-item-id="${id}" data-item-date="${format(new Date(item.date), 'yyyy-MM-dd')}"></div>
//      <button type="submit" class="btn btn-sm btn-primary">Save</button>
//    </form>
//    <i class="fas fa-trash item-delete" data-item-id="${id}"></i>
//    <i class="fas fa-edit item-edit" data-item-id="${id}"></i>
//    <span class="due-date" data-item-id="${id}">${date}</span>
//  </li>

// function Checkbox() {
//   const [checked, setChecked] = React.useState(true);

//   return (
//     <label>
//       <input type="checkbox"
//         defaultChecked={checked}
//         onChange={() => setChecked(!checked)}
//       />
//       Check Me!
//     </label>
//   );
// }

const Item = ({ item: { id, title, date, priority, isDone } }) => {
  return (
    <li>
      <div className='squaredThree'>
        <input type='checkbox' id={id} checked={isDone} />
        <label htmlFor={id} className={`item-title ${isDone && 'done'}`}>
          {title}
        </label>
      </div>
    </li>
  );
};

export default Item;
