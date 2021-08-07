const Vector3 = require('../src/math/position').Vector3;
const pErrors = require('../src/math/position').ErrorCodes ; 
const expect = require('chai').expect ;

describe("Vector3", ()=>{
    it("Can be cloned into ", ()=>{
        const vect  = new Vector3([3,4,5]) ; 
        const vect2 = new Vector3([3,4,5], 'abc') ; 

        expect( vect.toObject() ).to.eql({x:3, y:4, z:5}) ; 
        expect( vect2.toObject() ).to.eql({a:3, b:4, c:5}) ;  
    })
}) ; 
