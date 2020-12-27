"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withGameDuration(time) {
    this.GameDuration = time;
    return this;
  }

  withCarrotCount(CarrotCount) {
    this.CarrotCount = CarrotCount;
    return this;
  }

  withBugCount(BugCount) {
    this.BugCount = BugCount;
    return this;
  }

  build() {
    return new Game(
      this.GameDuration, //
      this.CarrotCount,
      this.BugCount
    ); //
  }
}

class Game {
  constructor(GameDuration, CarrotCount, BugCount) {
    this.gameDuration = GameDuration;
    this.carrotCount = CarrotCount;
    this.bugCount = BugCount;
    this.timerIndicator = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickEventListner((event) => {
      this.onItemClick(event);
    });
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick(item) {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }

  start() {
    this.started = true;
    this.initGame();
    this.gameField.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBgm();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBgm();
    this.onGameStop && this.onGameStop(reason);
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.timerIndicator.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
