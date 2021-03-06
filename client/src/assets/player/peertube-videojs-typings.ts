// FIXME: something weird with our path definition in tsconfig and typings
// @ts-ignore
import * as videojs from 'video.js'

import { VideoFile } from '../../../../shared/models/videos/video.model'
import { PeerTubePlugin } from './peertube-videojs-plugin'

declare namespace videojs {
  interface Player {
    peertube (): PeerTubePlugin
  }
}

interface VideoJSComponentInterface {
  _player: videojs.Player

  new (player: videojs.Player, options?: any): any

  registerComponent (name: string, obj: any): any
}

type VideoJSCaption = {
  label: string
  language: string
  src: string
}

type UserWatching = {
  url: string,
  authorizationHeader: string
}

type PeertubePluginOptions = {
  videoFiles: VideoFile[]
  playerElement: HTMLVideoElement
  videoViewUrl: string
  videoDuration: number
  startTime: number | string
  autoplay: boolean,
  videoCaptions: VideoJSCaption[]

  subtitle?: string
  userWatching?: UserWatching
}

// videojs typings don't have some method we need
const videojsUntyped = videojs as any

export {
  VideoJSComponentInterface,
  PeertubePluginOptions,
  videojsUntyped,
  VideoJSCaption,
  UserWatching
}
