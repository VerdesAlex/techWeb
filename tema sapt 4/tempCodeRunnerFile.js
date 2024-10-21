function charCounter(string, char){
    let c=0;
    for(var i=0; i<string.length; i++){
        if(string[i] == char)
            c++;
    }   
    return c;
}

function rle(string,bool = true){
    let vCompr = [];
    if(bool === true){
        for (let i=0; i < string.length - 1; i++){
            if(i == string.indexOf(string[i])){
                vCompr.push(string[i]);
                vCompr.push(charCounter(string, string[i]));
            }
        }
    }
    else{
        for (const chr in string){
            if(chr%2 == 0){
                for (let i=0; i<string[chr]; i++){
                    vCompr.push(string[chr-1]);
                }
            }
        }
    }
    
    return vCompr.join("");
}

// aaaavvvssss



const str = "aaaavvvssss";
const mapi = rle(str);
// const mapi = str.split('');
console.log(mapi);
// for (const [key, val] of mapi){
//     console.log(key, val);
// }
