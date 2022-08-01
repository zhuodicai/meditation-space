import * as THREE from 'three';
// import { Water } from 'three/examples/jsm/objects/Water.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';


// let tree;
// let skybox;

let points;

export function createEnvironment(scene) {
  console.log('Adding environment');
  
  //Ground
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 1500, 1500 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.rotation.x = - Math.PI / 2;
  plane.position.set(0, -50, -100);
  scene.add( plane );
  plane.receiveShadow = true;
  plane.visible = false;


  //bunny
  new STLLoader().load(
      'assets/bunny.stl',
      function (geometry) {
          const bunnyMaterial = new THREE.MeshBasicMaterial( {
            color: 'rgb(0,0,0)',
            side:THREE.DoubleSide,
            // transparent: true,
            // opacity: 0.2
          } );
          const bunny = new THREE.Mesh(geometry, bunnyMaterial);
          bunny.rotateX( - Math.PI / 2);
          bunny.position.set(-20, -50, 0);
          bunny.castShadow = true;
					bunny.receiveShadow = true;
          scene.add(bunny);

          const wireframe = new THREE.WireframeGeometry( geometry );
          const line = new THREE.LineSegments( wireframe );
          line.material.depthTest = true;
          line.material.opacity = 0.8;
          line.material = new THREE.MeshBasicMaterial( { color: 'white' } );
          line.material.transparent = true;
          line.rotateX( - Math.PI / 2);
          line.position.set(-20, -50, 0);
          scene.add(line);


          const vertices = [];
          const positionAttribute = geometry.getAttribute( 'position' );
          for ( let i = 0; i < positionAttribute.count; i ++ ) {
              const vertex = new THREE.Vector3();
              vertex.fromBufferAttribute( positionAttribute, i );
              vertices.push( vertex );
          }
          const loader = new THREE.TextureLoader();
          const textureP = loader.load('assets/disc.png');
          const pointsMaterial = new THREE.PointsMaterial( {
              color: 'white',
              map: textureP,
              size: 5,
              alphaTest: 0.5,
              // depthWrite: false,
              // depthTest: false
          } );
          const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
          points = new THREE.Points( pointsGeometry, pointsMaterial );
          points.rotateX( - Math.PI / 2);
          points.position.set(-20, -50, 0);
          scene.add( points );
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
          console.log(error);
      }
  );

  //?
  // const geometry = new THREE.TorusGeometry( .7, .2, 10, 15 );
  // const wireframe = new THREE.WireframeGeometry( geometry );
  // const line = new THREE.LineSegments( wireframe );
  // line.material.depthTest = true;
  // line.material.opacity = 0.8;
  // line.material.transparent = true;
  // line.position.x = 0
  // scene.add(line)

  //tree
<<<<<<< Updated upstream
  // new GLTFLoader().load(
  //   'assets/tree.gltf',
  //   function ( gltf ) {
  //     console.log('haha', gltf.scene);
  //     gltf.scene.scale.multiplyScalar(1/30);
  //     for(let x=-20; x<0; x=x+5)
  //     for(let z=-20; z<0; z=z+5) {
  //       if(x*x+z*z > 400){
  //       continue;
  //       }
  //       tree =
  //       gltf.scene.clone();
  //       tree.position.set(x+Math.random()*100, -8, z+Math.random()*100);
  //       tree.rotation.y = Math.PI * 2 *Math.random();
  //       scene.add( tree );
  //     }
  //     console.log('tree is in');
  //   },
  //   function ( xhr ) {
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //   },
  //   function ( error ) {
  //     console.log( 'An error happened', error );
  //   }
  // );
=======
  new GLTFLoader().load(
    'assets/tree.gltf',
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
>>>>>>> Stashed changes

  

  //sky
  // let materialArray=[];
  // const skyTexture_ft = new THREE.TextureLoader().load('assets/sky1.png');
  // const skyTexture_bk = new THREE.TextureLoader().load('assets/sky2.png');
  // const skyTexture_up = new THREE.TextureLoader().load('assets/sky3.png');
  // const skyTexture_dn = new THREE.TextureLoader().load('assets/sky4.png');
  // const skyTexture_rt = new THREE.TextureLoader().load('assets/sky5.png');
  // const skyTexture_lf = new THREE.TextureLoader().load('assets/sky6.png');
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_ft}));
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_bk}));
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_up}));
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_dn}));
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_rt}));
  // materialArray.push(new THREE.MeshBasicMaterial({map:skyTexture_lf}));
  // for (let i = 0; i < 6; i++)
  // materialArray[i].side = THREE.BackSide;
  // const skyboxGeo = new THREE.BoxGeometry(1500, 1500, 1500);
  // skybox = new THREE.Mesh(skyboxGeo,materialArray);
  // scene.add(skybox);



  // water
  // const waterGeometry = new THREE.PlaneGeometry( 800, 800, 64,64 );
  // water = new Water(
  //   waterGeometry,
  //   {
  //     textureWidth: 1000,
  //     textureHeight: 1000,
  //     waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

  //       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  //     } ),
  //     // sunDirection: new THREE.Vector3(),
  //     sunColor: 'white',
  //     waterColor: 0x00000c,
  //     // waterColor: 'white',
  //     distortionScale: 0,
  //     fog: scene.fog !== undefined,
  //     size : 0.1
  //   }
  // );
  // console.log(water.geometry.attributes.position,'im waaaaaaater');
  // // water.rotation.x = - Math.PI / 2;
  // water.rotateX( - Math.PI / 2);
  // water.position.set(-120,-5,50);
  // scene.add( water );


  //moon
  // const geometryM = new THREE.SphereGeometry( 50, 32, 16 );
  // // const materialM = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  // const loaderM = new THREE.TextureLoader();
  // const textureM = loaderM.load('assets/moon.jpeg');
  // const materialM = new THREE.MeshStandardMaterial({
  // // color:'gray',
  // // color:'rgb(22,24,31)',
  // color:0xffffff,
  // side: THREE.DoubleSide,
  // map: textureM,
  // emissive: textureM
  // });
  // moon = new THREE.Mesh( geometryM, materialM );
  // moon.position.set(-50, -5, -200);
  // scene.add( moon );

}



// eslint-disable-next-line
export function updateEnvironment(scene) {
  // skybox.rotateY(Math.PI / 80000);
  // skybox.rotateX(Math.PI / 80000);
  // skybox.rotateZ(Math.PI / 80000);

  // moon.rotateZ(Math.PI / 80000);

  // for ( let i = 0; i < water.geometry.attributes.position.count; i ++ ) {

  //   const y = 350 * Math.sin( i / 2 );
  //   water.geometry.attributes.position.setY( i, y );
  // }
}
