import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class AlbumTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, albumTitle } = this.params()

    this.setNavSections(artistName, albumTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleAlbumChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleAlbumChange (prevProps) {
    const { artistName, albumTitle } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistNameChanged = artistName !== prevArtistName

    const prevAlbumTitle = prevProps.match.params.albumTitle
    const albumTitleChanged = albumTitle !== prevAlbumTitle

    const albumChanged = artistNameChanged || albumTitleChanged

    if (albumChanged) {
      this.setNavSections(artistName, albumTitle)
      this.setState({ tags: null })
      this.getData()
    }
  }

  setNavSections (artistName, albumTitle) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)

    const artistPageLink = `#/artists/${artistNameEncoded}`
    const albumsPageLink = `#/artists/${artistNameEncoded}/albums`
    const albumPageLink = `#/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const navSections = [
      { content: 'Artists' },
      { content: decodeURIComponent(artistName), href: artistPageLink },
      { content: 'Albums', href: albumsPageLink },
      { content: decodeURIComponent(albumTitle), href: albumPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { artistName, albumTitle } = this.params()

    const url = `/lastfm/artists/${artistName}/albums/${albumTitle}/tags`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { album } = resp.data
      const { tags } = album

      const error = null

      this.setState({ ...{ tags, error } })

      this.setNavSections(album.artist, album.title)
    }

    const handleError = error => {
      const tags = null

      !axios.isCancel(error) && this.setState({ ...{ error, tags } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tagsData () {
    const { tags, loading } = this.state

    return (
      <Segment className="pageSegment" {...{ loading }}>
        <Tags {...{ tags }} />
      </Segment>
    )
  }

  render () {
    const { loading, tags, error } = this.state

    const tagsData = tags && this.tagsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
