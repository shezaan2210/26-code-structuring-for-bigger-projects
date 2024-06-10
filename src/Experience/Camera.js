import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControls()
  }
  setInstance() {
    // Base camera
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    // Controls
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }
  setResize() {
  this.instance.aspect = this.sizes.width / this.sizes.height
   this.instance.updateProjectionMatrix()
  }
  Update() {
    this.controls.update()
  }
}
