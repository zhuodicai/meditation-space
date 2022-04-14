/* eslint-disable no-unused-vars */

import * as THREE from 'three';
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls';
import EventEmitter from 'event-emitter-es6';
import {createEnvironment,updateEnvironment} from './environment';


let water;
class Scene extends EventEmitter {
  constructor(domElement = document.getElementById('gl_context'),
              _width = window.innerWidth,
              _height = window.innerHeight,
              hasControls = true,
              clearColor = 'white') {

    //Since we extend EventEmitter we need to instance it from here
    super();

    // guard against multiple binds
    this.audioBinded = false;
    this.playing = false;

    //THREE scene
    this.scene = new THREE.Scene();

    //Utility
    this.width = _width;
    this.height = _height;

    //THREE Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      5000
    );
    this.camera.position.set(0, 5, 80);
    this.scene.add(this.camera);

    // create an AudioListener and add it to the camera

    //THREE WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialiasing: true
    });

    this.renderer.setClearColor(new THREE.Color(clearColor));

    this.renderer.setSize(this.width, this.height);

    //Push the canvas to the DOM
    domElement.append(this.renderer.domElement);

    if(hasControls){
      this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
      this.controls.lookSpeed = 0.01;
      this.controls.movementSpeed = 15;
      this.controls.activeLook = true;
      // if(this.controls.mouseDragOn == true){
      //   this.controls.activeLook = true;
      // }
      
    }

    //Setup event listeners for events and handle the states
    window.addEventListener('resize', e => this.onWindowResize(e), false);
    // window.addEventListener('keydown', e => this.onKeyDown(e), false);
    domElement.addEventListener('mouseenter', e => this.onEnterCanvas(e), false);
    domElement.addEventListener('mouseleave', e => this.onLeaveCanvas(e), false);
    

    // Add external media to <audio> tag in HTML
    document.addEventListener('keydown', (event) => {
      this.bindSounds();

      let moveKeys = ['w','a','s','d'];
      if(!moveKeys.includes(event.key))
        return;
      let waterAudio = document.getElementById( 'waterAudio' );
      if(waterAudio.paused) 
        waterAudio.play();
    });

    document.addEventListener('keyup', (event) => {
      let moveKeys = ['w','a','s','d'];
      if(!moveKeys.includes(event.key))
        return;
      let waterAudio = document.getElementById( 'waterAudio' );
      if(!waterAudio.paused && waterAudio.currentTime != 0){
        waterAudio.currentTime = 0;
        waterAudio.play();
      } else{
        waterAudio.pause();
        waterAudio.currentTime = 0;
      }
        
    });

    document.addEventListener('mousedown', (event) => {
      this.bindSounds();
    });


    
    // Helpers
    // this.scene.add(new THREE.GridHelper(1000, 1000));
    // this.scene.add(new THREE.AxesHelper(10));
  
    this.clock = new THREE.Clock();

    createEnvironment(this.scene);
    this.addLights(this.scene);
    
    
    this.update();
  }

  drawUsers(positions, id){
    for(let i = 0; i < Object.keys(positions).length; i++){
      if(Object.keys(positions)[i] != id){
        this.users[i].position.set(positions[Object.keys(positions)[i]].position[0],
                                   positions[Object.keys(positions)[i]].position[1],
                                   positions[Object.keys(positions)[i]].position[2]);
      }
    }
  }

  addLights() {
    this.scene.add(new THREE.AmbientLight(0xffffe6, 0.9));
    
    let dirLight1 = new THREE.DirectionalLight( 0xffffff,0.1 );
		dirLight1.position.set( -3, 0, 3 ).normalize();
		this.scene.add( dirLight1 );

    let dirLight2 = new THREE.DirectionalLight( 0xffffff,0.1 );
		dirLight2.position.set( 10, 0, -10 ).normalize();
		this.scene.add( dirLight2 );

    let dirLight3 = new THREE.DirectionalLight( 0xffffff,0.1 );
		dirLight3.position.set( -23, -0.5, -23 ).normalize();
		this.scene.add( dirLight3 );

    console.log('hey light is on');
  }

  bindSounds(){
    if(this.audioBinded)
      return;
    this.audioBinded = true;
    this.listener = new THREE.AudioListener();
    this.scene.add(this.listener);

    let envSource = new THREE.PositionalAudio( this.listener );
    let envAudio = document.getElementById( 'envAudio' );
    envSource.setMediaElementSource( envAudio );
    envSource.setRefDistance( 1 );
    this.scene.add(envSource);
    envAudio.play();

    let waterSource = new THREE.PositionalAudio( this.listener );
    let waterAudio = document.getElementById( 'waterAudio' );
    waterSource.setMediaElementSource(waterAudio);
    waterSource.setRefDistance(1);
    this.scene.add(waterSource);
  }

  // addWaterSound(){
  //   this.listener = new THREE.AudioListener();
  //   this.scene.add(this.listener);
  //   water = new THREE.PositionalAudio( this.listener );
  //   let songElement = document.getElementById( 'waterAudio' );
  //   water.setMediaElementSource( songElement );
  //   water.setRefDistance( 1 );
  //   songElement.play();
  //   this.scene.add(water);
  // }


  //notice: update() includes render()!
  update(){
    updateEnvironment();
    requestAnimationFrame(() => this.update());
    this.controls.update(this.clock.getDelta());
    this.controls.target = new THREE.Vector3(0,0,0);
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(e) {
    console.log('resize');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  onLeaveCanvas(e){
    this.controls.enabled = false;
  }
  onEnterCanvas(e){
    this.controls.enabled = true;
  }
  onKeyDown(e){
    this.emit('userMoved');
  }

}

export default Scene;
