const sideBarWidth = $("#side-bar").outerWidth();
const eventDateString = "2022-12-31";
const eventDate = new Date(eventDateString);
$(".openLink").click(function () {
    if ($("#side-bar").css("left") == "0px") {
        // opened
        $("#side-bar").animate({ left: -sideBarWidth }, 500);
        $(".move").animate({ "margin-left": 0 }, 500);
    } else {
        // Closed
        $("#side-bar").animate({ left: 0 }, 500);
        $(".move").animate({ "margin-left": sideBarWidth }, 500);
    }
});

$("#closeIcon").click(function (e) {
    $("#side-bar").animate({ left: -sideBarWidth }, 500);
    $(".move").animate({ "margin-left": 0 }, 500);
});

$(document).ready(function () {
    // Singer
    $(".singer h2").eq(0).addClass("selected");
    for (let i = 1; i < 4; i++) {
        $(".singer h2").eq(i).hide();
    }
});
$(".singer button").click(function (e) {
    // console.log($(this).nextAll());
    $(this).next().slideToggle(500);
    // $(".singer h2").removeClass("selected");
    $(".singer h2").removeClass("selected");
    $(this).next().addClass("selected");
    $(".singer h2").not(".selected").slideUp(500);
});

// Count down
function getCountDown() {
    let todaysDate = new Date();

    let seconds = Math.floor((eventDate - todaysDate) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    $("#days h3").html(`<h3>${days} d</h3>`);
    $("#hours h3").html(`<h3>${hours} h</h3>`);
    $("#minutes h3").html(`<h3>${minutes} m</h3>`);
    $("#seconds h3").html(`<h3>${seconds} s</h3>`);
    setTimeout(getCountDown, 1000);
}
getCountDown();

// Mail Icon
$(".contacts li").eq(1).css("color", "#d8383c");

$('#message').keyup(function (e) {
    // console.log($(this).val());
    let currentMessage = $(this).val().length;
    // console.log(currentMessage)
    let remainingLength = 100 - currentMessage;
    $('#remaining-characters').text(remainingLength);
});
