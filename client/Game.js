import React, { useState, useEffect } from "react";
import kaboom from "kaboom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Game = () => {
  const initGame = () => {
    kaboom({
      background: [134, 135, 247],
      width: 320,
      height: 240,
      canvas: document.querySelector("#main"),
    });
    //mario sprites
    loadRoot("sprites/");
    loadAseprite("mario", "Mario.png", "Mario.json");
    loadAseprite("enemies", "enemies.png", "enemies.json");
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
  };
  useEffect(() => {
    initGame();
  }, []);
  return (
    <div>
      <h1>HELLO WORLD!</h1>
      <h1>PLEASE RENDER SOMETHING</h1>
      <Box component="div" sx={{display:"flex", justifyContent:"center"}}>
        <Box
          component="canvas"
          id="main"
          sx={{
            width: "1000px",
            height: "562.5px",
          }}
        />
      </Box>
    </div>
  );
};
