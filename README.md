# date-night-mevn
A tool to keep track of restaurants that we want to visit and our ratings once we have visited them

Built using the MEVN (MongoDB, Express, Vue, Node) stack
Currently hosting everything together on one VPS and using pm2 to run the api

## Environment Setup:
- To run the project locally you will need to have a `.env.development` file present in the `client` directory.
- To create a production build you will need to have a `.env.producton` file present in the `client` directory.
### Variables needed for the vue.js .env files
- VUE_APP_API_URL: The url where the frontend can expect to reach the api

In addition to these .env files you will need to define `MONGO_URI` when running the API.
To run the server in production mode, you will also need to set `NODE_ENV="production"`

## Notes:
- The color pallete I am using can be found [here](https://colorhunt.co/palette/1b262c0f4c753282b8bbe1fa)