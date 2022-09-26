const scdl = require('soundcloud-downloader').default
const fs = require('fs')
const url = require('url');

export default function handler(request, response) {
    const queryObject = url.parse(request.url, true).query;
    response.writeHead(200, {'Content-Disposition': `attachment; filename="${queryObject.saveFileName}"`})
    scdl.download(queryObject.songUrl).then(stream => stream.pipe(response))
}