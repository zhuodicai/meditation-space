import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


let tree;
let skybox;
let water;
let moon;
let board1,board2,board3;

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
  new GLTFLoader().load(
    '../assets/tree.gltf',
    function ( gltf ) {
      console.log('haha', gltf.scene);
      gltf.scene.scale.multiplyScalar(1/30);
    for(let x=-20; x<0; x=x+5)
    for(let z=-20; z<0; z=z+5) {
      if(x*x+z*z > 400){
      continue;
      }
       tree =
       gltf.scene.clone();
       tree.position.set(x+Math.random()*100, -8, z+Math.random()*100);
       tree.rotation.y = Math.PI * 2 *Math.random();
       scene.add( tree );
    }
      console.log('tree is in');
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened', error );
    }
  );

  

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
  const skyboxGeo = new THREE.BoxGeometry(1500, 1500, 1500);
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
      waterColor: 0x00000c,
      // waterColor: 'white',
      distortionScale: 0,
      fog: scene.fog !== undefined,
      size : 0.1
    }
  );

  console.log(water.geometry.attributes.position,'im waaaaaaater');

  
  // water.rotation.x = - Math.PI / 2;
  water.rotateX( - Math.PI / 2);
  water.position.set(-120,-5,50);
  scene.add( water );


  //moon ground
  const geometryG = new THREE.CircleGeometry( 48, 32 );
  const materialG = new THREE.MeshBasicMaterial( {color: 'rgb(0,0,0)',transparent: true,  opacity: 0.3} );
  const circleG = new THREE.Mesh( geometryG, materialG );
  circleG.rotateX( - Math.PI / 2);
  circleG.visible = true;
  circleG.position.set(-50, -4.9, -200);
  scene.add( circleG );

  //moon
  const geometryM = new THREE.SphereGeometry( 50, 32, 16 );
  // const materialM = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const loaderM = new THREE.TextureLoader();
  const textureM = loaderM.load('assets/moon.jpeg');
  const materialM = new THREE.MeshStandardMaterial({
  // color:'gray',
  // color:'rgb(22,24,31)',
  color:0xffffff,
  side: THREE.DoubleSide,
  map: textureM,
  emissive: textureM
  });
  moon = new THREE.Mesh( geometryM, materialM );
  moon.position.set(-50, -5, -200);
  scene.add( moon );



  //intro in moon
  //😊board1
  var boardWidth1 = 8.13*1.5; // 画布的宽度
  var boardHeight1 = 10*1.5; // 画布的高度
  var boardTexture1 = new THREE.TextureLoader().load('assets/board1.jpeg');
  var boardGeometry1 = new THREE.PlaneGeometry( boardWidth1, boardHeight1);
  var boardMaterial1 = new THREE.MeshBasicMaterial({
      map: boardTexture1,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,  //是否被遮挡？
      depthWrite: true,  //没懂区别:)
      // opacity: 0.1,
  });

  board1 = new THREE.Mesh(boardGeometry1, boardMaterial1);
  board1.position.set(-90, 10, -200);
  board1.rotateY(Math.PI / 2.5);
  board1.visible = true;
  scene.add(board1);

  //😊board2
  var boardWidth2 = 17.97*1.5; // 画布的宽度
  var boardHeight2 = 10*1.5; // 画布的高度
  var boardTexture2 = new THREE.TextureLoader().load('assets/board2.jpeg');
  var boardGeometry2 = new THREE.PlaneGeometry( boardWidth2, boardHeight2);
  var boardMaterial2 = new THREE.MeshBasicMaterial({
      map: boardTexture2,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,  //是否被遮挡？
      depthWrite: true,  //没懂区别:)
      // opacity: 0.1,
  });

  board2 = new THREE.Mesh(boardGeometry2, boardMaterial2);
  board2.position.set(-50, 10, -240);
  // board2.rotateY(Math.PI);
  board2.visible = true;
  scene.add(board2);

  //😊board3
  var boardWidth3 = 11.86*1.5; // 画布的宽度
  var boardHeight3 = 10*1.5; // 画布的高度
  var boardTexture3 = new THREE.TextureLoader().load('assets/board3.jpeg');
  var boardGeometry3 = new THREE.PlaneGeometry( boardWidth3, boardHeight3);
  var boardMaterial3 = new THREE.MeshBasicMaterial({
      map: boardTexture3,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,  //是否被遮挡？
      depthWrite: true,  //没懂区别:)
      // opacity: 0.1,
  });

  board3 = new THREE.Mesh(boardGeometry3, boardMaterial3);
  board3.position.set(-10, 10, -200);
  board3.rotateY( -Math.PI / 2.5);
  board3.visible = true;
  scene.add(board3);

}



// eslint-disable-next-line
export function updateEnvironment(scene) {
  skybox.rotateY(Math.PI / 80000);
  skybox.rotateX(Math.PI / 80000);
  skybox.rotateZ(Math.PI / 80000);

  moon.rotateZ(Math.PI / 80000);

  // for ( let i = 0; i < water.geometry.attributes.position.count; i ++ ) {

  //   const y = 350 * Math.sin( i / 2 );
  //   water.geometry.attributes.position.setY( i, y );

  // }
  
}

