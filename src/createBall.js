

const _ball = ( options )=>{
    const radius = options.radius || 2 ;
    const pos = options.position || {
        x : 0, 
        y : 20, 
        z : 0
    } ; 

    const ball = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius), 
        new THREE.MeshPhongMaterial({color: 0x00ff05})) ;

    ball.position.set(pos.x, pos.y, pos.z) ;
    ball.castShadow = true ;
    ball.receiveShadow = true ;

    return {
        mesh : ball , 
        radius
    }
} ; 


function createBall( options ){
               
    const physicsWorld = options.physicsWorld ; 
    const mass = options.mass || 1 ; 

    const pos = {
        x : 0, 
        y : 30, 
        z : 0
    } ; 

    const ball = _ball( {
        radius   : 3 , 
        position : pos 
    } ) ;
    
    
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let transform = new Ammo.btTransform();
    
//    scene.add( ball.mesh ) ;
    //Ammojs Section
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );



    let motionState = new Ammo.btDefaultMotionState( transform );
    let colShape = new Ammo.btSphereShape( ball.radius );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );
    physicsWorld.addRigidBody( body );
    ball.mesh.userData.physicsBody = body;
    rigidBodies.push( ball.mesh );
    return {
        mesh : ball.mesh 
    }


}