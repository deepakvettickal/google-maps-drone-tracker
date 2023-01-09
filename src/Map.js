import React from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withProps } from "recompose";

let defaultOptions = {
  scrollwheel: true,
  styles: [
    {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#202c3e"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "gamma": 0.01
          },
          {
              "lightness": 20
          },
          {
              "weight": "1.39"
          },
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "weight": "0.96"
          },
          {
              "saturation": "9"
          },
          {
              "visibility": "on"
          },
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 30
          },
          {
              "saturation": "9"
          },
          {
              "color": "#29446b"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "saturation": 20
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 20
          },
          {
              "saturation": -20
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 10
          },
          {
              "saturation": -30
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#193a55"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "saturation": 25
          },
          {
              "lightness": 25
          },
          {
              "weight": "0.01"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "lightness": -20
          },
      ]
  }
  ],
};

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDb5o89Gc8hXD6H6bOqou4pivkImVXQKu8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
//   console.log({ props });
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 51.50010216840373, lng: -0.10031228497996092 }} 
      defaultOptions={defaultOptions}>
      {props.isMarkerShown &&
       [props.start, props.end].map((marker) => {
          return (
            <Marker
              position={{
                lat: Number(marker?.lat),
                lng: Number(marker?.lng),
              }}
            >
             <InfoWindow>
              <div>{marker?.label}</div>
            </InfoWindow>
            </Marker>
          );
        })}
      {
        <Marker
          icon={{
            url: require("./drone.png"),
          }}
        position={props.droneLocation}>
        </Marker> }
    </GoogleMap>
  );
});

export default Map;