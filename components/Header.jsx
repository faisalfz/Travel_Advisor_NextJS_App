"use client";
import { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import Link from "next/link";

const Header = ({setCoordinates}) => {
  const [autoComplete, setAutoComplete] = useState(null)
  const onLoad = (autoC) => {
    setAutoComplete(autoC)
  }
  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    console.log({lat, lng})
    setCoordinates({lat, lng})
  }
  const [inputSearch, setInputSearch] = useState("");
  return (
    <>
      <nav className="h-14 w-full flex justify-between px-6 py-1 bg-blue-700">
        <Image src={"/travel-map.png"} width={52} height={52} alt="Logo" />
        <div className="flex justify-end items-center gap-2">
          <p className="text-white ">Explore your places</p>
          
          <Autocomplete key={'AIzaSyB1BCH7-dkJdURQM0vwAp8Or1IyTIB0Kdk'} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className='relative rounded-md bg-white/50 mr-2 ml-0 w-full flex'>
              <div className='p-2 h-full pointer-events-none flex items-center justify-center'>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" className="text-inherit p-1" />
            </div>
          </Autocomplete>

        </div>
      </nav>
    </>
  );
};

export default Header;
