const headers = {
    'authority': 'www.bilibili.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'
}

async function bilibili(QuickAdd) {
    const vid = await QuickAdd.quickAddApi.inputPrompt(
        "输入Bilibili视频的BV号或AV号："
    );

    let vidTest = vid?.match(/^(av\d+|bv[a-z0-9]+)/i);
    if (vid.length == 0 || vidTest == null) {
        new Notice("视频BV号或AV号错误");
        throw new Error("视频BV号或AV号错误");
    }
    // 获取b站视频信息
    let biliInfo = await getBiliInfo(vid);
    if (!biliInfo) {
        new Notice("获取内容失败");
        throw new Error("获取内容失败");
    }
    new Notice(biliInfo.title + " 笔记已生成！", 2000);
    console.log(biliInfo);
    QuickAdd.variables = {
        ...biliInfo
    };
}

async function getBiliInfo(vid) {
    let baseUrl = "https://api.bilibili.com/x/web-interface/view?";
    let url;
    if (vid.match(/av/i)) {
        url = baseUrl + "aid=" + vid.match(/\d+/)[0];
    } else if (vid.match(/bv/i)) {
        url = baseUrl + "bvid=" + vid;
    }
    let searchUrl = new URL(url);
    const res = await request({
        url: searchUrl.href,
        method: "GET",
        cache: "no-cache",
        headers: headers
    });
    if (!res) {
        return null;
    }
    const resj = JSON.parse(res)
    if (resj.code != 0) {
        new Notice(resj.message);
        throw new Error(resj.message);
    }
    let videoUrl = `https://www.bilibili.com/video/${vid}`

    let parts = "";
    if (resj.data.pages.length != 1) {
        let pages = resj.data.pages
        pages.forEach(e => {
            parts += `[P${e.page}📺 ${e.part}](${videoUrl}?p=${e.page})\n`;
        });
    }
    let biliInfo = {};
    biliInfo.link = videoUrl;
    biliInfo.videoDate = formatDateTime(resj.data.pubdate);
    biliInfo.title = resj.data.title;
    biliInfo.author = resj.data.owner.name;
    biliInfo.intro = resj.data.desc === '' ? ' ' : resj.data.desc;
    biliInfo.cover = resj.data.pic;
    biliInfo.parts = parts === '' ? ' ' : parts;
    biliInfo.filename = biliInfo.title.replace(/[\\\/\:\*\?\"\<\>\|]/g, "_");

    return biliInfo;

}

function formatDateTime(timestamp) {

    // 使用 Date 对象将秒级时间戳转换为日期对象
    const date = new Date(timestamp * 1000); // 注意需要将秒转换为毫秒

    // 获取年、月、日、时、分、秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出日期
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDate;
}

module.exports = bilibili;
