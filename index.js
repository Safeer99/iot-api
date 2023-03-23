const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")

//! CONFIGURATIONS

const port = 8800;
const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(cors());

//! connecting to database

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => console.log('listening on port ' + port));
}).catch((error) => console.log(error));

mongoose.connection.on('connected', () => {
    console.log('connected to database');
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected from database');
});

//! ROUTES

app.get('/', (req, res) => {
    res.send("Hi, I am live");
})

app.use("/api/V1/auth", require("./routes/auth"));
app.use("/api/V1/devices", require("./routes/devices"));
app.use("/api/V1/dashboards", require("./routes/dashboards"));
app.use("/api/V1/resources", require("./routes/resources"));
app.use("/api/V1/widgets", require("./routes/widgets"));
