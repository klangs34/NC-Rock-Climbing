function initMap(lat, lng, routes) {
    const map = new google.maps.Map(document.getElementById("map"), {zoom: 10, center: {lat: lat, lng: lng}});

    routes.forEach((route, index) => {
        const position = {lat: route.lat, lng: route.lng};
        const marker = new google.maps.Marker({position: position, map: map, label: index});

        const infoWincontent = document.createElement("div");
        const line1 = document.createElement("p");
        const line2 = document.createElement("p");
        const saveBtn = document.createElement("button");
        const dropBtn = document.createElement("button");
        line1.textContent = route.name + ":  lat: " + route.lat + ", long: " + route.lng;
        line2.textContent = "difficulty: " + route.difficulty + ", rating: " + route.rating;
        saveBtn.textContent = "Save site";
        dropBtn.textContent = "Drop site";

        infoWincontent.appendChild(line1);
        infoWincontent.appendChild(line2);
        infoWincontent.appendChild(saveBtn);
        infoWincontent.appendChild(dropBtn);

        const infowin = new google.maps.InfoWindow({content: infoWincontent});

        marker.addListener("click", () => {
            infowin.open(map, marker);
        });

        saveBtn.addEventListener("click", () => {
            $.post("/api/routes", route);
            marker.setMap(null);
            infowin.close();
        });

        dropBtn.addEventListener("click", () => {
            marker.setMap(null);
            infowin.close();
        })
    });
};

module.exports = initMap;