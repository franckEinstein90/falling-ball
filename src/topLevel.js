const setupGraphics = require('./graphics').setupGraphics ;
const physicsEnv = require('./physicsEnv').physicsEnv ;
const platform = require('./platform').platform ; 
const createBall = require('./createBall').createBall ; 
const Ammo = require('./ammo'); 

const start = ( {
    scene,
    camera, 
    clock,
    renderer,  
    rigidBodies
 }) => {

    const physicsWorld = physicsEnv();
    console.log(physicsWorld ) ; 
    const stopBlock = platform( physicsWorld );
    const ball = createBall( {
        rigidBodies, 
        physicsWorld, 
        mass:3
    });
    scene.add( stopBlock.mesh ) ; 
    scene.add( ball.mesh ) ; 
    renderFrame( {
        scene, 
        physicsWorld, 
        camera,
        renderer,  
        clock,
        rigidBodies
    }) ;
} ; 
        
const renderFrame = ( options )=>{

    const physicsWorld = options.physicsWorld ; 
    const scene = options.scene ;
    const renderer = options.renderer ;  
    const camera = options.camera ; 
    const clock = options.clock ; 
    const rigidBodies = options.rigidBodies ; 
    let deltaTime = clock.getDelta();

    updatePhysics( deltaTime, physicsWorld, rigidBodies );

    renderer.render( scene, camera );

    requestAnimationFrame( _ => renderFrame( options ) );

}


const updatePhysics = ( deltaTime, physicsWorld, rigidBodies )=>{
    // Step worlconst THREE = require('./three');d

    physicsWorld.stepSimulation( deltaTime, 10 );
    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {
        let objThree = rigidBodies[ i ];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }
}


$( document ).ready(function() {

    const {scene, camera, renderer, clock} = setupGraphics() ; 
    const rigidBodies = []
            //Ammojs Initialization
    Ammo()
        .then( ()=>start({
            scene, 
            camera, 
            clock,
            renderer,  
            rigidBodies})) ; 

 
});