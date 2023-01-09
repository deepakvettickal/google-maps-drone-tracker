import React, { useEffect, useState } from "react";
import Map from "./Map.js";
import "./App.css";

const Home = () => {
  const [droneLocation, setDroneLocation] = useState(null);
  const [start, setStart] = useState({label: "Guy's Hospital", lat: 51.5032869661519, lng:  -0.08709580697274358});
  const [end, setEnd] = useState({label: "St. Thomas Hospital", lat: 51.49911863014419, lng: -0.11897504225735865});
  const [ticking, setTicking] = useState(true),
        [count, setCount] = useState(0);
  const [newLat, setNewLat] = useState(end.lat);
  const [newLng, setNewLng] = useState(end.lng);
  const [reverse, setReverse] = useState(false);


  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="M") { dist = dist * 0.8684 }
    return dist
}

  const dist = distance(start.lat, start.lng, end.lat, end.lng);
  const speed = dist * 0.001;


   useEffect(() => { 
    const timer = setTimeout(() => ticking && setCount(count+1), 0.05e3)
    //code to update drone location 
    if(!reverse){
    setNewLat(newLat +(start.lat-end.lat)*speed);
    setNewLng(newLng +(start.lng-end.lng)*speed);
    }
    else{
      setNewLat(newLat -(start.lat-end.lat)*speed);
      setNewLng(newLng -(start.lng-end.lng)*speed);
    }
    if(newLat < start.lat && !reverse){
    setDroneLocation({lat: newLat, lng: newLng});}
    else if(newLat > end.lat && reverse){
      setDroneLocation({lat: newLat, lng: newLng});
    }
    else{
      reverse == false? setDroneLocation(start): setDroneLocation(end);
      setReverse(!reverse);
    }
    return () => clearTimeout(timer)
   }, [count, ticking])

  return (
    <div className="App">
      <div className="Map">
        <Map
          isMarkerShown
          droneLocation={droneLocation}
          start={start}
          end = {end}
        />
      </div>
    </div>
  );
};

export default Home;

