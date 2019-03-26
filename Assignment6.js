$(document).ready(function (event) {
    //Setting the initial position of pop-up image            
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    $("#display").css("top", ((viewportHeight / 2) - 150) + "px");
    $("#display").css("left", ((viewportWidth / 2) - 250) + "px");

    var i;      //For storing the image index
    var count = $(".contents ul li").length;        //Count of total image

    //When any image is clicked, show the pop-up image and get the image index
    $(".contents li img").click(function () {
        $(".contents ul").css("opacity", 0.2);
        $("#display").css("display", "block");
        i = $(".contents li img").index(this) + 1;
        img_slideshow();
    });

    // Display the current image, set the title, link and display previous & next links
    function img_slideshow() {
        var curr_img = $(".contents li:nth-child(" + i + ") > img");

        $("#displayImg").attr("src", curr_img.attr("src"));
        $("#displayImg").fadeOut(0);
        $("#displayImg").fadeIn(500);
        $("#img-name").text(curr_img.attr("alt") + " - [#" + i + " of " + count + "]");
        $("#imageLink").attr("href", curr_img.attr("src"));
    };

    // What to do if previous, next or close button is clicked
    $("#previous").click(function () {
        previous_image();
    });

    $("#next").click(function () {
        next_image();
    });

    $("#cross").click(function () {
        close_display();
    });

    function previous_image() {
        if (i > 1) {
            i = i - 1;
        }
        else {
            i = count;
        };
        img_slideshow();
    };
    function next_image() {
        if (i < count) {
            i = i + 1;
        }
        else {
            i = 1;
        };
        img_slideshow();
    };
    function close_display() {
        $("#display").css("display", "none");
        $(".contents ul").css("opacity", 1);
    };


    //Making the keyboard Esc, prev. & next keys live
    $(document).keypress(function (e) {
        if (e.keyCode == 37) {
            previous_image();
        }
        if (e.keyCode == 39) {
            next_image();
        }
        if (e.keyCode == 27) {
            close_display();
        }
    });

    // Reposition and resize the image according to viewport
    $(window).resize(function () {
        viewportWidth = $(window).width();
        viewportHeight = $(window).height();
        $("#display").css("top", ((viewportHeight / 2) - 150) + "px");
        $("#display").css("left", ((viewportWidth / 2) - 250) + "px");
        if (viewportWidth < 500) {
            $("#display").css("left", "0px");
            $("#display").css("width", viewportWidth + "px");
            $("#displayImg").css("width", (viewportWidth - 10) + "px");
        };
    });

    //Slideshow functions

    $('#play').click(function (e, simulated) {
        if (!simulated) {
            autoAdvance();
            $("#pause").css("display", "block");
            $("#play").css("display", "none");
        }
    });

    function autoAdvance() {
        $('#next').trigger('click', [true]);
        timeOut = setTimeout(autoAdvance, 3000);
    };

    var timeOut = null;
    $('#pause, #previous, #next, #cross').click(function (e, simulated) {
        if (!simulated) {
            clearTimeout(timeOut);
            $("#pause").css("display", "none");
            $("#play").css("display", "block");
        }
    });
}) 