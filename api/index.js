const scdl = require('soundcloud-downloader').default
const fs = require('fs')

const SOUNDCLOUD_URL = 'https://soundcloud.com/1dashel/lya'
const CLIENT_ID = 'asdhkalshdkhsf'

let count = 1

export default function handler(request, response) {
    count++
    response.write(String(count))
    response.end()
    //scdl.download(SOUNDCLOUD_URL).then(stream => stream.pipe(response))
}