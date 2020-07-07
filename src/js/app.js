//  TODO:
//        mobile version
//        custom priority levels
//        pagination
//        custom fonts / colors

// Bootstrap JS
import 'bootstrap';

// CSS
import '../scss/app.scss';

import eventHandler from './events';

window.onload = () => {
  eventHandler.initialize();
};
