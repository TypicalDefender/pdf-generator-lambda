const fs = require("fs");
let obj = {};

for(let i = 0; i < 200; i++){
    obj[i] = i;
}

fs.writeFileSync("patient.json", JSON.stringify(obj));
