


const physicsEnv = ( { Ammo, gravity} )=>{

    const collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration() ;
    const dispatcher              = new Ammo.btCollisionDispatcher( collisionConfiguration ) ; 
    const overlappingPairCache    = new Ammo.btDbvtBroadphase() ; 
    const solver                  = new Ammo.btSequentialImpulseConstraintSolver();
    const tmpTrans                = new Ammo.btTransform(); 
    const rigidBodies             = []; 

    const world = new Ammo.btDiscreteDynamicsWorld(
        dispatcher, 
        overlappingPairCache, 
        solver, 
        collisionConfiguration ) ;
    
    world.setGravity( new Ammo.btVector3(gravity.x, gravity.y, gravity.z) ) ;

    return {
        world, 
        tmpTrans, 
        rigidBodies
    } ; 
} ;

module.exports = {
    physicsEnv 
} ; 