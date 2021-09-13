import {
    Text,
    Scene,
    Grid,
    Sprite,
    init
} from "kontra";
import { state, states } from "./state.js";

import { textOptions } from "./utils.js";
let { canvas } = init();
let basic = Text({
    text: "Start hit spacebar",
    ...textOptions,
    textAlign: 'center'
});


let menu = Grid({
    x: canvas.width / 2,
    y: canvas.height / 2,
    anchor: { x: 0.5, y: 0.5 },
    rowGap: 15,
    justify: "center",
    children: [basic],
});

export let menuScene = Scene({
    id: "menu",
    onShow() {
        console.log("menu showed");
    },
    render: () => {
        if (state.state === states.START) {
            basic.text = 'Get back to the green hatch\n\nHit spacebar to start'
            menu.x = canvas.width / 2
            menu.y = canvas.height / 2
        }
        if (state.state === states.TOO_FAR) {
            basic.text = 'Way to far from the hatch,\nyou lost to space!!!!'
            menu.x = canvas.width / 2
            menu.y = canvas.height / 2
        }
        if (state.state === states.TOO_FAST) {
            basic.text = 'Hit the ship to fast,\nyou dead!!!!'
            menu.x = canvas.width / 2
            menu.y = canvas.height / 2
        }
        if (state.state === states.DOCKED) {
            basic.text = `Yay you docked with\n${Math.round(state.fuel)}% fuel and ${Math.round(state.oxygen)}% oxygen left!`
            menu.x = canvas.width / 2
            menu.y = canvas.height / 2
        }
        if (state.state === states.NO_OXYGEN) {
            basic.text = `No more oxygen\nyou dead!!!!`
            menu.x = canvas.width / 2
            menu.y = canvas.height / 2
        }
    },
    children: [menu],
});