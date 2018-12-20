import React, { Component, Fragment } from 'react'
import EsriLoaderReact from 'esri-loader-react';
//import SidePanel from './SidePanel'
import './ESRIScene.css'
class ESRIScene extends Component {
  loadMap = ({loadedModules: [WebScene, SceneView, Locate, DefaultUI], containerNode}) => {
    console.log('that esriMapLoader');
    const sceneView = new SceneView({
      container: containerNode
      , map: new WebScene({
        portalItem: { // autocasts as new PortalItem()
          id: "a4d990eaeea64f62809e74f0d83a4ee2"
        }
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
      
      console.log('when pancakes house?')
      console.log('sceneView.ui.components: ' + e.ui.components)  
      e.ui.padding = { top: 96, left: 21, right: 21, bottom: 0 };
      e.ui.components=["zoom", "navigation-toggle", "compass"];
      var locateBtn = new Locate({
        view: e
      });

      // Add the locate widget to the top left corner of the view
      e.ui.add(locateBtn, {
        position: "top-right"
      });

      e.on('click', function(e){
        //TODO: 1. get elevation reference and lat lon coordinate
        //TODO: 2. create web3.js token at click coordinates and elevation 
        console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
      })
  })
  
  }

  render() {

    const options = {
      url: 'https://js.arcgis.com/4.10/'
    };
    return (
      <div className="ESRIScene">
        <EsriLoaderReact 
          options={options}
          modulesToLoad={['esri/WebScene', 'esri/views/SceneView', 'esri/widgets/Locate', 'esri/views/ui/DefaultUI']}    
          onReady={this.loadMap}
           
        />
        {/* <SidePanel ref="sidePanel"/> */}
      </div>
    );
  }
}

export default ESRIScene;