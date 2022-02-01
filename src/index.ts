import express from "express";
import dotenv from "dotenv";
import apiRouter from "./apiRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // default port to listen

// define a route handler for the default home page
app.use("/api",  apiRouter)

// start the Express server
app.listen( port, () => {
   console.log( `server started at http://localhost:${ port }` );
} );