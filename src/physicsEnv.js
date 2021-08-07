const physicsEnv = ()=>{

    const collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration() ;
    const dispatcher              = new Ammo.btCollisionDispatcher( collisionConfiguration ) ; 
    const overlappingPairCache    = new Ammo.btDbvtBroadphase() ; 
    const solver                  = new Ammo.btSequentialImpulseConstraintSolver();

    const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher, 
        overlappingPairCache, 
        solver, 
        collisionConfiguration);

    physicsWorld.setGravity(new Ammo.btVector3(0, -150, 0));
    return physicsWorld ; 

} ;