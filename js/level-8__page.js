import {addEventListenerToStartButton, addEventListenerToRestartButton} from "./script.js";

var LEVEL_FOUR_TIME_VAL = 1024;

window.onload = () => {

    let grid = document.getElementById("grid");
    let items = document.getElementsByClassName("items");
    let time = document.getElementById("time");
    let startBtn = document.getElementById("start__button");
    let restartBtn = document.getElementById("restart__button");
    let backBtn = document.getElementById("back__button");
    let score = document.getElementById("best-time-completed");

    restartBtn.disabled = true;

    addEventListenerToStartButton(startBtn, restartBtn, grid, items, score, backBtn, time, LEVEL_FOUR_TIME_VAL);

    addEventListenerToRestartButton(restartBtn, grid, items, backBtn, time, LEVEL_FOUR_TIME_VAL);
    
};