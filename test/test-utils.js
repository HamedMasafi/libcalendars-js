function fill_calendars(el) {
    var select = document.getElementById(el)
    for (var i = 0; i < __calendars_list.length; i++) {
        var opt = document.createElement('option');
        opt.value = __calendars_list[i].nm;
        opt.innerText = __calendars_list[i].name + " (" + __calendars_list[i].nm + ")";
        select.appendChild(opt);
    }
}

function log(title, text) {
    document.getElementById("p").innerHTML += "<strong>"
        + title + ":</strong> " + text + "<br />";
}

function calendar_codes() {
    var r = [];
    for (var i = 0; i < __calendars_list.length; i++)
        r.push(__calendars_list[i].nm);
    return r;
}
function calendar_names() {
    var r = [];
    for (var i = 0; i < __calendars_list.length; i++)
        r.push(__calendars_list[i].name);
    return r;
}
