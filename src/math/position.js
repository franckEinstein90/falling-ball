
const ErrorCodes = (()=>{

    return {

        invalidArray : 'Invalid array' 
    } ; 

})() ; 

class Point {

    constructor( posArray, options ){

        if(!posArray) throw ErrorCodes.invalidArray ; 
        if( !(Array.isArray(posArray)) ) throw ErrorCodes.invalidArray ;
        if( posArray.length === 0 ) throw ErrorCodes.invalidArray ; 
        if(posArray.filter( n => typeof n !== 'number').length > 0) throw ErrorCodes.invalidArray ; 
        this.dimension = (options && options.arity)
            ? options.arity
            : posArray.length ; 

        this.values = [...posArray] ; 
        this.values.length = this.dimension ; 
    }

    toObject( str ){
        const keys = str.split('');
        const returnObject = {}; 
        this.values.forEach( (val, idx) => {
            returnObject[keys[idx]] = val; 
        });
        return returnObject ; 
    }
}

class Vector3 extends Point{

    constructor( posArray, keyString ){
        super( posArray, {arity:3} ) ; 
        this.keyString = keyString || 'xyz'  ; 
    }
    
    toObject( ){
        return super.toObject( this.keyString ) ; 
    }

}

module.exports = {
    ErrorCodes, 
    Point,
    Vector3 
}


