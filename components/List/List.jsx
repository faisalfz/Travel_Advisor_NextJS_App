"use client";
import { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  places,
  setPlaces,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
    

  }, [places]);

  return (
    <div className="p-6 w-full  h-[85vh] ">
      <Typography variant="h6" className="mb-1">
        Resturants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          {" "}
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className="min-w-[100px] m-2 mb-7">
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              label="Type"
              onChange={(e) => {
                setType(e.target.value);
                setElRefs([]);
              }}
            >
              <MenuItem value="restaurants" selected>
                Restaurants
              </MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="min-w-[100px] m-2 mb-7">
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              label="Rating"
              onChange={(e) => {
                setRating(e.target.value);
                setElRefs([]);
              }}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className="h-[65vh] overflow-auto">
            {places?.map((place, index) => {
              {
                if (place?.hasOwnProperty("name"))
                  return (
                    <Grid item ref={elRefs[index]} key={index} xs={12}>
                      <PlaceDetails
                        place={place}
                        selected={Number(childClicked) === index}
                        refProp={elRefs[index]}
                      />
                    </Grid>
                  );
              }
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
