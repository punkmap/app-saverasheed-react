import React, { Component, createRef } from 'react'
import { head, map, values, flatten, prop, pipe } from 'ramda'
import { Stage, Layer, Sprite } from 'react-konva'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const { bool, shape, objectOf, number, string } = PropTypes

const StyledStage = styled(Stage)({
  pointerEvents: 'none',
})

class Spritesheet extends Component {
  constructor(props) {
    super(props)
    const { data, src } = props
    const { frames } = data
    this.state = { running: false }

    this.animations = {
      idle: pipe(
        values,
        map(
          pipe(
            prop('frame'),
            values,
          ),
        ),
        flatten,
      )(frames),
    }
    this.spriteImage = new Image()
    this.spriteImage.onload = () => this.setState({ running: true })
    this.spriteImage.src = src
  }

  static propTypes = {
    src: string.isRequired,
    data: shape({
      frames: objectOf(
        shape({
          frame: shape({
            x: number.isRequired,
            y: number.isRequired,
            w: number.isRequired,
            h: number.isRequired,
          }).isRequired,
          sourceSize: shape({
            w: number.isRequired,
            h: number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    stageWidth: number,
    stageHeight: number,
    autoheight: bool,
  }

  sprite = createRef()

  componentDidUpdate(prevProps, prevState) {
    const { running: wasRunning } = prevState
    const { running } = this.state
    if (running && !wasRunning) {
      if (
        this.sprite &&
        this.sprite.current &&
        !this.sprite.current.isRunning()
      ) {
        this.sprite.current.start()
      }
    }
  }

  render() {
    const { data, stageWidth, stageHeight, autoheight } = this.props
    if (autoheight) {
      return (
        <StyledStage width="auto" height="auto">
          <Layer>
            <Sprite
              ref={this.sprite}
              image={this.spriteImage}
              frameRate={30}
              animation="idle"
              x={0}
              y={0}
              animations={this.animations}
            />
          </Layer>
        </StyledStage>
      )
    }
    // pull the first frame, take its dimensions -- works so far because
    // every frame has the same dimensions. may break though

    const { w, h } = pipe(
      prop('frames'),
      values,
      head,
      prop('sourceSize'),
    )(data)

    const scale = stageWidth
      ? stageWidth / w
      : stageHeight
        ? stageHeight / h
        : 1

    return (
      <StyledStage
        width={w * scale}
        height={h * scale}
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          <Sprite
            ref={this.sprite}
            image={this.spriteImage}
            frameRate={30}
            animation="idle"
            x={0}
            y={0}
            animations={this.animations}
          />
        </Layer>
      </StyledStage>
    )
  }
}

export default Spritesheet
