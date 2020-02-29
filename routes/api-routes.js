// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = app => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    passport.session({})
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
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
        where: {
          routes_id: req.params.id
        },
        include: [db.User, db.Routes]
      })
        .then(function(data) {
          res.json(data)
        })
    });

     //search a city for a route
     app.get("/api/search/:city_id", function(req, res) {
      db.Routes.findAll({
        where: {
          city: req.params.city_id
        }
      })
        .then(function(data) {
          res.json(data)
        })
    });

  //post a review on a route
  app.post("/api/reviews/:id", function(req, res) {
    let { review } = req.body
    db.Reviews.create({
      review: review,
      routes_id: req.params.id,
      user_id: req.user.id
    })
      .then(function(data) {
        res.json(data)
      })
  });
  // get all routes a user as cleared
  app.get("/api/route-climbed/user/:id", (req, res) => {
    db.RoutesClimbed.findAll({
      where: {
        user_id: req.user.id
      },
      include: [db.User, db.Routes]
    }).then(data => {
      res.json(data);
    })
  });

  //post a route climbed
  app.post("/api/add-route-climbed/:id", function(req, res) {
    db.RoutesClimbed.create({
      route_id: req.params.id,
      user_id: req.user.id
    })
      .then(function(data) {
        res.json(data)
      })
  });
  //post a favorite route
  app.post("/api/add-favorite-route/:route_id", function(req, res) {
    db.Favorites.create({
      route_id: req.params.route_id,
      user_id: req.user.id
    })
      .then(function(data) {
        res.json(data)
      })
  });
  //get favorite routes
  app.get("/api/get-favorite-routes", function(req, res) {
    db.Favorites.findAll({
      where: {
        user_id: req.user.id
      },
      include: [db.User, db.Routes]
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
          id: req.user.id
        },
        include: [db.Reviews, db.Favorites, db.RoutesClimbed]
      }).then(function(userData) {
        res.json(userData);
      });
    }
  });

  // app.get('/api/routes/locate/:place', (req, res) => {
  //   db.Routes.findOne({
  //     where: {
  //       city: req.params.place
  //     }
  //   })
  //     .then(function(data) {
  //       res.json(data)
  //     })
  // })

  // find new routes from a given location
  app.get("/api/routes/locate/:place", (req, res) => {
    const googleAPIKey = "AIzaSyDa0VYRLVZSiVi2MxcaF-2iORHEBcV0dHM";
    const mountainAPIKey = "200689747-d1e6e46b3dc0d8d175970060766a0430"
    const mapURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.place}&inputtype=textquery&fields=geometry&key=${googleAPIKey}`;

    axios.get(mapURL).then(data => {

      console.log(latitude);
      console.log(longitude);
      const mountainURL = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${latitude}&lon=${longitude}&maxDistance=20&maxResults=20&key=${mountainAPIKey}`;
      
      axios.get(mountainURL).then(data => {
        const routes = [];

        data.data.routes.forEach(routeRaw => {
          const route = {
            name: routeRaw.name,
            difficulty: routeRaw.rating,
            rating: routeRaw.stars,
            lat: routeRaw.latitude,
            lng: routeRaw.longitude,
            img: routeRaw.imgSmallMed
          };

          routes.push(route);
        });

        //initMap(latitude, longitude, routes)

        res.json({routes, latitude, longitude});
      });
    });
  });
  // add new routes
  app.post("/api/routes", (req, res) => {
    db.Routes.create(req.body, dbRoute => {
      res.json(dbRoute);
    });
  });
  // get all favorites
  app.get("/api/favorites", (req, res) => {
    
  });
  // get locations favorited by specific user
  app.get("/api/favorites/user/:id", (req, res) => {

  });
  // get users who favorited specific location
  app.get("/api/favorites/loc/:id", (req, res) => {

  });
  // add new favorite
  app.post("/api/favorites/", (req, res) => {

  });
  // get all reviews
  app.get("/api/reviews", (req, res) => {

  });
  // get users reviews
  app.get("/api/review/user/:id", (req, res) => {

  });
  // get reviews of a location
  app.get("/api/review/loc/:id", (req, res) => {
    
  });
};
