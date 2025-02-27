export enum Action {
  Download,
  Refresh,
  FetchUser,
}

export enum DownloadKey {
  Twitter = 'd',
  LegacyTweetDeck = 'o',
  BetaTweetDeck = 'p',
}

export enum ButtonStatus {
  Downloading = 'downloading',
  Success = 'success',
  Error = 'error',
}
