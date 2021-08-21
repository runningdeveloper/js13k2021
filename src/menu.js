import {
    Text,
    Scene,
    Grid,
    Sprite,
    init
  } from "kontra";
  
  import { textOptions } from "./utils.js";
  let { canvas } = init();
  let start = Text({
    text: "Start hit spacebar",
    ...textOptions,
  });


  let menu = Grid({
    x: canvas.width / 2,
    y: canvas.height / 2,
    anchor: { x: 0.5, y: 0.5 },
    rowGap: 15,
    justify: "center",
    children: [start],
  });

  export let  menuScene = Scene({
    id: "menu",
    onShow() {
      console.log("menu showed");
    },
    children: [menu],
  });