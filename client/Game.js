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
    loadSprite("bigMushy", "bigMushy.png");
    loadSprite("pipeTop", "pipeTop.png");
    loadSprite("pipeBottom", "pipeBottom.png");
    loadSprite("shrubbery", "shrubbery.png");
    loadSprite("hill", "hill.png");
    loadSprite("cloud", "cloud.png");
    loadSprite("castle", "castle.png");
    loadSprite("dBrick","DeBrick.png")

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
    loadSound("lostBig","smb3_lost_suit.wav")
    loadSound("timeWarn", "smb_warning.wav")
    //main soundtrack
    const music = play("main",{
      volume:0.1,
      loop:true
    })

//LEVELS
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
        "       E                   |     |    |   E   E        |                            H           ",
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

    //SPRITES SETUP
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
      ",":()=>[
        sprite("dBrick"),
        area(),
        solid(),
        bump(30,3,false),
        origin("bot"),
        "dBrick",
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
    go("start");
    // scene("gameOver", ()=>{
    //   add()
    // })

 //LEVEL TRANSITION SCENE
    scene("nextLevel", ({levelId, coins,score})=>{
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
        go("game",{levelId: levelId, coins: coins, score: score})
      })
    })
    // go("nextLevel",{levelId: 0, coins: 0, score: 0})

    //GAME SCENE
    scene("game", ({ levelId, coins,score } = { levelId: 0, coins: 0, score:0 }) => {
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
        pos(170,12),
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

      const level = addLevel(LEVELS[levelId], spriteMap);

      add([sprite("cloud"), pos(20, 50), layer("bg")]);
      add([sprite("hill"), pos(32, 208), layer("bg"), origin("bot")]);
      add([sprite("shrubbery"), pos(200, 208), layer("bg"), origin("bot")]);
      add([
        text(`Level ${levelId + 1}`, { size: 24 }),
        pos(vec2(200, 120)),
        color(255, 255, 255),
        origin("center"),
        layer("ui"),
        lifespan(1, { fade: 0.5 }),
      ]);

      const player = level.spawn("p", 1, 10);
      music.play();

      
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
          killed();
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
          if(!player.isInvulnerable){
            killed();
          }
        }
      }
    });
    
//CASTLE COLLIDE
    player.onCollide("castle", (castle,side)=>{
      player.freeze();
      music.pause();
      play("stageClear")
      if(time>=1){
        loop(.02,()=>{
          if(time>0){
            time -=1;
          timeUI.text = `TIME: ${time}`
          score += 25
          scoreUi.text = `SCORE:${score}`
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
          go("nextLevel",{levelId: levelId +1, coins: coins, score: score})
          music.play()
        }
      })
    })

    function killed() {
      // Mario is dead :(
      if (player.isAlive == false) return;
       // Don't run it if mario is already dead
      play("die")
      player.die();
      music.pause();
      add([
        text("Game Over", { size: 24, font: "sink" }),
        pos(toWorld(vec2(210, 120))),
        color(255, 255, 255),
        origin("center"),
        layer('ui'),
      ]);
      wait(5, () => {
        go("start");
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
    });
//END OF GAME SCENE


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
          }}
        />
      </Box>
    </div>
  );
};
