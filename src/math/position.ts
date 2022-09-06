
export const ErrorCodes = (()=>{

    return {
        invalidArray : 'Invalid array' 
    } ; 
})() ; 

export class Point {

    private dimension: number ;
    private values: number[] ;

    constructor(posArray:number[], options: {
        arity?: number
    }){

        if(!posArray) throw ErrorCodes.invalidArray ; 
        if( !(Array.isArray(posArray)) ) throw ErrorCodes.invalidArray ;
        if( posArray.length === 0 ) throw ErrorCodes.invalidArray ; 
        if(posArray.filter( n => typeof n !== 'number').length > 0) throw ErrorCodes.invalidArray ; 

        this.dimension = ('arity' in options && options['arity'] !== undefined) 
            ? options['arity'] 
            : posArray.length ;

        this.values = [...posArray] ; 
        this.values.length = this.dimension ; 
    }

    toObject(str: String): Record<string, number> {
        const keys = str.split('');
        const returnObject = {}; 
        this.values.forEach( (val, idx) => {
            Object.defineProperty(returnObject, keys[idx], val); 
        });
        return returnObject ; 
    }
}

class Vector3 extends Point{

    private keyString: string ;

    constructor(posArray: number[], keyString: string = 'xyz'){
        super(posArray, {arity:3}); 
        this.keyString = keyString; 
    }
    
    toObject( ){
        return super.toObject( this.keyString ) ; 
    }

}

