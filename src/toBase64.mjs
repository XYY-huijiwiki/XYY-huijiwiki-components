import { Base64 } from 'js-base64';
import fs from 'fs';

let a = fs.readFileSync(new URL('to-be-base64ed/2023 京东广告.mp4', import.meta.url));
let b = Base64.encode(a);

let text = b;
let list = new Array;
console.log(list);
let index = 0;
do {
    if (text === '') { break; }
    list[index] = text.substring(0, 1024 * 1024 * 2);
    fs.writeFileSync(new URL('to-be-base64ed/2023 京东广告.mp4.txt' + index, import.meta.url), list[index]);
    text = text.substring(1024 * 1024 * 2);
    index++;
} while (true);
console.log(list);