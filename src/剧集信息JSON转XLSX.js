const fs = require('fs');
const XLSX = require('xlsx');

let org = fs.readFileSync('src/羊羊百科剧集信息.json');
org = JSON.parse(org)
let new_one = []

org.forEach((element, index) => {
    new_one[index] = {title:'',content:''}
    new_one[index]['title'] = element['_id']
    delete element['_id']
    new_one[index]['content'] = JSON.stringify(element)
});


org.forEach(element => {
    Object.keys(element).forEach(key => {
        if (typeof element[key] === 'object') {
            element[key] = JSON.stringify(element[key]);
        };
    });
});

let worksheet = XLSX.utils.json_to_sheet(new_one);
XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "A1" });
XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "B1" });
let workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
XLSX.writeFile(workbook, `org.xlsx`);