export default function ({
  sourceId,
  artistName,
  albumTitle,
  artistId,
  albumId,
  albumType = 'album'
}) {
  const artistNameEncoded = encodeURIComponent(artistName)
  const albumTitleEncoded = encodeURIComponent(albumTitle)

  const scope = `${albumType}s`

  const formatUrlData = () => {
    switch (sourceId) {
      case 'lastfm':
        return `artists/${artistNameEncoded}/${scope}/${albumTitleEncoded}`
      case 'bandcamp':
        return `artists/${artistId}/${scope}/${albumId}`
      default:
        return `${scope}/${albumId}`
    }
  }

  return `/${sourceId}/${formatUrlData()}`
}
