const { Vector3 } = require('./math/position'); 
const setupGraphics = require('./graphics').setupGraphics ;
const physicsEnv = require('./physicsEnv').physicsEnv ;
const platform = require('./platform').platform ; 
const createBall = require('./createBall').createBall ; 
const THREE = require('./three');
const Ammo = require('./ammo'); 

const start = ( {
    Ammo,
    ThreeStack
 }) => {

    const gravity = {x:0, y:-140, z:0} ; 
    const physics       = physicsEnv( { Ammo, gravity} );
    const clock         = new THREE.Clock();
    const stopBlock     = platform( {Ammo, physics}, {position:{ x:-10, y:0, z:0 }});
    const ball = createBall( {
        physics,
        mass:3
    });

    ThreeStack.scene.add( stopBlock.mesh ) ; 
    ThreeStack.scene.add( ball.mesh ) ; 

    return renderFrame( {
        ThreeStack, 
        physics, 
        clock
    }) ;
} ; 
        
const renderFrame = ( options )=>{

    const ThreeStack = options.ThreeStack ; 
    const physics = options.physics ; 
    const clock = options.clock ; 
    const deltaTime = clock.getDelta();

    updatePhysics( {deltaTime, physics}) ;
    ThreeStack.renderer.render( ThreeStack.scene, ThreeStack.camera );
    requestAnimationFrame( _ => renderFrame( options ) );

}

const updatePhysics = ( {deltaTime, physics} )=>{

    physics.world.stepSimulation( deltaTime, 10 );

    physics.rigidBodies.forEach( rigidBody => {
        const objAmmo = rigidBody.userData.physicsBody;
        const ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( physics.tmpTrans );
            let p = physics.tmpTrans.getOrigin();
            let q = physics.tmpTrans.getRotation();
            rigidBody.position.set( p.x(), p.y(), p.z() );
            rigidBody.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
       
    });
} ; 


$( document ).ready(function() {

    const ThreeStack = setupGraphics() ; 
    //Ammojs Initialization
    return Ammo()
        .then( Ammo =>start({
            Ammo,
            ThreeStack
           })) ; 

 
});