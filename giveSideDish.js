import { HOTSTATIONS } from "./createSideDish.js";
import { randomize } from "./math.js";

const giveDish = () => {
  try {
    let availableDishes = HOTSTATIONS.$$('[data-status="occupied"]');
    let dish = availableDishes[randomize(0, availableDishes.length - 1)];
    let dishIndex = dish.$('.hs-counter');
    let portions = Number(dishIndex.textContent);

    if (portions > 1) {
      dishIndex.textContent = portions - 1;
    } else {
      dish.dataset.status = 'empty';
      dish.removeChild(dish.$('.hs-dish'));
    }
  } catch {
    console.log('No side dish available!');
  }
};

export { giveDish };
