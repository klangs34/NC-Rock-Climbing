$(document).ready(function() {
    $.get('/api/routes')
    .then(data => {
        console.log(data)
        var routeEl = $('<div>');
        routeEl.append('<ul>');
        var routeLi;
        data.forEach((val, index) => {
            routeLi = $('<li>');
            routeLi.text(val.name);
            routeLi.attr('id', index);

            routeEl.append(routeLi);
        });
        $('#routes').append(routeEl);
    })
})