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
    initKeys();
    // await load(
    // );

    let ship = Sprite({
      x: (canvas.width / 3)-40,
      y: (canvas.height / 2) - 150,
      color: 'red',
      width: 80,
      height: 300,
      // dx: 2
    });

    let astronaut = Sprite({
      x: (canvas.width / 3 * 2)-10,
      y: canvas.height / 2,
      color: 'blue',
      width: 20,
      height: 20,
      // dx: 2
    });

    let gameScene = Scene({
      id: "game",
      children: [ship, astronaut],
    });

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
      //  start.text = `Count ${count++}`
      gameScene.update();
      if(collides(astronaut, ship)){
        astronaut.color = astronaut.color === 'blue'?'white':'blue'
      }
        if (keyPressed('left')){
          astronaut.dx=astronaut.dx-0.1
        }
        else if (keyPressed('right')) {
          astronaut.dx=astronaut.dx+0.1
        }
    
        if (keyPressed('up')) {
          astronaut.dy=astronaut.dy-0.1
        }
        else if (keyPressed('down')) {
          astronaut.dy=astronaut.dy+0.1
        }
      },
      render: function() {
        
        // console.log(astronaut)
        gameScene.render()

      },
    });
  
    loop.start(); // start the game
  }
  
  main();