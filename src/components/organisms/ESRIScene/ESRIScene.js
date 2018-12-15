import React, { Component, Fragment } from 'react'
import EsriLoaderReact from 'esri-loader-react';
//import SidePanel from './SidePanel'
import './ESRIScene.css'
class ESRIScene extends Component {
  loadMap = ({loadedModules: [Map, SceneView, DefaultUI], containerNode}) => {
    console.log('esriMapLoader');
    const sceneView = new SceneView({
      container: containerNode
      , map: new Map({
          basemap: 'hybrid'
          , ground: 'world-elevation'
      })
      , ui: new DefaultUI()
      , camera: {
          position: {
            x:  -117.185087,
            y: 32.715736,
            z: 300,
            spatialReference: {
              wkid: 4326
            }
          },
          heading: 90,
          tilt: 77.5
      }
    }).when(function(e){
      
      console.log('when')
      console.log('sceneView.ui.components: ' + e.ui.components)  
      e.ui.padding = { top: 96, left: 21, right: 0, bottom: 0 };
      e.ui.components=["attribution", "navigation-toggle", "compass", "zoom"];
  })
  
  // sceneView.on('click', function(e){
  //     //TODO: 1. get elevation reference and lat lon coordinate
  //     //TODO: 2. create web3.js token at click coordinates and elevation 
  //     console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
  //   })
  }

  render() {

    const options = {
      url: 'https://js.arcgis.com/4.6/'
    };
    return (
      <div className="ESRIScene">
        <EsriLoaderReact 
          options={options}
          modulesToLoad={['esri/Map', 'esri/views/SceneView', 'esri/views/ui/DefaultUI']}    
          onReady={this.loadMap}
          // {({loadedModules: [Map, SceneView], containerNode}) => {
          //   console.log('esriMapLoader');
          //   new SceneView({
          //     container: containerNode
          //     , map: new Map({
          //         basemap: 'hybrid'
          //         , ground: 'world-elevation'
          //     })
          //     , camera: {
          //         position: {
          //           x:  -117.185087,
          //           y: 32.715736,
          //           z: 300,
          //           spatialReference: {
          //             wkid: 4326
          //           }
          //         },
          //         heading: 90,
          //         tilt: 77.5
          //     }
          //   }).on('click', function(e){
          //     //TODO: 1. get elevation reference and lat lon coordinate
          //     //TODO: 2. create web3.js token at click coordinates and elevation 
          //     console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
          //   })
          // }} 
        />
        {/* <SidePanel ref="sidePanel"/> */}
      </div>
    );
  }
}

export default ESRIScene;