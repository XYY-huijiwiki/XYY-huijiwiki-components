const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sleep = require('await-sleep');

(async (id) => {

    let reload = 1;     //初始化reload
    fs.writeFileSync(path.join(__dirname, `优酷剧情简介（id：${id}）.html`), '');   //初始化html

    do {
        let res = await axios.get(`https://list.youku.com/show/point?id=${id}&stage=reload_${reload}&callback=a`);
        res = res['data'].slice(14, -2);
        res = JSON.parse(res);
        // console.log(res);
        if (res.error === 1) {
            console.log(`导出完成，请查看文件：优酷剧情简介（id：${id}）.html`);
            break;
        }
        console.log(`正在加载第${reload}~${reload + 9}集的剧情简介……`);
        reload = reload + 10;
        res = res['html'];
        fs.writeFileSync(path.join(__dirname, `优酷剧情简介（id：${id}）.html`), res, { flag: 'a' });
        await sleep(1500);
    } while (true);

})(614193);
