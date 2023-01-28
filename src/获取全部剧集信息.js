const fs = require('fs');
const path = require('path');
const sleep = require('await-sleep');
const axios = require('axios');

(async () => {
    console.log('初始化……');
    let res = [];
    let page = 1;
    do {
        let response = await axios.get(`https://xyy.huijiwiki.com/api/rest_v1/namespace/data?filter=%7B%20%22%E7%B3%BB%E5%88%971%22%3A%7B%22%24exists%22%3Atrue%7D%7D&count=true&pagesize=500&page=${page}&${Date()}`);
        res = res.concat(response['data']['_embedded']);
        console.log(`加载中……（${page * 100 / response['data']['_total_pages']}%）`);
        page++;
        if (page === response['data']['_total_pages']) {
            console.log(`最后处理……`);
            fs.writeFileSync(path.join(__dirname, `羊羊百科剧集信息.json`), JSON.stringify(res), { flag: 'a' });
            break;
        }
        await sleep(1000);
    } while (true);
})();