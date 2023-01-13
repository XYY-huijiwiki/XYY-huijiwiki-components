const fs = require('fs');
const XLSX = require('xlsx');

let org = fs.readFileSync('src/c.json');
// org = [JSON.parse(org)[0],JSON.parse(org)[1],JSON.parse(org)[2]]

org = JSON.parse(org)


// org.forEach((element, index) => {
// delete org[index]['_id']
// });
let list = ['编剧', '导演', '地区', '音频', '字幕']

list.forEach(key => {
    org.forEach((element, index) => {
        if (element[key]) {
            if (!Array.isArray(element[key])) {
                org[index][key] = element[key].split(/[\s、]/)
            }
            org[index][key].forEach((abc,ind) => {
                org[index][key][ind] = abc.replace('等',"")
            });
        } else {
            org[index][key] = []
        }
    });
});
org = JSON.stringify(org)

fs.writeFileSync('src/c.json', org)

// let id = org.match(/(\d+).html/)[1]
//     console.log('id='+id);


// let new_one = []

// org.forEach((element, index) => {
//     new_one[index] = {
//         'title': element._id,
//         'contemt': JSON.stringify(element)
//     }
// });

// let worksheet = XLSX.utils.json_to_sheet(new_one);
// let workbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
// XLSX.writeFile(workbook, `1.xlsx`);
