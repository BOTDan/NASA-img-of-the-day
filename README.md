# NASA Images of the Day
This is a site for loading a random list of "Picture of the Day" entries from NASA.

### Running
To run, use `npm start`. This will start a `http-server` for accessing the site. Instructions on how
 to access the site should be output to console, but il will likely launch on `localhost:8080`.

### API Keys
By default, this project uses the `DEMO_KEY` for accessing the NASA API. This key has low usage
limits, so it is recommended to generate a key [here](https://api.nasa.gov/#signUp). This can then
be placed in `/src/api/nasa.mjs`, replacing the `API_KEY` at the top of the file.