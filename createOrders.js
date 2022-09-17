import {randomize} from './math.js';
import {spawnCustomer} from './customers.js';

const Dishes = [
    {
        name: 'Okra',
        origin: 'Japan',
        image: 'url("resource/main-dish/okra.png")',
        recipe: ['Okra', 'Two Okras'],
    },
    {
        name: 'Agedashi',
        origin: 'Japan',
        image: `url('resource/main-dish/okra.png')`,
        recipe: ['Oil', 'Tofu'],
        cookPic: `url('resource/cook/fry-pan.png')`,
        ingredients: [
            {
                name: 'Oil',
                icon: `url('resource/ui/ingredients/${name}.png')`,
                key: 'O',
                cookPic: `url('resource/cook/fry-pan.png')`
            }, {
                name: 'Tofu',
                icon: `url('resource/ui/ingredients/${name}.png')`,
                key: 'T',
                cookPic: `url('resource/cook/agedashi/tofu.png')`
            }
        ]
    },
    {
        name: 'Okra',
        origin: 'Japan',
        image: 'url("resource/main-dish/okra.png")',
        recipe: ['No Okra'],
    },
];

const TRAYS = Array.from(document.getElementsByClassName('order-tray'));

/* Setting all trays available for orders to appear */

const emptyTrays = (trays) => {
    for (let tray of trays) {
        tray.dataset.status = 'empty';
    }
};

document.onload = () => {emptyTrays(TRAYS)};

/* Calling orders when trays are empty & disabling them for acquiring more than 1 order at a time */

let busyStatus = 'free';

const createOrder = (TRAYS, dish) => {
    const ORDER = document.$('#order-template').content.cloneNode(true);
    ORDER.$('div.dish').style.backgroundImage = dish.image;

    const emptyTrays = [];
    TRAYS.forEach((tray) => {
        if (tray.dataset.status === 'empty') {
            emptyTrays.push(tray);
            tray.details = dish;
        }
    });

    try {
        emptyTrays[0].dataset.status = 'occupied';
        setTimeout(() => emptyTrays[0].appendChild(ORDER), 800);
        spawnCustomer();
    } catch(err) {
        // console.log('All trays are occupied!');
        return busyStatus = 'busy';
    }
};

const callOrders = (tray) => {

    if (tray) {
        if (tray.dataset.status === 'complete') {
            tray.dataset.status = 'empty';
            busyStatus = 'free';
        }
    } // GP-Variant; requires an argument & a parameter "tray" fed
                     // to the fn at giveOrder.js

    // if (TRAYS.some((element) => element.dataset.status === 'complete')) {
    //     busyStatus = 'free';
    // } // KR-Variant

    if (busyStatus === 'free') {
        setTimeout(() => {
                createOrder(TRAYS, Dishes[1]/*Dishes[randomize(0, Dishes.length - 1)]*/);
            },
            randomize(100, 200));
    }
}

setInterval(callOrders, randomize(200, 500));

// console.log(busyStatus);

export {TRAYS, Dishes, callOrders};
