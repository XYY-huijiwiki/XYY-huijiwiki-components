//加载CSS
GM_addStyle(GM_getResourceText('css'));

//防止jQuery冲突
$.noConflict();
jQuery(document).ready(function ($) {

    $("body").append(GM_getResourceText(`html`));
    //初始化
    (async () => {
        console.log('[羊羊百科小助手]正在加载Vue……');
        await $.getScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.global.js');
        console.log('[羊羊百科小助手]正在加载Naive UI……');
        await $.getScript('https://cdn.jsdelivr.net/npm/naive-ui/dist/index.prod.js');
        // console.log('[羊羊百科小助手]正在加载spark-md5……');
        // await $.getScript('https://cdn.jsdelivr.net/npm/spark-md5/spark-md5.min.js');
        // console.log('[羊羊百科小助手]正在加载axios……');
        // await $.getScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
        console.log('[羊羊百科小助手]正在启动程序……');
        await initVue();
        console.log('[羊羊百科小助手]启动完成。');
    })();

    //启动Vue
    function initVue() {

        // 配置Vue程序
        const App = {
            setup() {

                // 导入功能组件和定义变量
                const darkTheme = naive.darkTheme;
                const zhCN = naive.zhCN;
                osThemeRef = naive.useOsTheme();
                const resCode = Vue.ref('');
                const productItem = Vue.ref({
                    pagename: '',
                    price: '',
                    date: '',
                    feat: '',
                    ifImgDownload: false
                });

                //判断当前网站
                let currentSite = "";
                if (location.href.match(/www.youtube.com\/playlist*/)) { currentSite = "优兔"; }
                if (location.href.match(/item.taobao.com\/item.htm*/)) { currentSite = "淘宝"; }
                if (location.href.match(/detail.tmall.com\/item.htm*/)) { currentSite = "天猫"; }

                //功能1：获取优兔播放列表
                function getYouTubeList(type) {

                    console.log('正在获取优兔播放列表……');

                    // 等待div#primary准备就绪
                    if ($('div#primary').text() === '') {
                        resCode.value = `网页未加载完成。请等待网页加载完毕后再试。`;
                    } else {

                        let res = {
                            link: [],
                            title: [],
                            wiki: []
                        };
                        $("a#video-title").each((index, ele) => {
                            let link = 'https://youtu.be/' + $(ele).attr('href').match(/v=(.*?)&/)[1];
                            let title = $(ele).attr('title') + ` - YouTube`;
                            let wiki = `[${link} ${title}]`;
                            res['link'] = res['link'].concat(link);
                            res['title'] = res['title'].concat(title);
                            res['wiki'] = res['wiki'].concat(wiki);
                        });

                        resCode.value = res[type].join('\n');
                    }

                }

                //功能2：获取淘宝商品信息
                async function getTaobaoItem(pagename, price, date, feat, ifImgDownload) {

                    pagename = pagename || '页面名称';
                    price = price || $('#J_StrPrice>.tb-rmb-num').text();
                    let link = `https://item.taobao.com/item.htm?id=${g_config.itemId}`;
                    let img = g_config.idata.item.auctionImages;

                    //加载品牌信息
                    let brand = (JSON.parse(GM_getResourceText('json')))['Taobao2Brand'][g_config.shopName] || '';

                    //加载主题信息
                    let series = (JSON.parse(GM_getResourceText('json')))['series'];
                    let defaultFeat = '';
                    series.forEach(element => {
                        if (g_config['idata']['item']['title'].includes(element)) {
                            defaultFeat = element;
                        }
                    });
                    feat = feat || defaultFeat;

                    //收集颜色分类的图片
                    $('#J_isku .J_TSaleProp a').each((index, ele) => {
                        img = img.concat($(ele).attr('style').replace('background:url(', '').replace('_30x30.jpg) center no-repeat;', ''));
                    });
                    //加上https前缀并去除重复图片
                    img.forEach((ele, index) => {
                        img[index] = ele.replace(/\/\/gd\d./, 'https://gd1.');
                    });
                    img = Array.from(new Set(img));
                    //排序和下载图片
                    let imgNameList = [];
                    img.forEach((ele, index) => {
                        if (ifImgDownload) { GM_download(ele, pagename + (index + 1) + ele.slice(-4)); }
                        imgNameList = imgNameList.concat(pagename + (index + 1) + ele.slice(-4));
                    });
                    let imgNameStr = imgNameList.join('\n');


                    //加载长图
                    let longImg = []; //长图的链接列表
                    let longImgList = []; //长图的文件名列表
                    let longImgStr = ''; //长图的文件名字符串
                    // 等待#J_DivItemDesc img准备就绪
                    (function () {
                        if ((!$('#J_DivItemDesc img').length) || $('#J_DivItemDesc img:last').attr('data-src')) {
                            setTimeout(arguments.callee, 3000);
                            console.log('正在等待#J_DivItemDesc img就绪');
                        } else {
                            console.log('#J_DivItemDesc img已就绪');
                            waitDesc();
                        }
                    })();
                    //加载长图
                    function waitDesc() {

                        $('#J_DivItemDesc img').each((index, ele) => {
                            longImg = longImg.concat('https:' + $(ele).attr('src'));
                        });
                        console.log(longImg);

                        //排序和下载长图
                        longImg.forEach((ele, index) => {
                            if (ifImgDownload) { GM_download(ele, pagename + ' 描述图' + (index + 1) + ele.slice(-4)); }
                            longImgList = longImgList.concat(pagename + ' 描述图' + (index + 1) + ele.slice(-4));
                        });
                        longImgStr = longImgList.join('|');

                        //等待长图加载完毕后输出结果
                        resCode.value = `{{周边信息\n|版权=\n|尺寸=\n|定价=${price}元\n|货号=\n|链接（京东）=\n|链接（乐乎市集）=\n|链接（奇货）=\n|链接（淘宝）=${link}\n|链接（天猫）=\n|链接（玩具反斗城）=\n|品牌=${brand}\n|日期=${date}\n|适龄=\n|条码=\n|主题=${feat}\n}}\n\n<gallery>\n${imgNameStr}\n</gallery>\n\n{{长图|${longImgStr}}}\n`;

                    }

                }

                //功能3：获取天猫商品信息
                async function getTianmaoItem(pagename, price, date, feat, ifImgDownload) {

                    pagename = pagename || '页面名称';
                    price = price || $('[class^=Price--originPrice] [class^=Price--priceText--2nLbVda]').text();

                    //加载主题信息
                    let series = (JSON.parse(GM_getResourceText('json')))['series'];
                    let defaultFeat = '';
                    series.forEach(element => {
                        if (($('[class^=ItemHeader--mainTitle]').text()).includes(element)) {
                            defaultFeat = element;
                        }
                    });
                    feat = feat || defaultFeat;

                    //加载品牌信息
                    let brand = (JSON.parse(GM_getResourceText('json')))['Tianmao2Brand'][($('[class^=ShopFloat--title]').text())] || '';

                    //加载链接信息
                    let link = 'https://detail.tmall.com/item.htm?id=' + $('#aliww-click-trigger').attr('data-item');

                    //加载描述图
                    let longImgList = [];
                    $('.descV8-richtext p img').each((index, ele) => {
                        longImgList = longImgList.concat($(ele).attr('src'));
                        console.log(longImgList);
                    });
                    //生成文件名
                    let longImgNameList = [];
                    longImgList.forEach((element, index) => {
                        longImgNameList[index] = pagename + " 描述图" + (index + 1) + element.slice(-4);
                        if (ifImgDownload) { GM_download(element, longImgNameList[index]); }
                    });
                    let longImgNameStr = longImgNameList.join('|');

                    //加载主图
                    let imgList = [];
                    $('[class^=PicGallery--thumbnailPic]').each((index, ele) => {
                        imgList = imgList.concat($(ele).attr('src'));
                    });
                    $('.skuIcon').each((index, ele) => {
                        imgList = imgList.concat($(ele).attr('src'));
                    });
                    //加上https前缀，去除图片压缩后缀，去除重复图片
                    imgList.forEach((element, index) => {
                        imgList[index] = 'https:' + element.replace('_110x10000Q75.jpg_.webp', '').replace('_60x60q50.jpg_.webp', '');
                        // let blob = axios.get(imgList[index]);
                        // console.log(SparkMD5.hash(blob.data));
                    });
                    imgList = Array.from(new Set(imgList));
                    //生成文件名
                    let imgNameList = [];
                    imgList.forEach((element, index) => {
                        imgNameList[index] = pagename + (index + 1) + element.slice(-4);
                        if (ifImgDownload) { GM_download(element, imgNameList[index]); }
                    });
                    let imgNameStr = imgNameList.join('\n');

                    //等待长图加载完毕后输出结果
                    resCode.value = `{{周边信息\n|版权=\n|尺寸=\n|定价=${price}\n|货号=\n|链接（京东）=\n|链接（乐乎市集）=\n|链接（奇货）=\n|链接（淘宝）=\n|链接（天猫）=${link}\n|链接（玩具反斗城）=\n|品牌=${brand}\n|日期=${date}\n|适龄=\n|条码=\n|主题=${feat}\n}}\n\n<gallery>\n${imgNameStr}\n</gallery>\n\n{{长图|${longImgNameStr}}}\n`;

                }

                // 手动暴露Vue参数
                return {
                    showDrawer: Vue.ref(false),
                    resCode,
                    currentSite,
                    productItem,
                    getYouTubeList,
                    getTaobaoItem,
                    getTianmaoItem,
                    darkTheme,
                    zhCN,
                    theme: Vue.computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
                    osTheme: osThemeRef
                };
            }


        };

        // 启动Vue
        const app = Vue.createApp(App);
        app.use(naive);
        app.mount('#XYY-huiji-wiki-helper');
    }

});