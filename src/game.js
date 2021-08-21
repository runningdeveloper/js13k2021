import {
  init,
  Sprite,
  GameLoop,
  initKeys,
  keyPressed,
  Scene,
  collides
} from "kontra";

import { menuScene } from "./menu.js";
import { infoScene, changeDebug } from "./info.js";


let { canvas } = init();

const speedToDie = 2 // speed that will kill you if hit ship
const speedToDock = 0.4 // to dock need less than this speed 


let state = 'menu'
let count = 0;
initKeys();
// await load(
// );

let ship = Sprite({
  x: (canvas.width / 3),
  y: (canvas.height / 2),
  anchor: { x: 0.5, y: 0.5 },
  color: 'red',
  width: 80,
  height: 300,
  // dx: 2
});

let astronaut = Sprite({
  x: (canvas.width / 3 * 2),
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
  color: 'blue',
  width: 20,
  height: 20,
  // dx: 2
});

const reset = () => {
  astronaut.dx = 0
  astronaut.dy = 0
  astronaut.x = (canvas.width / 3 * 2)
  astronaut.y = canvas.height / 2
}

let gameScene = Scene({
  id: "game",
  children: [ship, astronaut],
  update: () => {
    // changeDebug(``)
    if (collides(astronaut, ship)) {
      astronaut.color = astronaut.color === 'blue' ? 'white' : 'blue'
      // bounce off ship? maybe if i hit it too hard I die
      astronaut.dx = astronaut.x >= ship.x + ship.width / 2 || astronaut.x <= ship.x - ship.width / 2 ? -1 * astronaut.dx : astronaut.dx
      astronaut.dy = astronaut.y >= ship.y + ship.height / 2 || astronaut.y <= ship.y - ship.height / 2 ? -1 * astronaut.dy : astronaut.dy
      if (astronaut.velocity.length() > speedToDie) {
        changeDebug(`${'Died too fast'}`)
        state = 'menu'
        reset()
      }
      else if (astronaut.velocity.length() < speedToDock) {
        changeDebug(`${'Dock Ok'}`)
      } else {
        changeDebug(`${'Too fast'}`)
      }
    }
    if (keyPressed('left')) {
      astronaut.dx = astronaut.dx - 0.1
    }
    else if (keyPressed('right')) {
      astronaut.dx = astronaut.dx + 0.1
    }

    if (keyPressed('up')) {
      astronaut.dy = astronaut.dy - 0.1
    }
    else if (keyPressed('down')) {
      astronaut.dy = astronaut.dy + 0.1
    }
  }
});

// let start = Text({
//   text: "Count",
//   ...textOptions,
// });  



let loop = GameLoop({
  // create the main game loop
  update: function () {
    //  start.text = `Count ${count++}`

    // debug.text = `${count++}`
    if (state === 'menu') {
      if (keyPressed('space')) {
        state = 'started'
      }
      return
    }


    gameScene.update();

    // changeDebug( `${astronaut.velocity.length()}`)

  },
  render: function () {

    if (state === 'menu') {
      menuScene.render()
    } else {
      gameScene.render()
    }
    // gameScene.render()

    infoScene.render()

  },
});

loop.start(); // start the game
