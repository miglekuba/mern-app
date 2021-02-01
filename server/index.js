import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//intialise this app
const app = express();

// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body. used to handle HTTP POST requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//later on credentials will be secured by creating env variables and storing the connection URL
const CONNECTION_URL =
  "mongodb+srv://miglekuba:12345@cluster0.kgkbl.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//connecting to the database
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
