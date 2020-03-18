const fetchGeoLocation = location => {
  return (
    fetch(
      "https://us-central1-nathan-downes-express-api.cloudfunctions.net/api/maps",
      { method: "POST", body: `${ location }` }
    )
      .then(r => r.json())
      .then(r => (r.results[0].geometry.location))
  );
};

const policeApiCall = (lat, lng, month, year) => {
  return fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${year}-${month}`
  )
    .then(r => r.json());
};

const getData = async (location, month, year) => {
  const { lat, lng } = await fetchGeoLocation(location) 
  const results = await policeApiCall (lat, lng, month, year)
  return ({lat, lng , results})
}

export default getData