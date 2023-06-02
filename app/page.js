"use client";
import List from "@/components/List/List";
import Map from "@/components/Map/Map";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getPlacesData } from "./api/map/route";


const Home = () => {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=> {
      setCoordinates({lat: latitude, lng: longitude})
    })
  },[]);

  useEffect(() => {
    const filtered = places?.filter((place) => place.rating > rating)
    setFilteredPlaces(filtered)
  },[rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
    .then((data) => {
      setPlaces(data?.filter((place) => place?.name && place.num_reviews>0))
      setFilteredPlaces([])
      setIsLoading(false)
    })
    }

  },[ bounds, type]);

  return (
    <>
    <Header setCoordinates={setCoordinates} />

      <div className="w-full flex justify-between">
        <div className=" w-[30%] ">
          <List 
            places={filteredPlaces?.length>0? filteredPlaces : places}
            setPlaces={setPlaces}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            
          />
        </div>
        <div className=" w-[70%] ">
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces?.length? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
