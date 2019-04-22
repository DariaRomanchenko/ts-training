// import * as _ from 'lodash'
import {RandomHotel} from "./RandomHotel";

const randomHotel = new RandomHotel('nl', 'production');
async function init() {
    await randomHotel.initialize();
    const sample = randomHotel.getRandomHotelName();
    console.log(sample);
}

init();
