import type { Downloads } from 'webextension-polyfill'
import { storageConfig } from '../configurations'
import DownloadRecord from './models'

export type DownloadItemRecorder = (config: Downloads.DownloadOptionsType) => (downloadId: number) => void

export const downloadItemRecorder =
  (tweetInfo: TweetInfo): DownloadItemRecorder =>
  config =>
  downloadId => {
    const record = new DownloadRecord(downloadId, {
      tweetInfo: tweetInfo,
      downloadConfig: config,
    })

    storageConfig.downloadRecordRepo.save(record)
  }
