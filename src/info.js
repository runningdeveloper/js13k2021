import {
    Text,
    Scene,
    init
} from "kontra";
import { state } from "./state.js";

import { textOptions } from "./utils.js";
let { canvas } = init();
export let debug = Text({
    text: "",
    ...textOptions,
});

let fuel = Text({
    text: "Fuel Left: 0",
    ...textOptions,
    x: 5,
    y: 5,
});

let distance = Text({
    text: "0m",
    ...textOptions,
    textAlign: 'right',
    anchor: { x: 1, y: 0 },
    x: canvas.width - 5,
    y: 5,
});


export let infoScene = Scene({
    id: "info",
    render: () => {
        if (state.fuel < 10 || state.oxygen < 10) {
            fuel.color = 'red'
        } else {
            fuel.color = 'white'
        }
        fuel.text = `Fuel Left: ${Math.round(state.fuel)}% Oxygen Left: ${Math.round(state.oxygen)}%`
        distance.text = `${Math.round(state.distance)}m`
    },
    children: [distance, fuel],
});