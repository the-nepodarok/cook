import {F_KEYS} from './main.js';

const HOTSTATIONS = document.$('#hot-stations');

const sideDishes = [
    {
        name: 'Soup',
        origin: 'Russia',
        image: 'url("resource/side-dish/soup.png")',
        quantity: 9,
    },
];

const addSideDish = (evt) => {
    if (F_KEYS.includes(evt.key)) {

        const index = F_KEYS.indexOf(evt.key);
        const targetHS = HOTSTATIONS.children[index];

        const side = document.$('#hs-template').content.cloneNode(true);
        side.$('div.hs-dish').style.backgroundImage = sideDishes[0].image;
        side.$('.hs-counter').textContent = sideDishes[0].quantity;

        if (targetHS.dataset.status === 'empty') {
            try {
                targetHS.appendChild(side);
                targetHS.dataset.status = 'occupied';
            } catch {
                console.log('All hot stations are occupied!');
            }
        }
    }
};

document.addEventListener('keydown', (evt) => {
    if (F_KEYS.includes(evt.key)) {
        evt.preventDefault();
        addSideDish(evt);
    }
})

export { HOTSTATIONS };
