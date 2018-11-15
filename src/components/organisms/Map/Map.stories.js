import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Map from "."

const token = process.env.STORYBOOK_MAPBOX_API_TOKEN

storiesOf("Map", module).add("default", () => (
  <Map
    {...{
      entityClick: action(""),
      selectEntity: action(""),
      deselectEntity: action(""),
      selectedEntities: [],
      viewport: {
        latitude: 37.785164,
        longitude: -122.41669,
        zoom: 17,
        bearing: 0,
        pitch: 60,
        width: 500,
        height: 500,
      },
      changeViewport: action(""),
      popupInfo: {},
      closePopup: action(""),
      userLocation: { latitude: 1, longitude: 1 },
      token,
      pois: [],
    }}
  />
))
