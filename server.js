const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routermain");
const cookieParser = require("cookie-parser");
const config = require("./config.json");
// require("dotenv").config();

const PORT = 4018;
const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:4017",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
 
];

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET, PUT, POST, PATCH , DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", routes);


app.use("/api/uploads", express.static("./uploads"));

//mongoose.connect(mongoString);

app.listen(PORT, () => {
  console.log(config?.DATABASE_URL);
  console.log(`Server Started at ${PORT}`);
});
mongoose.connect(config?.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("dasdasd", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
// "mongodb://localhost:27017/ooriginbackend",