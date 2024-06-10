import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import Sources from "./Sources";
import Debug from "./Utils/Debug";
import { OrbitControls } from "three/examples/jsm/Addons.js";

 

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    //    Setup
    this.canvas = canvas;
    this.debug = new Debug()
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(Sources)
    this.camera = new Camera();
    this.renderer = new Renderer()
    this.world = new World()


    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });
  

    //    Time event
    this.time.on("tick", () => {
      this.update();
    });

   window.addEventListener('blur', this.onBlur.bind(this))
   window.addEventListener('visibilitychange', this.onVisibilityChange.bind(this))
   window.addEventListener('focus', this.onFocus.bind(this))
   window.addEventListener('visibilitychange', this.onVisibilityChange.bind(this))
  }
  resize() {
    this.camera.setResize(); 
    this.renderer.resize()
  }
  update() {
    this.camera.Update()
    this.world.Update()
    this.renderer.update()
  }
  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene 
    this.scene.traverse((child)=>{
      console.log(child)
     if(child instanceof THREE.Mesh){
      child.geometry.dispose()

      for(const key in child.material){
        const value = child.material[key]

        if(value && typeof value.dispose === 'function'){
          value.dispose()
        }
      }
     }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
    // if(this.debug.active){
    //   this.debug.ui.dispose()
    // }
    
  }
  onBlur() {
    this.destroy()
  }
  onFocus() {
    // Recreate resources when the window gains focus
    if (document.visibilityState === "visible") {
        // Dispose existing resources
        this.destroy();

        // Recreate resources
        this.debug = new Debug()
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(Sources)
        this.camera = new Camera();
        this.renderer = new Renderer()
        this.world = new World()

        this.camera.controls = new OrbitControls(this.camera.instance, this.canvas);
        this.camera.controls.enableDamping = true;
       

        this.sizes.on("resize", () => {
          this.resize();
      });

      // Time event
      this.time.on("tick", () => {
          this.update();
      });

        // Resize renderer
        this.resize();

        // Update the scene
        this.update();
    }
}

  onVisibilityChange() {
    if(document.visibilityState === 'hidden'){
      this.destroy()
    }
  }
}
