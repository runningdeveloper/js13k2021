import{init as n,Sprite as H,GameLoop as O,initKeys as Q,keyPressed as V,Text as P,Scene as tt,collides as j,Grid as U,keyMap as z,getStoreItem as C,setStoreItem as b,randInt as S,load as v,imageAssets as m,SpriteSheet as st,audioAssets as g}from"./_snowpack/pkg/kontra.js";import{textOptions as nt}from"./utils.js";(async()=>{let{canvas:t}=n(),e=0,o=P({text:"Count",...nt}),r=U({x:t.width/2,y:t.height/2,anchor:{x:.5,y:.5},rowGap:15,justify:"center",children:[o]}),s=tt({id:"menu",onShow(){console.log("menu showed")},children:[r]});O({update:()=>{o.text="Count "+e++},render:()=>{s.render()}}).start()})();