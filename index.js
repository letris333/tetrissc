import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import ProjectThumbnail from "./ProjectThumbnail/ProjectThumbnail.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Sprite1: new Sprite1({
    x: 2,
    y: 158,
    direction: 89.88140791586056,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  ProjectThumbnail: new ProjectThumbnail({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
