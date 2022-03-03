import React, { useState, useEffect } from "react";
import kaboom from "kaboom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Game = () => {
  const initGame = () => {
    kaboom({
      background: [100, 135, 247],
      width: 400,
      height: 240,
      canvas: document.querySelector("#main"),
    });
    //mario sprites
    loadRoot("sprites/");
    loadAseprite("mario", "Mario.png", "Mario.json");
    loadAseprite("enemies", "enemies.png", "enemies.json");
    loadAseprite("luigi", "Luigi.png", "Luigi.json");
    loadAseprite("overWorld","OverWorld.png","OverWorld.json")
    loadSprite("ground", "ground.png");
    loadSprite("questionBox", "questionBox.png");
    loadSprite("emptyBox", "emptyBox.png");
    loadSprite("brick", "brick.png");
    loadSprite("coin", "coin.png");
    loadSprite("bigMushy", "bigMushy2.png");
    loadSprite("pipeTop", "pipeTop.png");
    loadSprite("pipeBottom", "pipeBottom.png");
    loadSprite("shrubbery", "shrubbery.png");
    loadSprite("hill", "hill.png");
    loadSprite("cloud", "cloud.png");
    loadSprite("castle", "castle.png");
    loadSprite("dBrick","DeBrick.png")
    loadSprite("background","blackBackground.webp")
    loadSprite("logo","Super_Mario_Bros._Logo.svg.png")
    loadSprite("oneUp","bigMushy.png")
    loadSprite("lava","lava4.png")
    loadSprite("lavaJump","lavaJump2.gif")

    //mario sounds
    loadSound("die","smb_mariodie.wav");
    loadSound("coin","smb_coin.wav");
    loadSound("jump","smb_jump-small.wav");
    loadSound("powerUpAppears","smb_powerup_appears.wav");
    loadSound("powerUp","smb_powerup.wav");
    loadSound("stageClear","smb_stage_clear.wav");
    loadSound("dBrick","smb_breakblock.wav")
    loadSound("main","MainThemeOverworld.mp3")
    loadSound("squash","smb_stomp.wav")
    loadSound("lostBig","smb2_shrink.wav")
    loadSound("timeWarn", "smb_warning.wav")
    loadSound("win","smb_world_clear.wav")
    loadSound("oneUp","smb_1-up.wav")
    loadSound("castle","Castle.mp3")
    loadSound("pipeWorld","Pipe_Maze.mp3")
    //main soundtrack


//LEVELS
    const LEVELS = [
      [
        "                                                                                                                                                                              ",
        "                                                                                                                                                                              ",
        "                                                                                                                                                                              ",
        "                                                                                                                                                                              ",
        "                                                  ?---?---?---?         ?b-?                                                                                                  ",
        "                                                                                                                                                                              ",
        "                                                                                                                                                                              ",
        "      -?-b-1                                                                                                                                                                  ",
        "                                                                                                                                                                              ",
        "                                                                                                                     t                                                        ",
        "                                      t                                                                         t    |                   ??b???                               ",
        "                                 t    |                                 ----    t                          t    |    |                                     B                  ",
        "                           t     |    |                t        ----            |        t          t      |    |    |                                 --------               ",
        "       E                   |     |    |   E   E    E   |    --                  |        |    E  E  |      |    |    |                                                 H      ",
        "================     ==   ===   ===  ======================                    ===      ==============     |    |    |    ====      ==============                ==========  ",
        "================     ==   ===   ===  ======================                    ===      ==============     |    |    |    ====      ==============                ==========  ",
      ],
      [
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                            ?1??                                                                ---------               B                                                   ",
        "                                                                                                                       1?b                        t t t t t t               ",
        "   b?                         B                                                                                                                   | | | | | |               ",
        "                            ----                      t                                 t                                                         | | | | | |               ",
        "                                                      |                                 |                                                         | | | | | |               ",
        "      -?-?-                                     t     |                                 |                     ----                          t     | | | | | |           H   ",
        "                                                |     |                         t       |                                                   |     | | | | | | ?       ===== ",
        "                    ------                t     |     |                         |       |                            -                t     |     | | | | | |         ===== ",
        "              t                           |     |     |                         |       |                                -            |     |     | | | | | |         ===== ",
        "            t |                           |     |     |                 t       |       |        1111                  -        t     |     |     | | | | | | t t t t ===== ",
        "          t | |                       t   |     |     |   E E  E E  E   |       |       |                                       |     |     |     | | | | | | | | | | ===== ",
        "t t t t t | | |             t   t     |   |     |     | t t t t t t t t |       |       |                                       |     |     |     | | | | | | | | | | ===== ",
        "| | | | | | | |             |   |     |   |     |     | | | | | | | | | |       |       |                                       |     |     |     | | | | | | | | | | ===== ",
        "| | | | | | | |             |   |     |   |     |     | | | | | | | | | |       |       |                                       |     |     |     | | | | | | | | | | ===== ",
      ],
      [
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "                                                                                                                                                                            ",
        "            J                                                                                                                                                               ",
        "                            H                                                                                                                                               ",
        "============                                                                             ",
        "============ L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L L============",
      ]
    ];

    //SPRITES SETUP
    const spriteMap = {
      width: 16,
      height: 16,
      pos: vec2(0, 0),
      "=": () => [sprite("ground"), area(), solid(), origin("bot"), "ground"],
      "L": () => [sprite("lava"), area(), solid(), origin("bot"), "lava"],
      "-": () => [sprite("brick"), area(), solid(), origin("bot"), "brick"],
      "H": () => [
        sprite("castle"),
        area({ width: 1, height: 240 }),
        origin("bot"),
        "castle",
      ],
      "?": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        "questionBox",
        "coinBox",
      ],
      "b": () => [
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        "questionBox",
        "mushyBox",
      ],
      "1":()=>[
        sprite("questionBox"),
        area(),
        solid(),
        origin("bot"),
        "questionBox",
        "oneUpBox"
      ],
      "!": () => [
        sprite("emptyBox"),
        area(),
        solid(),
        bump(),
        origin("bot"),
        "emptyBox",
      ],
      "c": () => [
        sprite("coin"),
        area(),
        solid(),
        bump(25,4),
        cleanup(),
        lifespan(0.4, { fade: 0.01 }),
        origin("bot"),
        "coin",
      ],
      "M": () => [
        sprite("bigMushy"),
        area(),
        solid(),
        patrol(100000),
        body(),
        cleanup(),
        origin("bot"),
        "bigMushy",
      ],
      "O": () => [
        sprite("oneUp"),
        area(),
        solid(),
        patrol(100000),
        body(),
        cleanup(),
        origin("bot"),
        "oneUp",
      ],
      "|": () => [sprite("pipeBottom"), area(), solid(), origin("bot"), "pipe"],
      "t": () => [sprite("pipeTop"), area(), solid(), origin("bot"), "pipe"],
      "E": () => [
        sprite("enemies", { anim: "Walking" }),
        area({ width: 16, height: 16 }),
        solid(),
        body(),
        patrol(200,50,-1),
        enemy(),
        origin("bot"),
        "badGuy",
      ],
      "F": () => [
        sprite("enemies", { anim: "Cloudy"}),
        area({ width: 16, height: 16 }),
        solid(),
        // body(),
        patrol(40,20,-1),
        enemy(),
        origin("bot"),
        "badGuy",
      ],
      "B": () => [
        sprite("enemies", { anim: "HammerBro"}),
        area({ width: 16, height: 16 }),
        solid(),
        body({jumpForce:220}),
        patrol(20,10,1),
        hammerBro(),
        origin("bot"),
        "badGuy",
      ],
      "p": () => [
        sprite("mario", { frame: 0 }),
        area({ width: 16, height: 16 }),
        body(),
        mario(),
        bump(40, 2, false),
        origin("bot"),
        "player1",
      ],
      "K":()=>[
        sprite("overWorld",{frame:0}),
        area(),
        solid(),
        cleanup(),
        // lifespan(0.4,{fade:0.01}),
        origin("bot"),
        "brickExplode"
      ],
      "o": () => [
        sprite("luigi", { frame: 0 }),
        area({ width: 16, height: 16 }),
        body(),
        luigi(),
        bump(25, 2, false),
        origin("bot"),
        "player2",
      ],
      ",":()=>[
        sprite("dBrick"),
        area(),
        solid(),
        bump(30,3,false),
        origin("bot"),
        "dBrick",
      ],
      "N":()=>[
        sprite("enemies", {frame:13}),
        area(),
        throwHammer(25,1.75,false),
        "hammer"
      ],
      "J":()=>[
        sprite("lavaJump"),
        area({ width: 16, height: 16 }),
        body({jumpForce:600}),
        solid(),
        bump(50,3,false),
        lavaJump(),
        "hammer"
      ]
    };

    //START SCENE
    scene("start", () => {
      add([
        text("Press enter to start", { size: 24, font:"sink" }),
        pos(vec2(200, 120)),
        origin("center"),
        color(255, 255, 255),
      ]);
      onKeyRelease("enter", () => {
        go("game");
      });
    });
    // go("start");
    // scene("gameOver", ()=>{
    //   add()
    // })

 //LEVEL TRANSITION SCENE
    scene("nextLevel", ({levelId, coins,score,lives})=>{
      layers([
        "background",
        "nextLevel"
      ],"nextLevel");
      add([
        sprite("background"),
        layer("background")
      ])
      add([
        text(`You passed level ${levelId}!`,{size: 16, font:"sink"}),
        pos(vec2(200,60)),
        origin("center"),
        color(255,255,255),
      ])
      add([
        text(`Your score was: ${score}`,{size: 16, font:"sink"}),
        pos(vec2(200,120)),
        origin("center"),
        color(255,255,255),
      ])
      add([
        text(`Press ENTER to proceed to the next level`,{size: 12, font:"sink"}),
        pos(vec2(200,190)),
        origin("center"),
        color(255,255,255),
      ])
      onKeyRelease("enter",()=>{
        go("game",{levelId: levelId, coins: coins, score: score, lives: lives})
      })
    })
    // go("nextLevel",{levelId: 0, coins: 0, score: 0})


    //GAME OVER SCREEN
    scene("gameOver", ({levelId, coins, score})=>{
      layers([
        "background",
        "gameOver"
      ],"gameOver");
      add([
        sprite("background"),
        layer("background")
      ])
      add([
        text("GAME OVER", {size: 24, font: "sinko"}),
        pos(vec2(200,120)),
        origin("center"),
        color(255,255,255),
      ])
      add([
        text(`Press ENTER to retry`,{size: 12, font:"sink"}),
        pos(vec2(200,190)),
        origin("center"),
        color(255,255,255),
      ])
      onKeyRelease("enter",()=>{
        go("game")
      })
    })
      // go("gameOver",{levelId: 0, coins: 0, score: 0})
//WIN SCREEN
    scene("win",({levelId, coins, score})=>{
      layers([
        "background",
        "win"
      ],"win");
      add([
        sprite("background"),
        layer("background")
      ])
    })
  

    //GAME SCENE
    scene("game", ({ levelId, coins,score,lives } = { levelId: 0, coins: 0, score:0,lives:3 }) => {
      layers(["bg", "game", "ui"], "game");

      let time = 400;

      const scoreUi = add([
        text(
          `SCORE: ${score}`,{
          size:10,
          font:"sinko"
        }),
        pos(12,12),
        fixed(),
        layer("ui")
      ])

      const coinUi = add([
        text(`COINS: ${coins}`,{
          size:10,
          font:"sinko"
        }),
        pos(125,12),
        fixed(),
        layer("ui")

      ])

      const timeUI = add([
        text(`TIME: ${time}`,{
          size:10,
          font:"sinko"
        }),
        pos(320,12),
        fixed(),
        layer("ui")
      ])

      const livesUi = add([
        text(`LIVES: ${lives}`,{
          size:10,
          font:"sinko"
        }),
        pos(220,12),
        fixed(),
        layer("ui")
      ])

      const level = addLevel(LEVELS[levelId], spriteMap);

      layers([
        "background",
        "game"
      ],"game");
      if(levelId === 2){
        add([
          sprite("background"),
          layer("background")
        ])
      }
      
      
      add([sprite("cloud"), pos(20, 50), layer("bg")]);
      add([sprite("cloud"), pos(290, 50), layer("bg")]);
      add([sprite("cloud"), pos(600, 50), layer("bg")]);
      add([sprite("cloud"), pos(775, 80), layer("bg")]);
      add([sprite("cloud"), pos(1000, 20), layer("bg")]);
      add([sprite("cloud"), pos(1200, 50), layer("bg")]);

      
      add([
        text(`Level ${levelId + 1}`, { size: 24, font: "sink" }),
        pos(vec2(200, 120)),
        color(255, 255, 255),
        origin("center"),
        layer("ui"),
        lifespan(1, { fade: 0.5 }),
      ]);

      const player = level.spawn("p", 1, 10);

      

      //MUSIC CHOICES
      let music;
      const volume = 0.1
      if(levelId === 0){
        music = play("main",{
          volume:volume,
          loop:true
        })
      } else if(levelId === 1){
        music =
        play("pipeWorld",{
          volume:volume,
          loop:true
      })} else if(levelId ===2){
        music =
        play("castle",{
          volume:volume,
          loop:true
        })
      }
      

      
  //MARIO/LUIGI MOVEMENTS
      let SPEED = 120;
      onKeyDown("d", () => {
        if(player.isFrozen)return;
        player.flipX(false);
        player.move(SPEED, 0);
      });
      onKeyDown("a",()=>{
        if(player.isFrozen)return;
        player.flipX(true);
        if(toScreen(player.pos).x>20){
          player.move(-SPEED,0)
        }
      });
      onKeyDown("shift",()=>{
        if(SPEED<210){
          SPEED+=0.4
        }
      })
      onKeyRelease("shift",()=>{
        SPEED = 120
      })
      onKeyRelease("a",()=>{
        SPEED = 120
      })
      onKeyPress("space",()=>{
        if(player.isFrozen)return;
        if(player.isGrounded() && player.isAlive){
          player.jump();
          play("jump")
          canSquash = true;
        } 
      })
      onKeyPress("w",()=>{
        if(player.isFrozen)return;
        if(player.isGrounded() && player.isAlive){
          player.jump();
          play("jump")
          canSquash = true;
        }
      })
      onKeyDown("s",()=>{
        if(player.isFrozen)return;
        if(player.isBig){
          player.frame = 14
        }
      })
  //ONUPDATE
      player.onUpdate(()=>{
        let currCam = camPos();
        if(currCam.x < player.pos.x){
          camPos(player.pos.x, currCam.y)
        }
        if(player.isAlive && player.isGrounded()){
          canSquash = false;
        }
        if(player.pos.y > height()-2){
          if(lives>1){
            livesUi.text=`LIVES: ${lives-1}`
          player.die();
          wait(2,()=>go("game",{levelId:levelId,score:score,coins:coins,lives:lives-1}))
          } else {
            livesUi.text = "LIVES: 0"
            killed();
          }
        }
        if(!player.isAlive){
          player.frame = 6
        }
      })
    let canSquash = false;

//HEADBUTT
    player.on("headbutt", (obj)=>{
      if(obj.is("questionBox")){
        if(obj.is("coinBox")){
          let coin = level.spawn("c",obj.gridPos.sub(0,1));
          coin.bump();
          play("coin")
          coins+=1
          score+=200
          scoreUi.text = `SCORE: ${score}`
          coinUi.text = `COINS: ${coins}`
        } else if(obj.is("mushyBox")){
          level.spawn("M", obj.gridPos.sub(0,1));
          play("powerUpAppears")
        } else if(obj.is("oneUpBox")){
          level.spawn("O", obj.gridPos.sub(0,1));
          play("powerUpAppears")
        }
        let pos = obj.gridPos;
        destroy(obj);
        let box = level.spawn("!",pos);
        box.bump();
      } else if(obj.is("brick")){
        if(player.isBig){
          let pos = obj.gridPos
          destroy(obj);
          let destroyedBrick = level.spawn(",",pos);
          destroyedBrick.bump()
          play("dBrick")
          destroyedBrick.use(lifespan(0.5, { fade: 1 }));
          score+=50
          scoreUi.text = `SCORE: ${score}`
        }
      }
    })
//POWERUP
    player.onCollide("bigMushy", (mushy) => {
      destroy(mushy);
      play("powerUp")
      player.bigger();
      score+=1000
      scoreUi.text = `SCORE: ${score}`
    });

    player.onCollide("oneUp",(oneUp)=>{
      destroy(oneUp);
      play("oneUp")
      lives+=1;
      livesUi.text = `LIVES: ${lives}`
      score+=1000;
      scoreUi.text = `SCORE: ${score}`
    })

//BADGUY COLLIDE
    player.onCollide("badGuy", (baddy) => {
      if (baddy.isAlive == false) return;
      if (player.isAlive == false) return;
      if (canSquash) {
        // Mario has jumped on the bad guy:
        baddy.squash();
        score+=100
      scoreUi.text = `SCORE: ${score}`
      } else {
        // Mario has been hurt
        if (player.isBig) {
          player.smaller();
          player.invincible();
          play("lostBig")
        } else {
          // Mario is dead :(
            if(!player.isInvulnerable && lives>1){
              lives-=1;
              play("die")
              player.die();
              music.pause();
              wait(4,()=>go("game",{levelId:levelId,score:score,coins:coins,lives:lives}))
            } else if (!player.isInvulnerable){
              livesUi.text = "LIVES: 0"
              killed();
            }
        }
      }
    });

    player.onCollide("hammer",(hammer)=>{
      if(player.isAlive==false)return;
      if(player.isBig){
        player.smaller();
        player.invincible();
        play("lostBig")
      } else{
        if(!player.isInvulnerable && lives>1){
          lives-=1;
          play("die")
          player.die();
          music.pause();
          wait(4,()=>go("game",{levelId:levelId,score:score,coins:coins,lives:lives}))
        } else if (!player.isInvulnerable){
          livesUi.text = "LIVES: 0"
          killed();
        }
      }
    })
    player.onCollide("lava",(lava)=>{
      if(player.isAlive==false)return;
      if(lives>1){
        lives-=1;
        play("die")
        player.die();
        music.pause();
        wait(4,()=>go("game",{levelId:levelId,score:score,coins:coins,lives:lives}))
      } else{
        livesUi.text = "LIVES: 0"
        killed();
      }
    })

    //HAMMERBRO UPDATE
    onUpdate("hammerBro",(hammerBro)=>{
      
        if(!hammerBro.isGrounded() && hammerBro.throwHammer && hammerBro.hammerCount<1){
          hammerBro.hammerCount +=1
          let hammer = level.spawn("N",hammerBro.gridPos.sub(0,3))
          hammer.throwHammer()
          hammer.use(lifespan(4,{fade:0.1}))
          hammerBro.throwHammer=false;
        }
      
    })
    
    // loop(3, ()=>{

    // })
//CASTLE COLLIDE
    player.onCollide("castle", (castle,side)=>{
      player.freeze();
      music.pause();
      play("stageClear")
      if(time>=1){
        loop(.05,()=>{
          if(time>0){
            time -=5;
          timeUI.text = `TIME: ${time}`
          score += 125
          scoreUi.text = `SCORE:${score}`
          }
          if(time<0){
            timeUI.text = `TIME: 0`
          }    
        })
      }
      add([
        text(`LEVEL ${levelId+1} CLEARED!`,{size:24}),
        pos(toWorld(vec2(210,120))),
        color(255,255,255),
        origin("center"),
        layer("ui")
      ]);
      wait(7,()=>{
        let nextLevel = levelId +1;
        if(nextLevel >= LEVELS.length){
          go("start");
        } else{
          go("nextLevel",{levelId: levelId +1, coins: coins, score: score, lives:lives})
        }
      })
    })
    // function throwHammer(){
    //   if()
    //   //if hammer bro is jumping, spawn a hammer and bump it with a speed and direction, but it also falls off the screen
    // }

    function killed() {
      // Mario is dead :(
      if (player.isAlive == false) return;
       // Don't run it if mario is already dead
      play("die")
      player.die();
      music.pause();
      add([
        text("GAME OVER", { size: 20, font: "sinko" }),
        pos(toWorld(vec2(200, 120))),
        color(255, 255, 255),
        origin("center"),
        layer('ui'),
      ]);
      wait(4, () => {
        go("gameOver",{levelId: levelId+1,coins:coins,score:score});
      })
    }
    function timer(){
      if(player.isAlive == false || player.isFrozen == true) return;
        wait(1,()=>{
          time-=1;
          timeUI.text = `TIME: ${time}`
        })
        if(time === 50){
          music.pause()
          play("timeWarn")
          wait(3, ()=>{
            music.play()
          })
        }
        if(time === 1){
          killed()
        }
    }
    loop(1,()=>{
      timer()
    })
    music.play()
    });
//END OF GAME SCENE

go("game",{lives:3,levelId:2,coins:0,score:0})

//ENEMY MOVEMENT
    const patrol =(distance = 100,speed=50,dir=1)=>{
      return{
        id:"patrol",
        require:["pos","area",],
        startingPos: vec2(0,0),
        add() {
          this.startingPos = this.pos
          this.flipX(false)
          this.on("collide", (obj, col) => {
            if (col.isLeft() || col.isRight()) {
              dir = -dir;
              this.flipX(this.flip)
              this.flip = !this.flip
            }
          });
        },
        update() {
          if((Math.abs(this.pos.x - this.startingPos.x))>=distance){
            dir=-dir
          }
          this.move(speed * dir, 0);
        },
      }
    }

    const lavaJump = ()=>{
      return{
        id:"lavaJump",
      require:["pos","area","sprite"],
      startingPos: vec2(0,0),
      add(){
        this.startingPos = this.pos
        console.log(this.startingPos)
      },
      update(){
        this.isGrounded() ? this.jump() : null
      }
    }
    }

    const hammerBro=()=>{
      return{
        id:"hammerBro",
        require:["pos","area","sprite","patrol"],
        isAlive:true,
        throwHammer:false,
        hammerCount:0,
        squash(){
          this.isAlive = false;
          this.unuse("patrol");
          play("squash");
          this.stop();
          bump(50);
          this.use(lifespan(0.5,{fade:0.1}))
        },
        update(){
          this.isGrounded() ? wait(.6,()=>this.jump(), this.hammerCount =0) : null;
          wait(2, ()=>this.throwHammer=true)
        }
      }
    }

    
//SQUASHING ENEMY AND REMOVING IT FROM SCENE
    const enemy=()=>{
      return{
        id:"enemy",
        require:["pos","area","sprite","patrol"],
        isAlive:true,
        update(){
          
        },
        squash(){
          this.isAlive = false;
          this.unuse("patrol");
          play("squash")
          this.stop();
          this.frame=2;
          this.area.width=16;
          this.area.height=8;
          this.use(lifespan(0.5, {fade:0.1}))
        }
      }
    }
//COMPONENT FOR OPENING BOXES
    const bump=(offset = 8, speed = 2, stopAtOrigin=true)=>{
      return{
        id:"bump",
        require:["pos"],
        bumpOffset:offset,
        speed:speed,
        bumped:false,
        origPos:0,
        direction:-1,
        update(){
          if(this.bumped){
            this.pos.y = this.pos.y + this.direction * this.speed;
            if(this.pos.y <this.origPos - this.bumpOffset){
              this.direction = 1;
            }
            if(stopAtOrigin && this.pos.y >= this.origPos){
              this.bumped = false;
              this.pos.y = this.origPos;
              this.direction = -1;
            }
          }
        },
        bump(){
          this.bumped = true;
          this.origPos = this.pos.y
        }
      }
    }

    const throwHammer =(offset=8,speed=2,stopAtOrigin=true)=>{
      return{
        id:"throwHammer",
        require:["pos"],
        bumpOffset:offset,
        speed:speed,
        bumped:false,
        origPos:0,
        origPosX:0,
        directionY:-1,
        directionX:-1,
        update(){
          if(this.bumped){
            this.pos.y = this.pos.y + this.directionY * this.speed;
            if(this.pos.y <this.origPos - this.bumpOffset){
              this.directionY = 2;
            }
            this.pos.x = this.pos.x + this.directionX*this.speed-1
            if(this.pos.x <this.origPosX - this.bumpOffset){
              this.directionX = 0;
            }
          }
        },
        throwHammer(){
          this.bumped = true;
          this.origPos = this.pos.y-10
          this.origPosX = this.pos.x-20
        }
      }
    }
//Special Mario Attributes
    const mario = ()=>{
      return {
        id: "mario",
        require: ["body", "area", "sprite", "bump"],
        smallAnimation: "Running",
        bigAnimation: "RunningBig",
        smallStopFrame: 0,
        bigStopFrame: 8,
        smallJumpFrame: 5,
        bigJumpFrame: 13,
        isBig: false,
        isFrozen: false,
        isAlive: true,    
        isInvulnerable:false,
        invulnerability_time:1,
        update() {
          if (this.isFrozen) {
            this.standing();
            return;
          }
  
          if (!this.isGrounded()) {
            this.jumping();
          }
          else {
            if (isKeyDown("a") || isKeyDown("d")) {
              this.running();
            } else {
              this.standing();
            }
          }
        },
        bigger() {
          this.isBig = true;
          this.area.width = 24;
          this.area.height = 32;
        },
        smaller() {
          this.isBig = false;
          this.area.width = 16;
          this.area.height = 16;
        },
        standing() {
          this.stop();
          this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
        },
        jumping() {
          this.stop();
          this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
        },
        running() {
          const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
          if (this.curAnim() !== animation) {
            this.play(animation);
          }
        },
        freeze() {
          this.isFrozen = true;
        },
        invincible(){
          this.isInvulnerable = true;
          wait(this.invulnerability_time, ()=>{
            this.isInvulnerable = false;
          })
        },
        die() {
          this.unuse("body");
          this.bump();
          this.isAlive = false;
          this.freeze();
          this.use(lifespan(1, { fade: 1 }));
        }
      }
    }
//Special Luigi Attributes
const luigi = ()=>{
  return {
    id: "luigi",
    require: ["body", "area", "sprite", "bump"],
    smallAnimation: "Running",
    bigAnimation: "RunningBig",
    smallStopFrame: 0,
    bigStopFrame: 8,
    smallJumpFrame: 5,
    bigJumpFrame: 13,
    isBig: false,
    isFrozen: false,
    isAlive: true,
    isInvulnerable:false,
    invulnerability_time:1,
    update() {
      if (this.isFrozen) {
        this.standing();
        return;
      }

      if (!this.isGrounded()) {
        this.jumping();
      }
      else {
        if (isKeyDown("left") || isKeyDown("right")) {
          this.running();
        } else {
          this.standing();
        }
      }
    },
    bigger() {
      this.isBig = true;
      this.area.width = 24;
      this.area.height = 32;
    },
    smaller() {
      this.isBig = false;
      this.area.width = 16;
      this.area.height = 16;
    },
    standing() {
      this.stop();
      this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
    },
    jumping() {
      this.stop();
      this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
    },
    running() {
      const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
      if (this.curAnim() !== animation) {
        this.play(animation);
      }
    },
    freeze() {
      this.isFrozen = true;
    },
    die() {
      this.unuse("body");
      this.bump();
      this.isAlive = false;
      this.freeze();
      this.use(lifespan(1, { fade: 1 }));
    }
  }
}


  };

  useEffect(() => {
    initGame();
  }, []);
  return (
    <div>
      <h1>HELLO WORLD!</h1>
      <h1>PLEASE RENDER SOMETHING</h1>
      <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="canvas"
          id="main"
          sx={{
            width: "610px",
            height: "350px",
            border:"solid black 1px"
          }}
        />
      </Box>
    </div>
  );
};
