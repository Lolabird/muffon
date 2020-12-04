import React from 'react'
import { Card, Header, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { artistHovered: false }
  }

  render () {
    const { album } = this.props
    const { artistHovered } = this.state

    const artistName = album.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitle = album.title
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumOrArtistLink = artistHovered ? artistPageLink : albumPageLink

    const image = album.images.small
    const imageData = (
      <Image
        wrapped
        rounded
        size="small"
        className="imageWrapBordered"
        src={image}
      />
    )

    const albumTitleClassName = !artistHovered ? 'cardLightMainHeader' : ''
    const albumTitleData = (
      <Header as="h3" className={albumTitleClassName} content={albumTitle} />
    )

    const artistNameClassName = artistHovered ? 'cardLightMainHeader' : ''
    const toggleArtistHovered = bool =>
      this.setState({ artistHovered: !artistHovered })
    const artistNameData = (
      <Card.Description
        className={artistNameClassName}
        content={artistName}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
      />
    )

    const listenersCountData = (
      <Card.Description>
        <Icon name="user" size="small" />
        {album.listeners_count.toLocaleString('eu')}
      </Card.Description>
    )

    const contentData = (
      <React.Fragment>
        <div />
        {imageData}
        {albumTitleData}
        <Card.Content>
          {artistNameData}
          {listenersCountData}
        </Card.Content>
      </React.Fragment>
    )

    return (
      <Card
        className="cardLight"
        as={Link}
        to={albumOrArtistLink}
        content={contentData}
      />
    )
  }
}
