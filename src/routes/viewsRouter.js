import express from "express";
import Handlebars from "express-handlebars";

const viewsRouter = express.Router();

viewsRouter.engine("handlebars", Handlebars.engine());
viewsRouter.set("view engine", "handlebars");

viewsRouter.get("/Cliente", (req, res) => {
    res.render("realTimeProducts"); 
});

export default viewsRouter;
