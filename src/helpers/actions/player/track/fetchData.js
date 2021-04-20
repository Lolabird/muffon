import fetchTrackAudioData from '#/actions/audio/track/fetchData'
import { setTracks as setQueueTracks } from '#/actions/queue'
import { raiseProductionError } from '#/utils'

export default function ({ trackData, queueTracks }) {
  this.isLoading = true
  this.error = null

  const trackDataArgs = {
    trackTitle: trackData.title,
    artistName: trackData.artist.name,
    trackId: trackData.id,
    audioData: trackData.audio,
    queueTrackId: trackData.uuid
  }

  const handleError = error => {
    this.error = error

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false

    if (queueTracks) {
      setQueueTracks(queueTracks)
    }
  }

  return fetchTrackAudioData(trackDataArgs)
    .catch(handleError)
    .finally(handleFinish)
}
