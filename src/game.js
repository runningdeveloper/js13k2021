import {
  init,
  Sprite,
  GameLoop,
  initKeys,
  keyPressed,
  Scene,
  collides,
  Vector,
  bindKeys,
  load,
  imageAssets,
  audioAssets,
  randInt,
  SpriteSheet
} from "kontra";

import { menuScene } from "./menu.js";
import { infoScene } from "./info.js";
import { state, states, setState } from "./state.js";


let { canvas } = init();

const speedToDie = 2 // speed that will kill you if hit ship
const speedToDock = 0.4 // to dock u need less than this speed
const distanceTooFar = 700 // distance from dock where u lost to space

const fuelUse = 0.5
const oxygenUse = 0.05

const hatchSize = {
  w: 10, h: 30
}
// const shipSize = {
// w:80, h:300
// }


initKeys();
load('assets/astronaut-sprite.png', 'assets/ship.png', 'assets/crash.wav', 'assets/jump.wav', 'assets/done.wav'
).then(() => {

  let ship = Sprite({
    x: (canvas.width / 3),
    y: (canvas.height / 2),
    anchor: { x: 0.5, y: 0.5 },
    // color: 'red',
    // width: shipSize.w,
    // height: shipSize.h,
    image: imageAssets['assets/ship.png']
    // dx: 2
  });

  let hatch = Sprite({
    x: (ship.x - ship.width / 2 - hatchSize.w / 2),
    y: (canvas.height / 2),
    anchor: { x: 0, y: 0.5 },
    color: 'green',
    width: hatchSize.w,
    height: hatchSize.h,
    // dx: 2
  });

  let astronautSpriteSheet = SpriteSheet({
    image: imageAssets['assets/astronaut-sprite.png'],
    frameWidth: 15,
    frameHeight: 20,

    // this will also call createAnimations()
    animations: {
      // create 1 animation: idle
      idle: {
        // a single frame
        frames: 0
      }
    }
  });

  astronautSpriteSheet.createAnimations({
    left: {
      frames: 0
    },
    right: {
      frames: 1
    }
  });

  let astronaut = Sprite({
    x: (canvas.width / 3 * 2),
    y: canvas.height / 2,
    anchor: { x: 0.5, y: 0.5 },

    // image: imageAssets['assets/astronaut.png'], 
    animations: astronautSpriteSheet.animations
  });

  const reset = () => {
    astronaut.dx = 0
    astronaut.dy = 0
    astronaut.x = ship.x + ship.width / 2 + randInt(0, 200)
    astronaut.y = ship.y + randInt(100, 100)
    astronaut.playAnimation('idle');
  }

  let gameScene = Scene({
    id: "game",
    children: [ship, astronaut, hatch],
    update: () => {

      const distance = Vector(astronaut.x, astronaut.y).distance(Vector(hatch.x, hatch.y)) - astronaut.width / 2

      if (state.state === states.STARTED) {
        setState({ distance, oxygen: state.oxygen - oxygenUse })
      }

      // collide with ship
      if (collides(astronaut, ship)) {
        // bounce off ship? maybe if i hit it too hard I die 
        astronaut.dx = astronaut.x >= ship.x + ship.width / 2 || astronaut.x <= ship.x - ship.width / 2 ? -1 * astronaut.dx : astronaut.dx
        astronaut.dy = astronaut.y >= ship.y + ship.height / 2 || astronaut.y <= ship.y - ship.height / 2 ? -1 * astronaut.dy : astronaut.dy
        if (astronaut.velocity.length() > speedToDie) {
          // Splat, Died too fast
          audioAssets["assets/crash.wav"].play();
          setState({ state: states.TOO_FAST })
          reset()
          return
        } else if (state.state === states.STARTED) {
          audioAssets["assets/jump.wav"].play();
          return
        }

      }

      // collide with the hatch
      if (collides(astronaut, hatch)) {
        if (astronaut.velocity.length() < speedToDock) {
          // Dock Ok
          audioAssets["assets/done.wav"].play();
          setState({ state: states.DOCKED })
        } else if (astronaut.velocity.length() > speedToDie) {
          // crash
          audioAssets["assets/crash.wav"].play();
          setState({ state: states.TOO_FAST })
          reset()
        } else {
          // too fast bounce
          audioAssets["assets/jump.wav"].play();
          astronaut.dx = astronaut.x >= ship.x + ship.width / 2 || astronaut.x <= ship.x - ship.width / 2 ? -1 * astronaut.dx : astronaut.dx
          astronaut.dy = astronaut.y >= ship.y + ship.height / 2 || astronaut.y <= ship.y - ship.height / 2 ? -1 * astronaut.dy : astronaut.dy
        }
        return
      }

      if (distanceTooFar < distance) {
        setState({ state: states.TOO_FAR })
        return
      }

      // no oxygen u stuffed
      if (state.oxygen <= 0) {
        setState({ state: states.NO_OXYGEN })
        return
      }


      // no fuel u stuffed
      if (state.fuel <= 0) {
        return
      }




      if (keyPressed('left') || keyPressed('a')) {
        setState({ fuel: state.fuel - fuelUse })
        astronaut.playAnimation('left');
        astronaut.dx = astronaut.dx - 0.1
      }
      else if (keyPressed('right') || keyPressed('d')) {
        astronaut.playAnimation('right');
        setState({ fuel: state.fuel - fuelUse })
        astronaut.dx = astronaut.dx + 0.1
      }

      if (keyPressed('up') || keyPressed('w')) {
        setState({ fuel: state.fuel - fuelUse })
        astronaut.dy = astronaut.dy - 0.1
      }
      else if (keyPressed('down') || keyPressed('s')) {
        setState({ fuel: state.fuel - fuelUse })
        astronaut.dy = astronaut.dy + 0.1
      }




    }

  });



  bindKeys('space', function (e) {
    if (state.state === states.START) {
      reset()
      setState({ state: states.STARTED })
    }

    if (state.state === states.TOO_FAR || state.state === states.TOO_FAST || state.state === states.DOCKED || state.state === states.NO_OXYGEN) {
      reset()
      setState({ state: states.START })
    }
  });


  let loop = GameLoop({
    // create the main game loop
    update: function () {


      gameScene.update();

    },
    render: function () {

      if (state.state !== states.STARTED) {
        menuScene.render()
      } else {
        gameScene.lookAt(astronaut);
        gameScene.render()
      }
      // gameScene.render()

      infoScene.render()


    },
  });

  loop.start(); // start the game
})