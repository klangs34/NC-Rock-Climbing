// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //get all routes
  app.get("/api/routes", function(req, res) {
    db.Routes.findAll({}).then(function(allRoutes) {
      res.json(allRoutes);
    });
  });

  //get a route
  app.get("/api/routes/:id", function(req, res) {
    db.Routes.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
  
    //get reviews on a route
    app.get("/api/reviews/:id", function(req, res) {
      db.Reviews.findAll({
        Where: {
          routes_id: req.params.id
        },
        include: [db.User, db.Routes]
      })
        .then(function(data) {
          res.json(data)
        })
    });

  //post a review on a route
  app.post("/api/reviews/:id", function(req, res) {
    let { review, user_id } = req.body
    console.log( review, user_id );
    db.Reviews.create({
      review: review,
      routes_id: req.params.id,
      user_id: user_id
    })
      .then(function(data) {
        res.json(data)
      })
  });
  //post a route climbed
  app.post("/api/add-route-climbed/:id", function(req, res) {
    db.RoutesClimbed.create({
      route_id: req.params.id,
      user_id: req.body.id
    })
      .then(function(data) {
        res.json(data)
      })
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", passport.authenticate("local"), function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      //send back reviews, favorites, routes climbed 
      db.User.findAll({
        where: {
          id: req.params.id
        },
        include: [db.Reviews, db.Favorites, db.RoutesClimbed]
      }).then(function(userData) {
        res.json(userData);
      });
    }
  });
};
