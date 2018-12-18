import React, { Component, Fragment } from 'react'
import EsriLoaderReact from 'esri-loader-react';
//import SidePanel from './SidePanel'
import './ESRIMap.css'
class ESRIMap extends Component {
  loadMap = ({loadedModules: [Map, MapView, Basemap, VectorTileLayer, Locate, DefaultUI], containerNode}) => {
    console.log('the esriMapLoader');
    const basemap = new Basemap({
      baseLayers: [
        new VectorTileLayer({
          portalItem: {
            id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
          }
        })
      ]
    });
    const map = new Map({
        basemap: basemap
      });
    const mapView = new MapView({
      container: containerNode
      , center: [-117.173087, 32.715736]
      , zoom: 16
      , map: map
      , ui: new DefaultUI()
      
    }).when(function(e){
      
      console.log('when')
      console.log('sceneView.ui.components: ' + e.ui.components)  
      e.ui.padding = { top: 96, left: 21, right: 21, bottom: 0 };
      e.ui.components=["zoom"];
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
      // var tileLayer = new VectorTileLayer({
      //   url: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/75f4dfdff19e445395653121a95a85db/resources/styles/root.json"
      // });
      // map.add(tileLayer);
  })
  
  }

  render() {

    const options = {
      url: 'https://js.arcgis.com/4.10/'
    };
    return (
      <div className="ESRIMap">
        <EsriLoaderReact 
          options={options}
          modulesToLoad={['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/VectorTileLayer', 'esri/widgets/Locate', 'esri/views/ui/DefaultUI']}    
          onReady={this.loadMap}
           
        />
        {/* <SidePanel ref="sidePanel"/> */}
      </div>
    );
  }
}

export default ESRIMap;