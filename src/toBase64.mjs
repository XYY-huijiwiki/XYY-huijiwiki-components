import { Base64 } from 'js-base64';
import fs from 'fs';

let a = fs.readFileSync(new URL('to-be-base64ed/2023 京东广告.mp4', import.meta.url));
let b = Base64.encode(a);
console.log(a);
console.log(b);

fs.writeFileSync(new URL('to-be-base64ed/2023 京东广告.mp4.txt', import.meta.url), b);