const Point = require('../src/math/position').Point ;
const pErrors = require('../src/math/position').ErrorCodes ; 
const expect = require('chai').expect ; 

describe("Point", ()=>{

    it("Must be created using a non-empty array of number", ()=>{
        expect( ()=> new Point() ).to.throw( pErrors.invalidArray ) ; 
        expect( ()=> new Point(4) ).to.throw( pErrors.invalidArray ) ; 
        expect( ()=> new Point([4,'a']) ).to.throw( pErrors.invalidArray ) ; 
        expect( ()=> new Point([]) ).to.throw( pErrors.invalidArray ) ; 
        expect( ()=> new Point('dfsa') ).to.throw( pErrors.invalidArray ) ; 
    }) ; 

    it('has a dimension, which is the number of elements in the array', ()=>{
        const p = new Point([3,4]); 
        expect(p.dimension).to.eql(2); 
    }) ; 

    it("Keeps its own copy of its original values", ()=>{
        const originalValues = [3,4] ; 
        const p = new Point( originalValues ); 
        expect(p.values).to.eql( originalValues );
        p.values[1] = 2 ; 
        expect(p.values).to.not.eql(originalValues) ; 
    }) ;
    
    it("Restrict to a certain arity", ()=>{
        const originalValues = [3,4,3,5] ; 
        const p = new Point( originalValues, {arity:3} ); 
        expect( p.dimension ).to.eql(3); 
        expect( p.values ).to.eql( [3,4,3]);
    }) ;  

    it("Translate itself into a new object", ()=>{
        const originalValues = [3,4,3,5] ; 
        const p = new Point( originalValues, {arity:3} ); 
        const objectFromPoint = p.toObject('xyz') ;
        expect( objectFromPoint.x).to.eql( 3 );
        expect( objectFromPoint.y).to.eql( 4 );
        expect( objectFromPoint.z).to.eql( 3 );

    }) ;  

}); 