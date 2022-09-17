import { callOrders } from './createOrders.js';
import { giveDish as giveSideDish } from './giveSideDish.js';
import {TRAY_COUNT} from './main.js';

const orderTrays = Array.from(document.$$('.order-tray'));

const cookEvent = new CustomEvent('cook', {
    detail: {datasetStatus: 'cooking'}
});

const cookFinished = new CustomEvent('finished', {
    detail: {busyStatus: 'finished'}
});

const despawnCustomer = (index) => {
    try {
        const customers = document.$$('.customer-column');
        const currentCustomer = customers[index].$('.customer-spawn');

        currentCustomer.classList.remove('customer-spawn');
        currentCustomer.classList.add('customer-leave');
        customers[index].dataset.status = "empty";
        setTimeout(() => currentCustomer.remove(), 500);
    } catch {
        console.log('Stop clicking like a moron!');
    }
};

const cookMenuHandler = (evt) => {
    evt.preventDefault();
    const station = document.$('#main-ui');

    if (evt.key === 'Enter') {
        station.classList.remove('show');
        document.removeEventListener('keypress', cookMenuHandler);

        document.$('#main-ui').$('.recipe').innerHTML = '';

        const activeTray = document.$('.active');
        activeTray.dispatchEvent(cookFinished);
    }
}

const cookFinishedHandler = (target) => {
    giveOrder(target);
}

const openCookMenu = (target) => {
    const station = document.$('#main-ui');
    const orders = document.$('#orders');
    const oven = document.$('#oven');

    if (!orders.$('.active')) {
        document.addEventListener('keypress', cookMenuHandler);
        const index = Array.from(orderTrays).indexOf(target);
        target.classList.add('active');
        station.classList.add('show');
        oven.style = `background-image: ${target.details.cookPic}`;
        console.log(target.details);
        document.addEventListener('keypress', prep);

        orderTrays[index].details.recipe.map((ingredient) => {
            const recipe = station.$('.recipe');
            const recipeItem = document.createElement('li');
            recipeItem.classList.add('recipe-item');
            recipeItem.textContent = ingredient;
            recipe.appendChild(recipeItem);
        })
    }
}

const giveOrder = (target) => {
    const activeTray = target.target;
    activeTray.classList.remove('active');
    activeTray.removeChild(activeTray.$('.dish'));
    activeTray.dataset.status = 'complete';
    giveSideDish();
    despawnCustomer(orderTrays.indexOf(activeTray));
    callOrders(activeTray);
    document.removeEventListener('keypress', prep);
}

document.addEventListener('keypress', (evt) => {
    if (document.$('#cook-station').dataset.status !== 'busy'
        && evt.key > 0
        && evt.key <= TRAY_COUNT) {

        const index = evt.key;
        const tray = orderTrays[index - 1];

        if (tray.dataset.status !== 'empty') {
            try {
                tray.dispatchEvent(cookEvent);
                openCookMenu(tray);
            } catch {
                console.log('!');
            }
        }
    }
})

orderTrays.forEach((tray) => {
    tray.addEventListener('finished', cookFinishedHandler);
});

const prep = (evt) => {
    evt.preventDefault();
    const activeTray = document.$('.order-tray.active');

    for (let i = 0; i < activeTray.details.ingredients.length; i++) {
        if (evt.key.toUpperCase() === activeTray.details.ingredients[i].key) {
            document.$('#oven').style =
                `background-image: ${activeTray.details.ingredients[i].cookPic}`;
        }
    }
}
