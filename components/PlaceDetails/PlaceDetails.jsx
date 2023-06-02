import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const PlaceDetails = ({ place, selected, refProp }) => {
  // console.log({refProp})
  if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  
  return (
    <>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 200 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdHVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          }
          title={place.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={2}
          >
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">
              {place.num_reviews} review
              {/* {place.num_reviews > 1 && "s"} */}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1">Price</Typography>
            <Typography variant="subtitle1">{place.price}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignContent="center"
          >
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography variant="subtitle1" align="right">
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src={award.images.small}
                width={50}
                height={50}
                alt={award.display_name}
              />
              <Typography variant="subtitle2">{award.display_name}</Typography>
            </Box>
          ))}

          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} size="small" label={name} className="m-1 ml-0" />
          ))}

          {place.address && (
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              className="flex justify-between gap-2 items-center mt-2"
            >
              <LocationOnIcon />
              {place.address}
            </Typography>
          )}
          {place.phone && (
            <Typography
              variant="body2"
              color="textSecondary"
              className="flex gap-2 items-center"
            >
              <PhoneIcon /> {place.phone}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PlaceDetails;
