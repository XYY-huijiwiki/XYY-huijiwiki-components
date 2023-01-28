const fs = require('fs');
const path = require('path');

// 需要批量替换的文件位置
let txt_list = fs.readdirSync(path.join(__dirname, 'wikitext'))

// 开始替换
txt_list.forEach(element => {
    console.log(element);
    let txt_content = fs.readFileSync(path.join(__dirname, 'wikitext', element), { encoding: 'utf8' })
    txt_content = txt_content.replace(`[[分类:运动篇]]`, ``)
    // txt_content = txt_content.replace(`{{智趣羊学堂}}`, `{{导航}}\n\n==参考资料==\n{{参考资料}}`)
    txt_content = txt_content.replace(`{{智趣羊学堂}}`, `{{导航}}`)
    txt_content = txt_content.replace(`{{智趣羊学堂|不折叠}}`, `{{导航}}`)
    txt_content = txt_content.replace(/[\n\r]{3}/g, `\r\r`)
    txt_content = txt_content.replace(/[\n\r]{3}/g, `\r\r`)
    txt_content = txt_content.replace(/[\n\r]{3}/g, `\r\r`)
    txt_content = txt_content.replace(/[\n\r]{3}/g, `\r\r`)
    txt_content = txt_content.replace(/智趣羊学堂 /, `智趣羊学堂`)
    fs.writeFileSync(path.join(__dirname, 'wikitext-已替换', element), txt_content)
});
