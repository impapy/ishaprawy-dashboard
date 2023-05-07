import React from "react"
import ReactImageGallery, { ReactImageGalleryProps } from "react-image-gallery"

const Gallery: React.FC<ReactImageGalleryProps> = (props) => {
  return (
    <ReactImageGallery
      thumbnailPosition="left"
      lazyLoad={true}
      showFullscreenButton={false}
      showPlayButton={false}
      showNav={false}
      {...props}
    />
  )
}

export default Gallery
