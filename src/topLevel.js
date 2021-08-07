const setupGraphics = require('./graphics').setupGraphics ;
const physicsEnv = require('./physicsEnv').physicsEnv ;
const platform = require('./platform').platform ; 
const createBall = require('./createBall').createBall ; 
const THREE = require('./three');
const Ammo = require('./ammo'); 

const start = ( {
    Ammo,
    scene,
    camera, 
    renderer,  
    rigidBodies
 }) => {


    const gravity   = new Ammo.btVector3(0, -150, 0) ;
    const clock     = new THREE.Clock();
    const physics   = physicsEnv( {Ammo,gravity} );
    const stopBlock = platform( physics.world );

    const ball = createBall( {
        rigidBodies, 
        physicsWorld : physics.world, 
        mass:3
    });
    
    scene.add( stopBlock.mesh ) ; 
    scene.add( ball.mesh ) ; 
    renderFrame( {
        scene, 
        physics, 
        camera,
        renderer,  
        clock,
        rigidBodies
    }) ;
} ; 
        
const renderFrame = ( options )=>{

    const physics = options.physics ; 
    const scene = options.scene ;
    const renderer = options.renderer ;  
    const camera = options.camera ; 
    const clock = options.clock ; 
    const rigidBodies = options.rigidBodies ; 
    let deltaTime = clock.getDelta();
    updatePhysics( deltaTime, physics.world, rigidBodies, physics.tmpTrans );
    renderer.render( scene, camera );
    requestAnimationFrame( _ => renderFrame( options ) );

}


const updatePhysics = ( deltaTime, physicsWorld, rigidBodies, tmpTrans )=>{
    // Step worlconst THREE = require('./three');d

    physicsWorld.stepSimulation( deltaTime, 10 );
    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {
        let objThree = rigidBodies[ i ];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( tmpTrans );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }
}


$( document ).ready(function() {

    const {scene, camera, renderer} = setupGraphics() ; 
    const rigidBodies = []
            //Ammojs Initialization
    return Ammo()
        .then( Ammo =>start({
            Ammo,
            scene, 
            camera, 
            renderer,  
            rigidBodies})) ; 

 
});