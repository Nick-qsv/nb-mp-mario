import React, { useState, useEffect } from "react";
import kaboom from "kaboom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Leevels from "./Components/Levels";

export const Game = () => {
  const initGame = () => {
    kaboom({
      background: [134, 135, 247],
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
    loadSprite("bigMushy", "bigMushy.png");
    loadSprite("pipeTop", "pipeTop.png");
    loadSprite("pipeBottom", "pipeBottom.png");
    loadSprite("shrubbery", "shrubbery.png");
    loadSprite("hill", "hill.png");
    loadSprite("cloud", "cloud.png");
    loadSprite("castle", "castle.png");


    //mario sounds
    loadSound("die","smb_mariodie.wav");
    loadSound("coin","smb_coin.wav");
    loadSound("jump","smb_jump-small.wav");
    loadSound("powerUpAppears","smb_powerup_appears.wav");
    loadSound("powerUp","smb_powerup.wav");
    loadSound("stageClear","smb_stage_clear.wav");
    const LEVELS = [
      [
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "                                                                                                ",
        "      -?-b-                                                                                     ",
        "                                                    ?        ?                                  ",
        "                                                                                                ",
        "                                      t                 ?                                       ",
        "                                 t    |                                                         ",
        "                           t     |    |                t                                        ",
        "       E     K             |     |    |   E   E        |                            H           ",
        "================     ===========================================================================",
        "================     ===========================================================================",
      ],
      [
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                       ?                                                     ",
        "                                                                                             ",
        "                                   -?-                                                       ",
        "                                                                                             ",
        "      -?-b-                  -?-                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "                                                                                             ",
        "       _                                            _                                        ",
        "       |                                            |          E    E            H           ",
        "================     ========================================================================",
        "================     ========================================================================",
      ],
    ];
    const spriteMap = {
      width: 16,
      height: 16,
      pos: vec2(0, 0),
      "=": () => [sprite("ground"), area(), solid(), origin("bot"), "ground"],
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
      "|": () => [sprite("pipeBottom"), area(), solid(), origin("bot"), "pipe"],
      "t": () => [sprite("pipeTop"), area(), solid(), origin("bot"), "pipe"],
      "E": () => [
        sprite("enemies", { anim: "Walking" }),
        area({ width: 16, height: 16 }),
        solid(),
        body(),
        patrol(10000,50,-1),
        enemy(),
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
    };
    scene("start", () => {
      add([
        text("Press enter to start", { size: 24 }),
        pos(vec2(200, 120)),
        origin("center"),
        color(255, 255, 255),
      ]);
      onKeyRelease("enter", () => {
        go("game");
      });
    });
    go("start");
    scene("game", (levelNumber = 0) => {
      layers(["bg", "game", "ui"], "game");

      const level = addLevel(LEVELS[levelNumber], spriteMap);

      add([sprite("cloud"), pos(20, 50), layer("bg")]);
      add([sprite("hill"), pos(32, 208), layer("bg"), origin("bot")]);
      add([sprite("shrubbery"), pos(200, 208), layer("bg"), origin("bot")]);
      add([
        text(`Level ${levelNumber + 1}`, { size: 24 }),
        pos(vec2(200, 120)),
        color(255, 255, 255),
        origin("center"),
        layer("ui"),
        lifespan(1, { fade: 0.5 }),
      ]);

      const player = level.spawn("p", 1, 10);

  //MARIO/LUIGI MOVEMENTS
      const SPEED = 120;
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
          killed();
        }
        if(!player.isAlive){
          player.frame = 6
        }

      })
    let canSquash = false;

    player.on("headbutt", (obj)=>{
      if(obj.is("questionBox")){
        if(obj.is("coinBox")){
          let coin = level.spawn("c",obj.gridPos.sub(0,1));
          coin.bump();
          play("coin")
        } else if(obj.is("mushyBox")){
          level.spawn("M", obj.gridPos.sub(0,1));
          play("powerUpAppears")
        }
        let pos = obj.gridPos;
        destroy(obj);
        let box = level.spawn("!",pos);
        box.bump();
      }
    })

    player.onCollide("bigMushy", (mushy) => {
      destroy(mushy);
      play("powerUp")
      player.bigger();
    });

    player.onCollide("badGuy", (baddy) => {
      if (baddy.isAlive == false) return;
      if (player.isAlive == false) return;
      if (canSquash) {
        // Mario has jumped on the bad guy:
        baddy.squash();
      } else {
        // Mario has been hurt
        if (player.isBig) {
          player.smaller();
          player.invincible();
        } else {
          // Mario is dead :(
          killed();
        }
      }
    });
    

    player.onCollide("castle", (castle,side)=>{
      player.freeze();
      play("stageClear")
      add([
        text("Well Done!",{size:24}),
        pos(toWorld(vec2(160,120))),
        color(255,255,255),
        origin("center"),
        layer("ui")
      ]);
      wait(1,()=>{
        let nextLevel = levelNumber +1;
        if(nextLevel >= LEVELS.length){
          go("start");
        } else{
          go("game",nextLevel)
        }
      })
    })

    function killed() {
      // Mario is dead :(
      if (player.isAlive == false) return;
       // Don't run it if mario is already dead
      play("die")
      player.die();
      add([
        text("Game Over :(", { size: 24 }),
        pos(toWorld(vec2(160, 120))),
        color(255, 255, 255),
        origin("center"),
        layer('ui'),
      ]);
      wait(2, () => {
        go("start");
      })
    }
    });
  //ENEMY MOVEMENT
    const patrol =(distance = 100,speed=50,dir=1)=>{
      return{
        id:"patrol",
        require:["pos","area",],
        startingPos: vec2(0,0),
        add() {
          this.flipX(true)
          this.on("collide", (obj, col) => {
            if (col.isLeft() || col.isRight()) {
              dir = -dir;
              this.flipX(this.flip)
              this.flip = !this.flip
            }
          });
        },
        update() {
          if(Math.abs(this.pos.x - this.startingPos.x)>=distance){
            dir=-dir
          }
          this.move(speed * dir, 0);
        },
      }
    }



    
//SQUASHING ENEMY AND REMOVING IT FROM SCENE
    const enemy=()=>{
      return{
        id:"enemy",
        require:["pos","area","sprite","patrol"],
        isAlive:true,
        update(){},
        squash(){
          this.isAlive = false;
          this.unuse("patrol");
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
          area({ width: 0, height: 0 })
          timer(50,()=>{
            area({width:16,height:16})
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
          }}
        />
      </Box>
    </div>
  );
};
