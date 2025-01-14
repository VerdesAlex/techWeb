function isShallowEqual(obj1, obj2, props) {
    // TODO
    if(typeof obj1 !== 'object'){
        throw new Error('First input should be an object');
    }
    if(!Array.isArray(props)){
        throw new Error('Third input should be an array');
    }


    //si asta merge
    // props.forEach(element => {
    //     if(typeof element !== 'string')
    //     throw new Error('Each element should be a string');
    // });
    
    //sau
    if(!props.every((prop)=>typeof prop === 'string')){
        throw new Error('Each element should be a string');
    }


//testan asta first
    return props.every((key)=>obj1[key] === obj2[key]);



    let same = true; //true
    props.forEach(property=>{
        if(obj1[property] != obj2[property]){
            return false;
        }
    });
    return true;
}

const app = {
    isShallowEqual
}

module.exports = app