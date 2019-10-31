var db = require("../models")

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (results) {
            var hbsObject = {
                burgers: results
            };
            let burgers = results.map(element =>  element.dataValues);
            console.log(burgers);
            res.render("index", {'burgers':burgers});
        });
    });

    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function (results) {
            res.json({ id: results.insertID })
        });
    });

    app.put("/api/burgers/:id", function (req, res) {

        console.log(req.params);
        console.log(req.body.devoured);
        db.Burger.update({
                devoured: req.body.devoured
            },{
                where: {
                    id: req.params.id
                }
            }).then(function (result) {
                if (result.changedRows === 0) {
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                };
            });
    });
};
