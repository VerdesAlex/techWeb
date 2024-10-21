function charCounter(string, char){
    let c=0;
    for(var i=0; i<string.length; i++){
        if(string[i] == char)
            c++;
    }   
    return c;
}

function isStringObject(obj) {
    return obj instanceof String;
  }

function rle(string,bool = true){
    if((typeof(string)=="string" || isStringObject(string)==true) && typeof(bool)=="boolean"){

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
                if(chr%2 == 1){
                    for (let i=0; i<string[chr]; i++){
                        vCompr.push(string[chr-1]);
                    }
                }
            }
        }
        
        return vCompr.join("");
    }
    else{
        throw new Error("Invalid Type");
    }
}

// aaaavvvssss
//a4v3s4


const str1 = "aaaavvvssss";
const rez1 = rle(str1,true);
console.log("Test 1 - aaaavvvssss(string primitiva), true :\n" + rez1);

const str2 = "aaaavvvssss";
const rez2 = rle(str2);
console.log("\nTest 2 - aaaavvvssss(string primitiva), default :\n\n" + rez2);

const str3 = new String("aaaavvvssss");
const rez3 = rle(str3,true);
console.log("\nTest 3 - aaaavvvssss(string object), true :\n\n" + rez3);

const str4 = "";
const rez4 = rle(str4);
console.log("\nTest 4 - string vid, default :\n\n" + rez4);

const str5 = "a4v3s4";
const rez5 = rle(str5, false);
console.log("\nTest 5 - a4v3s4(string primitiva), false :\n\n" + rez5  + "\n\n");

const str6 = 12;
const rez6 = rle(str6);
console.log("\nTest 6 - non string data type (numeric), default :\n\n" + rez6);

const str7 = "aaaavvvssss";
const rez7 = rle(str7, 12);
console.log("\nTest 7 - aaaavvvssss(string primitiva), non boolean data type :\n\n" + rez7);