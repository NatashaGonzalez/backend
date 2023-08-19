import express from "express";
import exphbs from "express-handlebars";

const viewsRouter = express.Router();

viewsRouter.engine("handlebars", exphbs());
viewsRouter.set("view engine", "handlebars");

viewsRouter.get("/Cliente", (req, res) => {
    res.render("realTimeProducts"); 
});

export default viewsRouter;
