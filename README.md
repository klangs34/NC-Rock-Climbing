# North Carolina Rock Climbing
This project was created for the avid rock climbers looking for rock climbing sites in the state of North Carolina.  Visitors are able to first signup and then log into to the site to search for sites in or around a given city.  The search results will yield reported climbing sites within a 20 mile radius of the searched city.  The user is provided value information about the site and able to mark as a favorite for future reference.  Also, sved sites are not returned in a subsequent search within that same city.  

You can visit the site [here][https://shrouded-cliffs-15806.herokuapp.com/].

The approach was to implement a simple MVC (model, views and controllers) application where each project member could work on a specific section or function of the site independently.

# Technology
The backend server is built on Express server and uses the Passport library to handle user authentication.  The Handlebars library is used to render dynamic html pages that are requested by the client.  The server also serves a REST server for data stored and retrieved from the database, which uses the Sequelize library.  Finally, the Passport library is implemented to handle user authentication

The frontend heavily relies on Javascript API calls to the server for content.  Also implemented is Google Maps' third party API, which pinpoints GPS coordinates of searched cities

