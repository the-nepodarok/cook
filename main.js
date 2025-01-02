import './createOrders.js';
import './hover.js';
import './createSideDish.js';
import './giveOrder.js';
// import './giveSideDish.js';
// import './sound.js';

const TRAY_COUNT = 6;

const F_KEYS = (() => {
    const keys = [];
    for (let i = 1; i <= TRAY_COUNT; i++) {
        keys.push('F' + i);
        if (keys.length > 11) {break}
    }
    return keys;
})();

export {TRAY_COUNT, F_KEYS};
