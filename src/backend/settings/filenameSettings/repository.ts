import { PatternToken } from '@backend/enums'
import type { V4FilenameSettings } from '@schema'
import type { Storage } from 'webextension-polyfill'
import { DEFAULT_DIRECTORY } from '../../../constants'
import { ISettingsRepository } from '../repository'

type FilenameSettings = {
  directory: string
  no_subdirectory: boolean
  filename_pattern: {
    account: boolean
    serial: 'order' | 'filename'
  }
}

const defaultFilenameSettings: FilenameSettings = {
  directory: DEFAULT_DIRECTORY,
  no_subdirectory: false,
  filename_pattern: {
    account: true,
    serial: 'order',
  },
}

const defaultV4FilenameSettings: V4FilenameSettings = {
  directory: DEFAULT_DIRECTORY,
  noSubDirectory: false,
  filenamePattern: [PatternToken.Account, PatternToken.TweetId, PatternToken.Serial],
}

export class V4FilenameSettingsRepository implements ISettingsRepository<V4FilenameSettings> {
  constructor(readonly storageArea: Storage.StorageArea) {}

  async getSettings(): Promise<V4FilenameSettings> {
    const settings = await this.storageArea.get({
      ...defaultV4FilenameSettings,
      filenamePattern: defaultV4FilenameSettings.filenamePattern,
    })

    return {
      directory: settings.directory,
      noSubDirectory: settings.noSubDirectory,
      filenamePattern: settings.filenamePattern,
    }
  }

  async saveSettings(settings: Partial<V4FilenameSettings>): Promise<void> {
    await this.storageArea.set({
      directory: settings.directory,
      noSubDirectory: settings.noSubDirectory,
      filenamePattern: settings.filenamePattern,
    })
  }

  async setDefaultSettings(): Promise<void> {
    await this.saveSettings(defaultV4FilenameSettings)
  }

  getDefaultSettings(): V4FilenameSettings {
    return defaultV4FilenameSettings
  }
}

export default class FilenameSettingsRepository implements ISettingsRepository<FilenameSettings> {
  constructor(readonly storageArea: Storage.StorageArea) {}

  async getSettings(): Promise<FilenameSettings> {
    const settings = await this.storageArea.get(defaultFilenameSettings)
    return settings as FilenameSettings
  }

  async saveSettings(settings: Partial<FilenameSettings>): Promise<void> {
    await this.storageArea.set(settings)
  }

  async setDefaultSettings(): Promise<void> {
    await this.saveSettings(defaultFilenameSettings)
  }

  getDefaultSettings(): FilenameSettings {
    return defaultFilenameSettings
  }
}
