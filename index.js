const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const router = require('./src/routes/index')(app)
const db = require('./src/models/index')
const cors = require('cors')

// app.get('/', function(req,res){
//     res.status(200).send("hola");
// })

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
db.sequelize.sync({ force: false })
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api',router)

app.listen(8080, function(){
    console.log("listen on port 8080")
})