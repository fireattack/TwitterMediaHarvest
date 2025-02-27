import { storageConfig } from '@backend/configurations'
import type { V4Statistics } from '@schema'
import type { Storage } from 'webextension-polyfill'
import Browser from 'webextension-polyfill'
import { IExternalStore } from './base'

interface StatsStore extends IExternalStore<V4Statistics> {
  setStats: (initStats: V4Statistics) => void
}

const createStatsStore = (() => {
  let instance: StatsStore | null = null

  let stats = { downloadCount: 0, trafficUsage: 0 }
  const listeners = new Set<() => void>()

  const updateStats = (newStats: V4Statistics) => {
    stats = { ...stats, ...newStats }
    listeners.forEach(onChange => onChange())
  }

  const handleChange = (changes: Storage.StorageAreaOnChangedChangesType, areaName: string) => {
    if ('downloadCount' in changes || 'trafficUsage' in changes) {
      storageConfig.statisticsRepo.getStats().then(newStats => {
        updateStats(newStats)
      })
    }
  }

  return () => {
    if (instance) return instance

    instance = {
      getSnapShot: () => stats,
      subscribe: (onStoreChange: () => void) => {
        listeners.add(onStoreChange)
        Browser.storage.onChanged.addListener(handleChange)

        return () => {
          listeners.delete(onStoreChange)
          if (listeners.size === 0) {
            Browser.storage.onChanged.removeListener(handleChange)
          }
        }
      },
      setStats: updateStats,
    }
    return instance
  }
})()

export default createStatsStore
