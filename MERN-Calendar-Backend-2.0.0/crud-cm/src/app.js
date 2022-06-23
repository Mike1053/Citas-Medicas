import express from "express";
import indexRoutes from "./routes/index.routes";
import { create } from "express-handlebars";
import path, { extname } from "path";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    //partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);

// routes
app.use(indexRoutes);










export default app;