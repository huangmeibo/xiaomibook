var homeData = require('./home/home.json');
var recommed1 = require('./home/recommend1.json');
var recommed2 = require('./home/recommend2.json');
var recommed3 = require('./home/recommend3.json');
var searchKey = require('./search/searchKey.json');
var searchData = require('./search/search.json');
var data = require('./detail/352876.json');
var data1 = require('./reader/data1.json');
var data2 = require('./reader/data2.json');
var data3 = require('./reader/data3.json');
var data4 = require('./reader/data4.json');
var chapterList = require('./reader/chapter-list.json');
var objData = {
    "/book/index": homeData,
    "/book/list?page=1": recommed1,
    "/book/list?page=2": recommed2,
    "/book/list?page=3": recommed3,
    "/book/searchKey": searchKey,
    "/book/search": searchData,
    "/book/data": data,
    "/book/reader?step=1": data1,
    "/book/reader?step=2": data2,
    "/book/reader?step=3": data3,
    "/book/reader?step=4": data4,
    "/book/chapterList": chapterList
}
module.exports = function(url) {

    if (/\/book\/search\?/.test(url)) {
        url = "/book/search"
    } else if (/\/book\/detail\?/.test(url)) {
        url = "/book/search"
    } else if (/\/book\/data\?/.test(url)) {
        url = "/book/data"
    }

    return objData[url];
}