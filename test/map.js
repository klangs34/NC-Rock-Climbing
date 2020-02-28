$(document).ready(() => {
    const button = $("#initMap");

    function initMap(lat, lng, routes) {
        console.log(routes);
        const map = new google.maps.Map(document.getElementById("map"), {zoom: 10, center: {lat: lat, lng: lng}});
        console.log(map);
        const markers = [];
        const infoWindows = [];

        routes.forEach((route, index) => {
            const position = {lat: route.lat, lng: route.lng};
            console.log(route);
            console.log(position);
            const marker = new google.maps.Marker({position: position, map: map, label: index});
            markers.push(marker);

            const infoWincontent = document.createElement("div");
            const line1 = document.createElement("p");
            const line2 = document.createElement("p");
            line1.textContent = route.name + ":  lat: " + route.lat + ", long: " + route.lng;
            line2.textContent = "difficulty: " + route.difficulty + ", rating: " + route.rating;

            infoWincontent.appendChild(line1);
            infoWincontent.appendChild(line2);

            console.log(line1);
            console.log(line2);
            const infowin = new google.maps.InfoWindow({content: infoWincontent});
            console.log(markers);

            marker.addListener("click", () => {
                infowin.open(map, marker);
            });
        });
    }

    button.on("click", () => {
        const googleAPIKey = "AIzaSyDa0VYRLVZSiVi2MxcaF-2iORHEBcV0dHM";
        const mountainAPIKey = "200689747-d1e6e46b3dc0d8d175970060766a0430"
        const mapURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Raleigh&inputtype=textquery&fields=geometry&key=${googleAPIKey}`;

        $.get(mapURL, data => {
            console.log(data);

            const latitude = parseFloat(data.candidates[0].geometry.location.lat);
            const longitude = parseFloat(data.candidates[0].geometry.location.lng);
            console.log(latitude);
            console.log(longitude);
            const mountainURL = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${latitude}&lon=${longitude}&maxDistance=20&maxResults=20&key=${mountainAPIKey}`;
      
            $.get(mountainURL, data => {
                console.log(data);
                const routes = [];
                const routesRaw = data.routes;

                routesRaw.forEach(routeRaw => {
                    const route = {
                        name: routeRaw.name,
                        difficulty: routeRaw.rating,
                        rating: routeRaw.stars,
                        lat: routeRaw.latitude,
                        lng: routeRaw.longitude,
                    };

                    routes.push(route);
                });
                console.log(routes);
                initMap(latitude, longitude, routes);

            });
        });
    });
});