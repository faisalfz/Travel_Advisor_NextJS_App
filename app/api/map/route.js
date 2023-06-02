import axios from "axios";

export const getPlacesData = async(type, sw, ne) => {
  try {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
        currency: 'PKR',
      },
      headers: {
        'X-RapidAPI-Key': 'fb20aabae6mshdf94c7e5d68b0c8p1ab9f2jsn8c1263089771',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      }
    })
    return data;
  } catch (error) {
    console.log(error)
  }
}