import{Text as y,Scene as O,Grid as b,Sprite as u,init as n}from"./_snowpack/pkg/kontra.js";import{textOptions as N}from"./utils.js";let{canvas:B}=n(),Q=y({text:"Start hit spacebar",...N}),R=b({x:B.width/2,y:B.height/2,anchor:{x:.5,y:.5},rowGap:15,justify:"center",children:[Q]});export let menuScene=O({id:"menu",onShow(){console.log("menu showed")},children:[R]});