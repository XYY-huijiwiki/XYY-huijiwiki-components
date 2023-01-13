const axios = require('axios').default
const fs = require('fs')
const XLSX = require('xlsx')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function a(id) {
    var page = 1
    var list_array = []
    do {
        var a = await axios.get(`https://pcweb2.api.mgtv.com/episode/list?video_id=${id}&page=${page}`)
        page++
        console.log(`page=${a[`data`][`data`][`current_page`]}`)
        list_array = list_array.concat(a[`data`][`data`][`list`])
    }
    while (a[`data`][`data`][`total_page`] != a[`data`][`data`][`current_page`])
    let worksheet = XLSX.utils.json_to_sheet(list_array)
    let workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates")
    XLSX.writeFile(workbook, `result.xlsx`)
    console.log('没有报错的话应该就是完成了。');
}

// a('2957883')

readline.question('请输入芒果TV中第一集的网址：\n', URL => {
    let id = URL.match(/(\d+).html/)[1]
    console.log('id='+id);
    a(id)
    readline.close();
});