import Movements from "./movements.js";
import blockchain from "./Web3.js";
import abi from "./abi/abi.json" assert {type: "json"};


//Declaration of a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

//Camera and renderer configuration
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Setting the scene lights
const ambient_light = new THREE.AmbientLight(0xbda355);
const direction_light = new THREE.DirectionalLight(0x00ffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

//Setting up a flat space of the Metaverse
const geometry_space = new THREE.BoxGeometry(100,0.2,50);
const material_space = new THREE.MeshPhongMaterial({color: 0x0d0d0d});
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);


//Geometric figure to be represented in the Metaverse: Cube
const geometry = new THREE.BoxGeometry( 4, 4 , 4);
const material = new THREE.MeshPhongMaterial( { color: 0x77773c} );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(8,3,20);
scene.add( cube );

//Geometric figure to be represented in the Metavrse: Cone
const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xff4da6} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10, 10, 0);
scene.add( cone );

const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cylinder = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
cylinder.position.set(20, 11 , 0);
scene.add( cylinder );

camera.position.set(10, 5, 40);

//animation of the objetcs

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x +=0.01;
    


    requestAnimationFrame( animate );
    
  //Movement to the left
    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5;

  }
    
  //Upward movement
  if (Movements.isPressed(38)) {
      camera.position.x += 0.5;
      camera.position.y += 0.5;
  }
  
  //Movement to the right
  if (Movements.isPressed(39)) {
    camera.position.x += 0.5;
    }
   //Downward movement
  if (Movements.isPressed(40)) {
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
} 

camera.lookAt(space.position);
renderer.render( scene, camera );
}

animate();

//New NFT
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);

function mintNFT(){
//Parameters to create a NFT in the Metaverse
var nft_name = document.getElementById("nft_name").value;
var nft_width = document.getElementById("nft_width").value;
var nft_height = document.getElementById("nft_height").value;
var nft_depth = document.getElementById("nft_depth").value;
var nft_x = document.getElementById("nft_x").value;
var nft_y = document.getElementById("nft_y").value;
var nft_z = document.getElementById("nft_z").value;

//if metamask is not available
if (typeof window.ethereum == "undefined") {
  rej("You should install Metamask to use it!");
      }

 //web3 instance
 let web3 = new Web3(window.ethereum);
 let contract = new web3.eth.Contract(abi, "0xD82547E7E826Fe6CEf024A45dc476f07ae8b302D");     
   
 web3.eth.getAccounts().then((accounts) => {
      contract.methods.mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z).send({ from: accounts[0] }).then((data) => {
      console.log("NFT available in the Metaverse!");
       
      });

 });

};



//Web3 connection to the data generated in the Blockchain to be
//represented in the Metaverse

blockchain.then((result) => {
  //for each building paid fot in the Smart contract,
  // a graphical representation is made in the Metaverse

  result.building.forEach((building, index) => {
    if(index <= result.supply) {
      
      //Representation of nft tokens as boxes
      const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
      const boxMaterial = new THREE.MeshPhongMaterial({color: 0x33fffc});
      const nft = new THREE.Mesh(boxGeometry, boxMaterial);
      nft.position.set(building.x, building.y, building.z);
      scene.add(nft);

    }
  })
})




