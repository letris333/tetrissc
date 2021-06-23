import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ProjectThumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "Project Thumbnail",
        "./ProjectThumbnail/costumes/Project Thumbnail.png",
        { x: 480, y: 360 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
