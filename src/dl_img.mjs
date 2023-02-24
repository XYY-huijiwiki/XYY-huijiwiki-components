import got from 'got';
import { readFileSync, createWriteStream, readdirSync } from 'fs';
import { mkdirSync } from './mkdir.js';
import sleep from 'await-sleep';
import { join } from 'path';

let json = readFileSync('./src/response.json', { encoding: 'utf-8' });

let downloadList = [];

JSON.parse(json).drawList.forEach(element => {
    downloadList.push('http://www.22dm.com' + element.json.originalPath);
    downloadList.push('http://www.22dm.com' + element.json.squashPath);
});

(async () => {
    for (let index = 0; index < downloadList.length; index++) {
        let element = downloadList[index];
        let dirName = './draw/upload/' + element.split('/')[7];
        let fileName = element.split('/')[8];
        // console.log(fileName);
        // console.log(dirName);

        if (readdirSync(dirName).includes(fileName)) {
            console.log('跳过' + element);
            continue;
        }

        mkdirSync(dirName);
        got.stream(element).pipe(createWriteStream(join(dirName, fileName), { flags: 'w+' }));
        console.log('正在下载' + element);
        await sleep(100);
    }
})();