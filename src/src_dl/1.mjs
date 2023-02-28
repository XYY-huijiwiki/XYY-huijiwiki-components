import got from 'got';
import fs from 'fs';
import path from 'path';

const domain = 'http://www.22dm.com/act/h5/city/';
const localPath = './src/src_dl/';

// let a = fs.readFileSync(path.join(localPath, 'project.json'));
// a = JSON.parse(a);
// a = a.jsList;
// console.log(a);

let a = [
    "src/resource.js",
    "src/define.js",
    "src/Manager/ActionManager.js",
    "src/Manager/GameManager.js",

    "src/Scene/MainMenu/MainMenu.js",
    "src/Scene/MainMenu/Layer/Background.js",
    "src/Scene/MainMenu/Layer/UI.js",

    "src/Scene/GamePlay/GamePlay.js",
    "src/Scene/GamePlay/Layer/Background.js",
    "src/Scene/GamePlay/Layer/UI.js",
    "src/Scene/GamePlay/Layer/Sign.js"
];

a.forEach((element, index) => {
    let path = domain + element;
    got.stream(path).pipe(fs.createWriteStream(localPath + element));
});