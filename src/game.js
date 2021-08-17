import {
    init,
    Sprite,
    GameLoop,
    initKeys,
    keyPressed,
    Text,
    Scene,
    collides,
    Grid,
    keyMap,
    getStoreItem,
    setStoreItem,
    randInt,
    load,
    imageAssets,
    SpriteSheet,
    audioAssets,
  } from "kontra";
  
  import { textOptions } from "./utils.js";
  
  async function main() {
    let { canvas } = init();
    let count = 0;

    // await load(
    // );

    let start = Text({
      text: "Count",
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
  
    let menuScene = Scene({
      id: "menu",
      onShow() {
        console.log("menu showed");
      },
      children: [menu],
    });
  
    
    let loop = GameLoop({
      // create the main game loop
      update: function() {
       start.text = `Count ${count++}`
      },
      render: function() {
        menuScene.render();
      },
    });
  
    loop.start(); // start the game
  }
  
  main();