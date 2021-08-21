import {
    Text,
    Scene,
    Grid,
    Sprite,
    init
  } from "kontra";
  
  import { textOptions } from "./utils.js";
  let { canvas } = init();
  export let debug = Text({
    text: "",
    ...textOptions,
  });

  let score = Text({
    text: "0",
    ...textOptions,
  });


  let infoGrid = Grid({
    x: canvas.width / 2,
    y: canvas.height-debug.height,
    anchor: { x: 0.5, y: 0.5 },
    rowGap: 15,
    colGap: 15,
    flow: 'grid',
    numCols: 3,
    align: 'center',
    children: [debug],
  });

  export const changeDebug = (text) => {
    debug.text = text
      setTimeout(() => {
        debug.text = ''
      }, 1000); }

  export let  infoScene = Scene({
    id: "info",
    children: [infoGrid],
  });