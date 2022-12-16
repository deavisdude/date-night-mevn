const express = require('express') //API
const app = express()
const mongoose = require('mongoose') //DB client
const { PORT, mongoUri } = require('./config') //DB info
const cors = require('cors') //allows us to make ajax calls from frontend server to backend
const morgan = require('morgan') //logging
const bodyParser = require('body-parser')//parse json
const destinationRoutes = require('./routes/api/destinations')
const path = require('path')
const middleware = require('./middleware/index')

app.use(cors())
app.use(morgan('tiny'))//set logging level
app.use(bodyParser.json())
app.use(middleware.decodeToken)

var admin = require("firebase-admin");

var serviceAccount = require("./svc_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB database Connected...')
        mongoose.connection.useDb('destinations');
    })
    .catch((err) => console.log(err))
app.use('/api/destinations', destinationRoutes)    

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))