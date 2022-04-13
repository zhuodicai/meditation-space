import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

// let tree;
let skybox;
let water;


export function createEnvironment(scene) {
  console.log('Adding environment');
  
  //ground test
  const geometry = new THREE.CircleGeometry( 16, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 'rgb(255,255,255)'} );
  const circle = new THREE.Mesh( geometry, material );
  circle.rotateX( - Math.PI / 2);
  circle.visible = false;
  scene.add( circle );

  // terrain
  const geometryT = new THREE.PlaneBufferGeometry(800,800,64,64);
  const loaderT = new THREE.TextureLoader();
  const heightT = loaderT.load('assets/heightT.png');
  const textureT = loaderT.load('assets/textureT.jpeg');
  const materialT = new THREE.MeshStandardMaterial({
  // color:'gray',
  // color:'rgb(22,24,31)',
  color:'rgb(42,42,61)',
  side: THREE.DoubleSide,
  map: textureT,
  emissive: textureT,
  displacementMap: heightT,
  displacementScale: 200
  // emissive: 'blue'
  });
  const planeT = new THREE.Mesh(geometryT, materialT);
  planeT.position.set(-120,-8,50);
  scene.add(planeT);
  // planeT.rotation.x = 181;
  planeT.rotation.y = -300;
  planeT.rotateX( - Math.PI / 2);
  // planeT.visible = false;
  


  //tree
  // GLTFloader.load(
  //   '../assets/tree.gltf',
  //   function ( gltf ) {
  //     console.log('haha', gltf.scene);
  //     gltf.scene.scale.multiplyScalar(1/500);
  //   for(let x=-10; x<10; x++)
  //   for(let z=-10; z<10; z++) {
  //     if(x*x+z*z > 100){
  //     continue;
  //     }
  //      tree =
  //      gltf.scene.clone();
  //      tree.position.set(x+Math.random()*100, Math.random(), z+Math.random()*100);
  //      tree.rotation.y = Math.PI * 2 *Math.random();
  //      scene.add( tree );
  //   }
  //     console.log("in");
  //   },
  //   function ( xhr ) {
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //   },
  //   function ( error ) {
  //     console.log( 'An error happened', error );
  //   }
  // );

  

  //sky
  let materialArray=[];
  const skyTexture_ft = new THREE.TextureLoader().load('assets/sky1.png');
  const skyTexture_bk = new THREE.TextureLoader().load('assets/sky2.png');
  const skyTexture_up = new THREE.TextureLoader().load('assets/sky3.png');
  const skyTexture_dn = new THREE.TextureLoader().load('assets/sky4.png');
  const skyTexture_rt = new THREE.TextureLoader().load('assets/sky5.png');
  const skyTexture_lf = new THREE.TextureLoader().load('assets/sky6.png');

  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_ft}));
  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_bk}));
  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_up}));
  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_dn}));
  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_rt}));
  materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_lf}));

  for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
  const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo,materialArray);
  scene.add(skybox);



  // water

  const waterGeometry = new THREE.PlaneGeometry( 800, 800, 64,64 );

  water = new Water(
    waterGeometry,
    {
      textureWidth: 1000,
      textureHeight: 1000,
      waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      } ),
      // sunDirection: new THREE.Vector3(),
      sunColor: 'white',
      waterColor: 0x001e0f,
      // waterColor: 'white',
      distortionScale: 0,
      fog: scene.fog !== undefined,
      size : 0.1
    }
  );

  console.log(water.geometry.attributes.position,'im waaaaaaater');

  
  // water.rotation.x = - Math.PI / 2;
  water.rotateX( - Math.PI / 2);
  water.position.set(-120,3,50);
  scene.add( water );



  //picture on plane


}


// eslint-disable-next-line
export function updateEnvironment(scene) {
  skybox.rotateY(Math.PI / 80000);
  skybox.rotateX(Math.PI / 80000);
  skybox.rotateZ(Math.PI / 80000);

  // for ( let i = 0; i < water.geometry.attributes.position.count; i ++ ) {

  //   const y = 350 * Math.sin( i / 2 );
  //   water.geometry.attributes.position.setY( i, y );

  // }
}

