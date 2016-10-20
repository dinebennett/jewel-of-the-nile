var firebaseUrl = 'https://year-end-d85ea.firebaseio.com/rsvp.json?auth=8ibhhSs1qae3oKRCITCcymlVpFLOxsLDHfRj4VXr';

$.get(firebaseUrl, function (data) {
    DownloadJSON2CSV(data);
});

function DownloadJSON2CSV(objArray) {
    var array = [];
    for (var key in objArray) {
        if (objArray.hasOwnProperty(key)) {
            array.push(objArray[key]);
        }
    }
    var str = '';
    var line = '';
    var headings = [];
    headings.push('name');
    line += 'name';
    for (var index in array[0]) {
        if (index !== 'name') {
            if (line != '') line += ','
            line += index;
            headings.push(index);
        }
    }
    str += line + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var j in headings) {
            if (line != '') line += ','
            line += array[i][headings[j]];
        }
        str += line + '\r\n';
    }

    var displayHtml = '<table class="table table-striped"><thead><tr>';
    for (var h in headings) {
        displayHtml += "<th>"+headings[h]+"</th>";
    }
    displayHtml += "</tr></thead><tbody>";
    for (var i = 0; i < array.length; i++) {
        displayHtml += "<tr>";
        for (var j in headings) {
            displayHtml += '<td>'+ array[i][headings[j]] + '</td>';
        }
        displayHtml += "</tr>";
    }
    displayHtml += "</tbody></table>";


    $(".last-ten").html(displayHtml);

    $("a#download-link").attr("href", "data:text/csv;charset=utf-8," + encodeURI(str)).attr("download", "rsvp-data.csv");
    $("a#download-link").attr("disabled", false);
}