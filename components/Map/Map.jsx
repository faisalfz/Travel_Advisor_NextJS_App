import GoogleMapReact from "google-map-react";
import { Paper, Typography, Rating } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { mapStyles } from "./mapStyles";


import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }) => {
  const matches = useMediaQuery("(min-width:600px)");
  
  return (
    <div className="map-container z-0 h-[86vh] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI:true, zoomControl:true, styles:mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >

        {places?.length>0 &&
          places.map((place, i) => (
            <div
              className="markerContainer"
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  className="p-[10px] flex flex-col justify-center w-[120px]"
                >
                  <Typography className="" variant="subtitle2" gutterBottom>
                    {" "}
                    {place.name}
                  </Typography>
                  <img
                    className="cursor-pointer"
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
