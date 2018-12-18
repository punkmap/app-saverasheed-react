import React, { Component, Fragment } from 'react'
import { map, mapObjIndexed, assoc, pipe, partition, prop } from 'ramda'
import PropTypes from 'prop-types'
//import { Marker } from 'react-map-gl'
import { AutoSizer } from 'react-virtualized'
//import { ControlledPOILayer, Map } from 'sdk-mapbox-react'

import { mapArrIndexed, size } from '../../../util/ramda-extra'
//import ufoPinImg from '../../../assets/UFO_mapPin.png'
import ufoPinData from '../../../assets/UFO_mapPin'
//import checkedUfoPinImg from '../../../assets/UFO_mapPin_checked.png'
//import playerIcon from '../../../assets/player-icon.png'
import checkedUfoPinData from '../../../assets/UFO_mapPin_checked'
import { poiPropTypes } from '../../../fixtures/pois'

//import ESRIScene from '../ESRIScene/ESRIScene'
import ESRIMap from '../ESRIMap/ESRIMap'

const { func, string, arrayOf, shape, number } = PropTypes

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_API_TOKEN

const mapIconData = mapObjIndexed(({ frame: { x, y, w, h } }) => ({
  x,
  y,
  width: w,
  height: h,
  anchorY: h,
}))

const ufoIconMapping = mapIconData(ufoPinData.frames)
const checkedUfoIconMapping = mapIconData(checkedUfoPinData.frames)

// const scale = 2
const scale = 528 / 50

class MapPage extends Component {
  static propTypes = {
    entityClick: func,
    selectEntity: func,
    deselectEntity: func,
    selectedEntities: arrayOf(string),
    viewport: shape({
      latitude: number,
      longitude: number,
      zoom: number,
      bearing: number,
      pitch: number,
      width: number,
      height: number,
    }).isRequired,
    changeViewport: func,
    userLocation: shape({
      latitude: number,
      longitude: number,
    }).isRequired,
    pois: arrayOf(poiPropTypes),
  }

  state = {
    counter: 0,
    counterChecked: 0,
  }

  componentDidMount() {
    this.numFrames = size(ufoIconMapping)
    this.numFramesChecked = size(checkedUfoIconMapping)
    const fps = 30
    this.fpsInterval = 1000 / fps
    this.then = Date.now()
    this.thenChecked = Date.now()
    this._animate()
    this._animateChecked()
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame)
    }
    if (this._animationFrameChecked) {
      window.cancelAnimationFrame(this._animationFrameChecked)
    }
  }

  _animate = () => {
    const now = Date.now()
    this.elapsed = now - this.then
    if (this.elapsed > this.fpsInterval) {
      this.then = now - (this.elapsed % this.fpsInterval)
      this.setState(({ counter }) => ({
        counter: counter < this.numFrames - 1 ? counter + 1 : 0,
      }))
    }
    this._animationFrame = window.requestAnimationFrame(this._animate)
  }

  _animateChecked = () => {
    const now = Date.now()
    this.elapsedChecked = now - this.thenChecked
    if (this.elapsedChecked > this.fpsInterval) {
      this.thenChecked = now - (this.elapsedChecked % this.fpsInterval)
      this.setState(({ counterChecked }) => ({
        counterChecked:
          counterChecked < this.numFramesChecked - 1 ? counterChecked + 1 : 0,
      }))
    }
    this._animationFrameChecked = window.requestAnimationFrame(
      this._animateChecked,
    )
  }

  render() {
    const {
      entityClick,
      selectEntity,
      deselectEntity,
      selectedEntities,
      viewport,
      changeViewport,
      userLocation: { latitude, longitude },
      pois = [],
      token,
    } = this.props
    const { counter, counterChecked } = this.state

    const icon = `UFO${String(counter).padStart(4, '0')}`
    const iconChecked = `Symbol 1${String(counterChecked).padStart(4, '0')}`
    const [checkedPois, uncheckedPois] = pipe(
      partition(prop('checked')),
      mapArrIndexed((poi, idx) =>
        map(assoc('icon', idx === 0 ? iconChecked : icon), poi),
      ),
    )(pois)
    
    const options = {
      url: 'https://js.arcgis.com/4.6/'
    };
    
    return (
      <AutoSizer>
        {({ width, height }) => (
          <Fragment>
            <ESRIMap w={width} h={height}/>
            {/* <Map
              mapboxApiAccessToken="pk.eyJ1IjoiY2FydGVyaGFycmlzb24iLCJhIjoiY2pmOG0zcjB2MXZ0ZDJ4cDRxZHVuaGVsNSJ9.35FdhgnKKLCTdtJgah2csQ"
              viewport={{ ...viewport, width, height }}
              onViewportChange={changeViewport}
              mapStyle="mapbox://styles/jordantrouw/cjlwx196y404v2rpg2dzmed2v"
            >
              <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-183 / scale}
                offsetTop={-(528 - 86) / scale}
              >
                <img
                  width={366 / scale}
                  height={528 / scale}
                  src={playerIcon}
                  alt="player"
                />
              </Marker>
              {checkedPois.length && (
                <ControlledPOILayer
                  id="checked-pois"
                  pois={checkedPois}
                  onClick={entityClick}
                  selectTile={selectEntity}
                  deselectTile={deselectEntity}
                  selectedTiles={selectedEntities}
                  iconAtlas={checkedUfoPinImg}
                  iconMapping={checkedUfoIconMapping}
                  getIcon={d => d.icon}
                  getSize={2.5}
                  disablePolygon
                />
              )}
              {uncheckedPois.length && (
                <ControlledPOILayer
                  id="unchecked-pois"
                  pois={uncheckedPois}
                  onClick={e => {
                    entityClick(e)
                    return true
                  }}
                  selectTile={selectEntity}
                  deselectTile={deselectEntity}
                  selectedTiles={selectedEntities}
                  iconAtlas={ufoPinImg}
                  iconMapping={ufoIconMapping}
                  getIcon={d => d.icon}
                  getSize={5}
                  disablePolygon
                />
              )}
            </Map> */}
          </Fragment>
        )}
      </AutoSizer>
    )
  }
}

export default MapPage
