$(document).ready(function () {
    $('#city-input').on('keypress', function (e) {
        //e.preventDefault();
        var place = e.target.value;
        var keycode = (e.keyCode ? event.keyCode : event.Which);
        if (keycode == '13') {
            $("#search-row").empty();
            $.get(`/api/routes/locate/${place}`)
                .then(data => {

                    const searchDiv = $("#search-row");
                    for (i = 0; i < data.routes.length; i++) {
                        searchDiv.append(`<div class="col s12 m3">
                    <div class="card">
                        <div class="card-image">
                            <img class="responsive-img" style="height:400px" src="${data.routes[i].img}">
                            <span class="card-title">${data.routes[i].name}</span>
                            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                        </div>
                        <div class="card-content">
                            <p>Rating: ${data.routes[i].rating} </p>
                        </div>
                    </div>
                </div>`)
                    }

                })
        }
    })
})