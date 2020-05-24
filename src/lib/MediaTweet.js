import { TWITTER_AUTH_TOKEN } from '../constants'

export default class MediaTweet {
  constructor(tweetId, token) {
    this.tweetId = tweetId
    this.header = initHeader(token)
    this.tweetAPIurl = `https://api.twitter.com/2/timeline/conversation/${tweetId}.json?tweet_mode=extended`
  }

  async fetchMediaList() {
    let mediaRes = await fetch(this.tweetAPIurl, {
      method: 'GET',
      headers: this.header,
      mode: 'cors',
      cache: 'no-cache',
    })

    let detail = await mediaRes.json()
    return this.parseMedias(detail)
  }

  parseMedias(detail) {
    const medias =
      detail.globalObjects.tweets[this.tweetId].extended_entities.media

    const [media] = medias

    const VIDEO_INFO = 'video_info'
    const mediaList = media.hasOwnProperty(VIDEO_INFO)
      ? this.parseVideo(media[VIDEO_INFO])
      : this.parseImage(medias)

    return mediaList
  }

  async parseVideo(video_info) {
    const mediaList = []
    const { variants } = video_info

    let hiRes = 0
    let targetUrl

    for (let variant of variants) {
      let { bitrate, url } = variant
      // bitrate will be 0 if video is made from gif.
      // variants contains m3u8 info.
      let isHigherBitrate = bitrate > hiRes || bitrate === 0
      if (typeof bitrate !== 'undefined' && isHigherBitrate) {
        hiRes = bitrate
        targetUrl = url
      }
    }

    mediaList.push(targetUrl)
    return mediaList
  }

  async parseImage(medias) {
    return medias.map(media => media.media_url_https)
  }
}

function initHeader(token) {
  const header = new Headers([
    ['Authorization', TWITTER_AUTH_TOKEN],
    ['User-Agent', navigator.userAgent],
    ['cache-control', 'no-cache'],
    ['x-twitter-active-user', 'yes'],
    ['x-twitter-auth-type', 'OAuth2Session'],
    ['x-csrf-token', token],
  ])
  return header
}
