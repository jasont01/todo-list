//  TODO:
//        add custom priority levels
//        add pagination
//        add custom fonts / colors
//        set initial date in datePicker popup to item.date (need to learn react)

// Bootstrap JS
import 'bootstrap';

// CSS
import '../scss/app.scss';

import { eventHandler } from './events';

window.onload = () => {
  eventHandler.initialize();
}