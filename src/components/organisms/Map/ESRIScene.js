import React, { Component, Fragment } from 'react'
import EsriLoaderReact from 'esri-loader-react';
//import SidePanel from './SidePanel'

class ESRIScene extends Component {

  render() {

    const options = {
      url: 'https://js.arcgis.com/4.6/'
    };
    return (
      <div className="ESRIScene">
        <EsriLoaderReact 
          options={options}
          modulesToLoad={['esri/Map', 'esri/views/SceneView']}    
          onReady={({loadedModules: [Map, SceneView], containerNode}) => {
            console.log('esriMapLoader');
            new SceneView({
              container: containerNode
              , map: new Map({
                  basemap: 'satellite'
                  , ground: 'world-elevation'
              })
              , camera: {
                  position: {
                    x: -9188342.28,
                    y: 4244395.33,
                    z: 823,
                    spatialReference: {
                      wkid: 3857
                    }
                  },
                  heading: 280,
                  tilt: 77.5
              }
            }).on('click', function(e){
              //TODO: 1. get elevation reference and lat lon coordinate
              //TODO: 2. create web3.js token at click coordinates and elevation 
              console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
            }) 
          }} 
        />
        {/* <SidePanel ref="sidePanel"/> */}
      </div>
    );
  }
}

export default ESRIScene;