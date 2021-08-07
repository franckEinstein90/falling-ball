
const physicsEnv = ( { Ammo, gravity} )=>{

    const collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration() ;
    const dispatcher              = new Ammo.btCollisionDispatcher( collisionConfiguration ) ; 
    const overlappingPairCache    = new Ammo.btDbvtBroadphase() ; 
    const solver                  = new Ammo.btSequentialImpulseConstraintSolver();
    const tmpTrans                = new Ammo.btTransform(); 

    const world = new Ammo.btDiscreteDynamicsWorld(
        dispatcher, 
        overlappingPairCache, 
        solver, 
        collisionConfiguration ) ;
    world.setGravity( gravity ) ;

    return {
        world, 
        tmpTrans
    } ; 
} ;

module.exports = {
    physicsEnv 
} ; 