import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 46,
        y: 53
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.x = 11;
    this.vars.y = 23;
    this.vars.pieceTemplate = 10011121;
    this.vars.n = 5;
    this.vars.isValid = "true";
    this.vars.i = 1;
    this.vars.newGridRow = 55000;
    this.vars.pieceFallTimer = 16;
    this.vars.isFilled = "false";
    this.vars.linesCleared = 0;
    this.vars.pieceFallSpeed = 18;
    this.vars.pieceTilesX = [5, 4, 5, 6];
    this.vars.pieceTilesY = [2, 3, 3, 3];
    this.vars.pieceTemplates = [
      1112131,
      20212223,
      2122232,
      10111213,
      11011,
      11011,
      11011,
      11011,
      10011121,
      10111221,
      1112112,
      10111201,
      1111020,
      10112122,
      2121121,
      11112,
      101121,
      20211112,
      1111222,
      10110102,
      11121,
      20101112,
      1112122,
      10111202,
      1112120,
      10111222,
      21110102,
      101112
    ];
    this.vars.keyHoldFrames = [-1, -1, -1, -1];
    this.vars.filledRows = [];
    this.vars.kickX = [
      0,
      1,
      1,
      0,
      1,
      0,
      -1,
      -1,
      0,
      -1,
      0,
      1,
      1,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      -1,
      -1,
      0,
      -1,
      0,
      1,
      1,
      0,
      1,
      0,
      -1,
      -1,
      0,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      0,
      -1,
      2,
      -1,
      2,
      0,
      -2,
      1,
      -2,
      1,
      0,
      2,
      -1,
      2,
      -1,
      0,
      -1,
      2,
      -1,
      2,
      0,
      1,
      -2,
      1,
      -2,
      0,
      2,
      -1,
      2,
      -1,
      0,
      -2,
      1,
      -2,
      1,
      0,
      1,
      -2,
      1,
      -2
    ];
    this.vars.kickY = [
      0,
      0,
      1,
      -2,
      -2,
      0,
      0,
      1,
      -2,
      -2,
      0,
      0,
      -1,
      2,
      2,
      0,
      0,
      -1,
      2,
      2,
      0,
      0,
      1,
      -2,
      -2,
      0,
      0,
      1,
      -2,
      -2,
      0,
      0,
      -1,
      2,
      2,
      0,
      0,
      -1,
      2,
      2,
      0,
      0,
      0,
      2,
      -1,
      0,
      0,
      0,
      -1,
      2,
      0,
      0,
      0,
      1,
      -2,
      0,
      0,
      0,
      2,
      -1,
      0,
      0,
      0,
      -2,
      1,
      0,
      0,
      0,
      1,
      -2,
      0,
      0,
      0,
      -1,
      2,
      0,
      0,
      0,
      -2,
      1
    ];
    this.vars.randomBag = [1, 2, 4, 5, 6, 7];

    this.watchers.pieceFallTimer = new Watcher({
      label: "Sprite1: piece fall timer",
      style: "normal",
      visible: true,
      value: () => this.vars.pieceFallTimer,
      x: 240,
      y: -135
    });
    this.watchers.pieceFallSpeed = new Watcher({
      label: "Sprite1: piece fall speed",
      style: "normal",
      visible: true,
      value: () => this.vars.pieceFallSpeed,
      x: 240,
      y: -158
    });
  }

  *resetGrid() {
    this.stage.vars.grid = [];
    for (let i = 0; i < 22; i++) {
      this.stage.vars.grid.push(0);
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.vars.randomBag = [];
    this.stage.vars.score = 0;
    this.stage.vars.level = 0;
    this.vars.linesCleared = 0;
    yield* this.resetGrid();
    yield* this.generateNewPiece();
    yield* this.resetKeyHoldFrames();
    this.stage.vars.gridSize = 16;
    this.vars.pieceFallTimer = 0;
    while (true) {
      this.stage.vars.level = Math.floor(this.vars.linesCleared / 10);
      this.vars.pieceFallSpeed = 18 - 2 * this.stage.vars.level;
      if (this.vars.pieceFallSpeed < 0) {
        this.vars.pieceFallSpeed = 0;
      }
      yield* this.renderGrid();
      yield* this.updateKeyHoldFrames();
      yield* this.updateFallingPiece();
      yield;
    }
  }

  *renderGrid() {
    this.clearPen();
    this.penSize = 2;
    this.penColor = Color.rgb(0, 0, 0);
    this.penDown = false;
    this.goto(
      (10 * this.stage.vars.gridSize) / 2,
      (20 * this.stage.vars.gridSize) / 2
    );
    this.penDown = true;
    this.goto(
      (10 * this.stage.vars.gridSize) / 2,
      (-20 * this.stage.vars.gridSize) / 2
    );
    this.goto(
      (-10 * this.stage.vars.gridSize) / 2,
      (-20 * this.stage.vars.gridSize) / 2
    );
    this.goto(
      (-10 * this.stage.vars.gridSize) / 2,
      (20 * this.stage.vars.gridSize) / 2
    );
    this.goto(
      (10 * this.stage.vars.gridSize) / 2,
      (20 * this.stage.vars.gridSize) / 2
    );
    this.penDown = false;
    this.vars.y = 3;
    for (let i = 0; i < 20; i++) {
      this.vars.x = 1;
      for (let i = 0; i < 10; i++) {
        this.warp(this.renderTile)(
          this.vars.x,
          this.vars.y,
          String(this.stage.vars.grid[this.vars.y - 1])[this.vars.x - 1]
        );
        this.vars.x += 1;
      }
      this.vars.y += 1;
    }
    this.warp(this.getPieceCoordinates)(
      this.stage.vars.pieceX,
      this.stage.vars.pieceY,
      this.stage.vars.pieceRotation,
      this.stage.vars.pieceType
    );
    this.vars.n = 1;
    for (let i = 0; i < 4; i++) {
      if (this.vars.pieceTilesY[this.vars.n - 1] > 2) {
        this.warp(this.renderTile)(
          this.vars.pieceTilesX[this.vars.n - 1],
          this.vars.pieceTilesY[this.vars.n - 1],
          this.stage.vars.pieceType
        );
      }
      this.vars.n += 1;
    }
  }

  *renderTile(x2, y2, type) {
    if (!(type == 0)) {
      this.penDown = false;
      this.penSize = this.stage.vars.gridSize;
      if (type == 1) {
        this.penColor = Color.rgb(0, 255, 241);
      }
      if (type == 2) {
        this.penColor = Color.rgb(250, 255, 0);
      }
      if (type == 3) {
        this.penColor = Color.rgb(212, 0, 255);
      }
      if (type == 4) {
        this.penColor = Color.rgb(42, 255, 0);
      }
      if (type == 5) {
        this.penColor = Color.rgb(255, 0, 0);
      }
      if (type == 6) {
        this.penColor = Color.rgb(4, 0, 255);
      }
      if (type == 7) {
        this.penColor = Color.rgb(255, 123, 0);
      }
      this.goto(
        (-10 * this.stage.vars.gridSize) / 2 +
          (x2 - 0.5) * this.stage.vars.gridSize,
        (20 * this.stage.vars.gridSize) / 2 +
          (y2 - 2.5) * (this.stage.vars.gridSize * -1)
      );
      this.penDown = true;
      this.penDown = false;
      this.penSize = 4;
      this.x += this.stage.vars.gridSize / -2 + 2;
      this.y += this.stage.vars.gridSize / 2 - 2;
      this.penDown = true;
      this.x += this.stage.vars.gridSize - 4;
      this.y += -1 * (this.stage.vars.gridSize - 4);
      this.x += -1 * (this.stage.vars.gridSize - 4);
      this.y += this.stage.vars.gridSize - 4;
      this.penDown = false;
    }
  }

  *getPieceCoordinates(x3, y3, rotation, type2) {
    this.vars.pieceTemplate = this.vars.pieceTemplates[
      (type2 - 1) * 4 + rotation + 1 - 1
    ];
    this.vars.pieceTilesX = [];
    this.vars.pieceTilesY = [];
    this.vars.pieceTilesX.push(String(this.vars.pieceTemplate)[1 - 1] + x3);
    this.vars.pieceTilesY.push(String(this.vars.pieceTemplate)[2 - 1] + y3);
    this.vars.pieceTilesX.push(String(this.vars.pieceTemplate)[3 - 1] + x3);
    this.vars.pieceTilesY.push(String(this.vars.pieceTemplate)[4 - 1] + y3);
    this.vars.pieceTilesX.push(String(this.vars.pieceTemplate)[5 - 1] + x3);
    this.vars.pieceTilesY.push(String(this.vars.pieceTemplate)[6 - 1] + y3);
    this.vars.pieceTilesX.push(String(this.vars.pieceTemplate)[7 - 1] + x3);
    this.vars.pieceTilesY.push(String(this.vars.pieceTemplate)[8 - 1] + y3);
  }

  *generateNewPiece() {
    if (this.vars.randomBag.length == 0) {
      this.vars.n = 1;
      for (let i = 0; i < 7; i++) {
        this.vars.randomBag.push(this.vars.n);
        this.vars.n += 1;
      }
    }
    this.vars.n = this.random(1, this.vars.randomBag.length);
    this.stage.vars.pieceType = this.vars.randomBag[this.vars.n - 1];
    this.vars.randomBag.splice(this.vars.n - 1, 1);
    this.stage.vars.pieceY = 1;
    this.stage.vars.pieceX = 4;
    if (this.stage.vars.pieceType == 2) {
      this.stage.vars.pieceX = 5;
    }
    this.stage.vars.pieceRotation = 0;
    this.warp(this.checkIfPieceIsValid)(
      this.stage.vars.pieceX,
      this.stage.vars.pieceY,
      this.stage.vars.pieceRotation,
      this.stage.vars.pieceType
    );
    if (this.vars.isValid == "false") {
      /* TODO: Implement stop all */ null;
    }
  }

  *updateFallingPiece() {
    this.vars.pieceFallTimer += 1;
    if (this.vars.keyHoldFrames[4 - 1] == 0) {
      this.vars.isValid = "true";
      while (!(this.vars.isValid == "false")) {
        this.stage.vars.pieceY += 1;
        this.warp(this.checkIfPieceIsValid)(
          this.stage.vars.pieceX,
          this.stage.vars.pieceY,
          this.stage.vars.pieceRotation,
          this.stage.vars.pieceType
        );
      }
      this.stage.vars.pieceY += -1;
      this.warp(this.storePieceToGrid)(
        this.stage.vars.pieceX,
        this.stage.vars.pieceY,
        this.stage.vars.pieceRotation,
        this.stage.vars.pieceType
      );
      this.warp(this.clearFilledRows)();
      this.warp(this.generateNewPiece)();
      this.vars.pieceFallTimer = 0;
    } else {
      if (
        this.vars.keyHoldFrames[1 - 1] % 2 == 0 &&
        !(
          this.vars.keyHoldFrames[1 - 1] == 2 ||
          this.vars.keyHoldFrames[1 - 1] == 4
        )
      ) {
        this.warp(this.checkIfPieceIsValid)(
          this.stage.vars.pieceX + 1,
          this.stage.vars.pieceY,
          this.stage.vars.pieceRotation,
          this.stage.vars.pieceType
        );
        if (this.vars.isValid == "true") {
          this.stage.vars.pieceX += 1;
        }
      }
      if (
        this.vars.keyHoldFrames[2 - 1] % 2 == 0 &&
        !(
          this.vars.keyHoldFrames[2 - 1] == 2 ||
          this.vars.keyHoldFrames[2 - 1] == 4
        )
      ) {
        this.warp(this.checkIfPieceIsValid)(
          this.stage.vars.pieceX + -1,
          this.stage.vars.pieceY,
          this.stage.vars.pieceRotation,
          this.stage.vars.pieceType
        );
        if (this.vars.isValid == "true") {
          this.stage.vars.pieceX += -1;
        }
      }
      if (this.vars.keyHoldFrames[3 - 1] == 0) {
        this.warp(this.rotatePiece)(1);
      }
      if (
        this.vars.pieceFallTimer > this.vars.pieceFallSpeed ||
        this.keyPressed("down arrow")
      ) {
        this.warp(this.checkIfPieceIsValid)(
          this.stage.vars.pieceX,
          this.stage.vars.pieceY + 1,
          this.stage.vars.pieceRotation,
          this.stage.vars.pieceType
        );
        if (this.vars.isValid == "true") {
          this.stage.vars.pieceY += 1;
        } else {
          this.warp(this.storePieceToGrid)(
            this.stage.vars.pieceX,
            this.stage.vars.pieceY,
            this.stage.vars.pieceRotation,
            this.stage.vars.pieceType
          );
          this.warp(this.clearFilledRows)();
          this.warp(this.generateNewPiece)();
        }
        this.vars.pieceFallTimer = 0;
      }
    }
  }

  *storePieceToGrid(x4, y4, rotation2, type3) {
    this.warp(this.getPieceCoordinates)(x4, y4, rotation2, type3);
    this.vars.n = 1;
    for (let i = 0; i < 4; i++) {
      this.vars.newGridRow = "";
      this.vars.i = 1;
      for (let i = 0; i < 10; i++) {
        if (this.vars.i == this.vars.pieceTilesX[this.vars.n - 1]) {
          this.vars.newGridRow = "" + this.vars.newGridRow + type3;
        } else {
          this.vars.newGridRow =
            "" +
            this.vars.newGridRow +
            String(
              this.stage.vars.grid[this.vars.pieceTilesY[this.vars.n - 1] - 1]
            )[this.vars.i - 1];
        }
        this.vars.i += 1;
      }
      this.stage.vars.grid.splice(
        this.vars.pieceTilesY[this.vars.n - 1] - 1,
        1,
        this.vars.newGridRow
      );
      this.vars.n += 1;
    }
  }

  *checkIfPieceIsValid(x5, y5, rotation3, type4) {
    this.warp(this.getPieceCoordinates)(x5, y5, rotation3, type4);
    this.vars.n = 1;
    this.vars.isValid = "true";
    for (let i = 0; i < 4; i++) {
      if (this.vars.pieceTilesY[this.vars.n - 1] > 22) {
        this.vars.isValid = "false";
      }
      if (
        !(
          String(
            this.stage.vars.grid[this.vars.pieceTilesY[this.vars.n - 1] - 1]
          )[this.vars.pieceTilesX[this.vars.n - 1] - 1] == 0
        )
      ) {
        this.vars.isValid = "false";
      }
      this.vars.n += 1;
    }
  }

  *resetKeyHoldFrames() {
    this.vars.keyHoldFrames = [];
    for (let i = 0; i < 4; i++) {
      this.vars.keyHoldFrames.push(-1);
    }
  }

  *updateKeyHoldFrames() {
    if (this.keyPressed("right arrow")) {
      this.vars.keyHoldFrames.splice(
        1 - 1,
        1,
        this.vars.keyHoldFrames[1 - 1] + 1
      );
    } else {
      this.vars.keyHoldFrames.splice(1 - 1, 1, -1);
    }
    if (this.keyPressed("left arrow")) {
      this.vars.keyHoldFrames.splice(
        2 - 1,
        1,
        this.vars.keyHoldFrames[2 - 1] + 1
      );
    } else {
      this.vars.keyHoldFrames.splice(2 - 1, 1, -1);
    }
    if (this.keyPressed("up arrow")) {
      this.vars.keyHoldFrames.splice(
        3 - 1,
        1,
        this.vars.keyHoldFrames[3 - 1] + 1
      );
    } else {
      this.vars.keyHoldFrames.splice(3 - 1, 1, -1);
    }
    if (this.keyPressed("space")) {
      this.vars.keyHoldFrames.splice(
        4 - 1,
        1,
        this.vars.keyHoldFrames[4 - 1] + 1
      );
    } else {
      this.vars.keyHoldFrames.splice(4 - 1, 1, -1);
    }
  }

  *clearFilledRows() {
    this.warp(this.findFilledRows)();
    this.vars.i = 1;
    for (let i = 0; i < this.vars.filledRows.length; i++) {
      this.stage.vars.grid.splice(this.vars.filledRows[this.vars.i - 1] - 1, 1);
      this.stage.vars.grid.splice(1 - 1, 0, 0);
      this.vars.i += 1;
    }
    if (this.vars.filledRows.length == 1) {
      this.stage.vars.score += 40 * (this.stage.vars.level + 1);
    }
    if (this.vars.filledRows.length == 2) {
      this.stage.vars.score += 100 * (this.stage.vars.level + 1);
    }
    if (this.vars.filledRows.length == 3) {
      this.stage.vars.score += 300 * (this.stage.vars.level + 1);
    }
    if (this.vars.filledRows.length == 4) {
      this.stage.vars.score += 1200 * (this.stage.vars.level + 1);
    }
    this.vars.linesCleared += this.vars.filledRows.length;
  }

  *findFilledRows() {
    this.vars.filledRows = [];
    this.vars.i = 1;
    for (let i = 0; i < 22; i++) {
      this.vars.isFilled = "true";
      this.vars.n = 1;
      for (let i = 0; i < 10; i++) {
        if (
          String(this.stage.vars.grid[this.vars.i - 1])[this.vars.n - 1] == 0
        ) {
          this.vars.isFilled = "false";
        }
        this.vars.n += 1;
      }
      if (this.vars.isFilled == "true") {
        this.vars.filledRows.push(this.vars.i);
      }
      this.vars.i += 1;
    }
  }

  *rotatePiece(direction) {
    this.vars.i = 1;
    if (this.stage.vars.pieceType == 1) {
      this.vars.i += 40;
    }
    this.vars.i += 10 * this.stage.vars.pieceRotation;
    if (direction == 1) {
      this.vars.i += 5;
    }
    this.vars.isValid = "false";
    for (let i = 0; i < 5; i++) {
      if (this.vars.isValid == "false") {
        this.warp(this.checkIfPieceIsValid)(
          this.stage.vars.pieceX + this.vars.kickX[this.vars.i - 1],
          this.stage.vars.pieceY + this.vars.kickY[this.vars.i - 1],
          (this.stage.vars.pieceRotation + direction) % 4,
          this.stage.vars.pieceType
        );
        if (this.vars.isValid == "true") {
          this.stage.vars.pieceRotation =
            (this.stage.vars.pieceRotation + direction) % 4;
          this.stage.vars.pieceX += this.vars.kickX[this.vars.i - 1];
          this.stage.vars.pieceY += this.vars.kickY[this.vars.i - 1];
        }
        this.vars.i += 1;
      }
    }
  }
}
