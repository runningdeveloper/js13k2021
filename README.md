# JS 13k 2021

# Spacewalk game

Try it [https://runningdeveloper.github.io/js13k2021/](https://runningdeveloper.github.io/js13k2021/)

## Description

You an astronaut doing a spacewalk fixing something. You need to get back to the ship via the green hatch. You have limited fuel and oxygen left.

Use the arrow keys to navigate, each time you use the jet pack your fuel will go down.

To enter the hatch you need to be going slow or you will bounce off the ship or die because you going too fast.

## Comments

Not super happy with the submission, not really sure its fun or actually a challenge to play. Also really needs a background and some levels or score board.

## Start

```npm install```

```npm start```

check the package.json for more helper scripts

## Build log

- Started blank project based on last year. Wanted to use snowpack to make development easier, so setup build and etc. Hopefully settle on a game idea soon.
- Got a concept brewing - astronaut doing an EVA needs to do something on the outside of a ship, can move around using jet pack type thing puffing jets. Could have limited fuel, oxygen and etc to time limit things. Got some blocks on the screen testing movement things. 8kb seems big
- Playing with speed limits and bouncing off the ship if astronaut comes in too fast. Code a bit rough. Still 8kb
- Got busy and didn't do anything for a while. Going to see if I can try submit something this weekend.
- Got something to submit from the weekend, not brilliant but at least its something. Switching to the default snowpack esbuild optimizer gave better results than the terser plugin. 13kb total
