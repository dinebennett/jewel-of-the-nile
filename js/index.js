var firebaseUrl = 'https://year-end-d85ea.firebaseio.com/rsvp.json?auth=8ibhhSs1qae3oKRCITCcymlVpFLOxsLDHfRj4VXr';

$(".submit-button").click(function () {
    $name = $("#name").val().trim();
    $partner = $("#partner").val();
    $transport = $("#transport").val();
    $meal = $("#meal").val();
    console.log($name + " " + $partner + " " + $transport + " " + $meal);
    if ($meal === null) {
        $meal = "none";
    }
    if (($name.length < 1) || ($partner === null) || ($transport === null)) {
        $('#myModal').modal('show');
    } else {
        $(".submit-button").text("Submitting...");
        $(".submit-button").prop("disabled", true);
        var person = {
            "name": $name,
            "partner": $partner,
            "transport": $transport,
            "meal": $meal,
        };
        $.post(firebaseUrl, JSON.stringify(person))
            .done(function (msg) {
                $(".parent").toggleClass("flipped");
                $(".front").hide();
                confetti();
            })
            .fail(function (xhr, status, error) {
                $('#failModal').modal('show');
            });
    }
});