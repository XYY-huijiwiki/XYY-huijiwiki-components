import fs from 'fs';

let list = fs.readdirSync(new URL('mp3', import.meta.url),);
// console.log(list);

list.forEach(element => {
    let a = fs.readFileSync(new URL('json/' + element.replace('.mp3', '.json'), import.meta.url));
    a = JSON.parse(a);
    console.log(a._name);
    fs.copyFileSync(new URL('mp3/' + element, import.meta.url), new URL('mp33/' + a._name + '.mp3', import.meta.url));
});