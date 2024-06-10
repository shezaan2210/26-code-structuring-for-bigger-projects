import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene =  this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', ()=>{
            console.log('resources are ready')
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }
    Update() {
        if(this.fox){
            this.fox.update()
        }
    }
}