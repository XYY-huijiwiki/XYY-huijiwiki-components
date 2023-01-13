const fs = require('fs')
const path = require('path')
const axios = require('axios')

// console.log(a);
// console.log(JSON.parse(a)['html']);




var script = document.createElement('script');
script.src = "https://www.unpkg.com/jquery@3.6.3/dist/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

var result = [];
console.log($('.item-intro').text((index, content) => {
    result = result.concat(content);
}));
console.log(result.slice(2).join('\n').replace(/\n{2,}/g, '\n'));