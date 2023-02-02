import fs from 'fs';

let list = fs.readdirSync(new URL('raw-assets', import.meta.url));
// console.log(list);

list.forEach(element => {
    let sublist = fs.readdirSync(new URL('raw-assets/' + element, import.meta.url));
    // console.log(sublist);
    sublist.forEach(subElement => {
        try {
            fs.copyFileSync(new URL('raw-assets/' + element + '/' + subElement, import.meta.url), new URL('file/' + subElement, import.meta.url));
        }
        catch (err) { console.error(element+ '/' +subElement); }
    });
});