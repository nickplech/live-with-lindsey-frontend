import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  background: rgba(20, 20, 20, 0.1);
  height: 210px;
  padding: 15px;
  margin: 25px auto;
  .create-contact-avatar-input {
    min-width: 80px;
    height: 80px;
    border: 2px solid grey;
    background-color: lightgrey;
    background-image: url('../static/img/profpic.svg');
    background-size: 32px 32px;
    /* margin: 15px; */
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
  }
`

const readFileAsDataURL = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise((resolve) => {
    const image = new Image()

    image.onload = () => {
      const context = canvas.getContext('2d')

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height
        image.height = maxHeight
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = image.width
      canvas.height = image.height

      context.drawImage(image, 0, 0, image.width, image.height)

      resolve(canvas.toDataURL('image/jpeg'))
    }

    image.src = imageURL
    console.log(image.src)
  })

class ImageInput extends React.Component {
  static props = {
    // className: PropTypes.string,
    name: 'image',
    maxHeight: 100,
  }

  state = {
    image: '',
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then((originalURL) => {
        resizeImage(originalURL, this.canvas, this.props.maxHeight).then(
          (url) => {
            this.setState({ value: url }, console.log(url))
          },
        )
      })
    } else {
      this.setState({ image: '' })
    }
  }

  handleFormReset = () => {
    this.setState({ image: '' })
  }

  componentDidMount() {
    this.canvas = document.createElement('canvas')
    this.handleFormReset()
  }

  componentWillUnmount() {
    this.fileInput.form.removeEventListener('reset', this.handleFormReset)
  }

  render() {
    const { className, name } = this.props
    const { value } = this.state

    const style = {
      position: 'relative',
    }

    if (value) {
      style.backgroundImage = `url("${value}")`
      style.backgroundRepeat = 'no-repeat'
      style.backgroundPosition = 'center'
      style.backgroundSize = 'cover'
      style.borderRadius = '50%'
      style.height = '180px'
      style.width = '180px'
    }

    return (
      <Wrap className={className} style={style}>
        <label htmlFor="file">

          <input
            ref={(node) => (this.fileInput = node)}
            type="file"
            id="file"
            name="file"
            placeholder="upload picture"
            onChange={this.handleFileChange}
          />
          {this.props.image && (
            <img
              className="profPic"
              width="120"
              src={this.props.image}
              alt="upload preview"
            />
          )}
        </label>
      </Wrap>
    )
  }
}

export default ImageInput
