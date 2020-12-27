"use strict";

import PopUp from "./popup.js";
import * as sound from "./sound.js";

import { GameBuilder, Reason } from "./game.js";

const GameFinshBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = "Restart?";
      break;
    case Reason.win:
      sound.playWIN();

      message = "Win~";
      break;
    case Reason.lose:
      sound.playBug();

      message = "Lose TT";
    default:
      break;
  }
  GameFinshBanner.showWithText(message);
});

GameFinshBanner.setClickEventListner(() => {
  game.start();
});
