const { auth } = require("../middleware");

const controller = require("../controllers/area");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/area/create",
        [auth.verifyToken],
        controller.create
    );
    app.get("/api/area/myareas",
        [auth.verifyToken],
        controller.getareas
    );
    app.get("/api/area/events",
        [auth.verifyToken],
        controller.getevents
    );
    app.get("/api/area/enablearea",
    [auth.verifyToken],
    controller.enablearea
    )
};