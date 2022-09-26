const scdl = require('soundcloud-downloader').default
const url = require('url');
 
export default function handler(request, response) {
    const queryObject = url.parse(request.url, true).query;
    scdl.getInfo(queryObject.songUrl).then(info => {
        var infoObject = {artwork: info.artwork_url, title: info.title, author: info.user.username};
        response.write(JSON.stringify(infoObject));
        response.end();
    });
}