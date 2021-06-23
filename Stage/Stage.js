import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.gridSize = 16;
    this.vars.pieceX = 4;
    this.vars.pieceY = 2;
    this.vars.pieceRotation = 0;
    this.vars.pieceType = 3;
    this.vars.score = 0;
    this.vars.level = 0;
    this.vars.grid = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    this.watchers.pieceX = new Watcher({
      label: "piece x",
      style: "slider",
      visible: true,
      value: () => this.vars.pieceX,
      setValue: value => {
        this.vars.pieceX = value;
      },
      x: 247,
      y: 173
    });
    this.watchers.pieceY = new Watcher({
      label: "piece y",
      style: "slider",
      visible: true,
      value: () => this.vars.pieceY,
      setValue: value => {
        this.vars.pieceY = value;
      },
      x: 247,
      y: 128
    });
    this.watchers.pieceRotation = new Watcher({
      label: "piece rotation",
      style: "slider",
      visible: true,
      value: () => this.vars.pieceRotation,
      setValue: value => {
        this.vars.pieceRotation = value;
      },
      x: 248,
      y: 84
    });
    this.watchers.pieceType = new Watcher({
      label: "piece type",
      style: "slider",
      visible: true,
      value: () => this.vars.pieceType,
      setValue: value => {
        this.vars.pieceType = value;
      },
      x: 247,
      y: 39
    });
    this.watchers.score = new Watcher({
      label: "score",
      style: "normal",
      visible: true,
      value: () => this.vars.score,
      x: 240,
      y: -91
    });
    this.watchers.level = new Watcher({
      label: "level",
      style: "normal",
      visible: true,
      value: () => this.vars.level,
      x: 240,
      y: -68
    });
    this.watchers.grid = new Watcher({
      label: "grid",
      style: "normal",
      visible: true,
      value: () => this.vars.grid,
      x: 576,
      y: 180,
      width: 142,
      height: 357
    });
  }
}
