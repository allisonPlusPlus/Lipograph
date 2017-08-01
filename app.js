var state = {
  query: ""
};

function getFlickr(query) {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + query + '&format=json&nojsoncallback=1';
    $.ajax({
        type: "GET",
        url: proxy + url,
        // dataType: "json",
        success: function(response) {
            renderFlickrResults(response, query);
        },
        error: function(xhr, status, e) {
            console.log(status, e);
        }
    });
}


function getYoutube(query) {
  var youTubeURL = "https://www.googleapis.com/youtube/v3/search";
  var data = {
        maxResults: '6',
        part: 'snippet',
        key: 'AIzaSyApCFcADbM3EgInOvuv2IevCLHYUDjaCfs',
        q: query,
    };
    $.getJSON(youTubeURL, data, displayYoutubeResults);
}


function displayYoutubeResults(response) {
  console.log("displayYoutubeResults");
  function appendYoutubeResults(item, i) {
    var watchUrl = "https://www.youtube.com/watch?v=";

          //Display thumbnail
          $(`#result${i+1}`).find("img").attr('src', item.snippet.thumbnails.high.url);

          // //Make thumbnail link to video
          $(`#result${i+1}`).find('a').attr('href', watchUrl + item.id.videoId);
      }

      // Mouse Hover Effect
    function hoverYoutubeTitle(item, i) {
        $(`#result${i+1}`).mouseover(function() {
            $(`.title${i+1}`).html(response.items[i].snippet.title);
        });
        $(`#result${i+1}`).mouseout(function() {
            $("h2").empty();
        });
    }

response.items.forEach(appendYoutubeResults);
response.items.forEach(hoverYoutubeTitle);


}

function clearImages(query) {
  for (var i = 0; i < 6; i++) {
     // Clear results by setting to an empty string
      $(`#result${i+1}`).find("img").attr('src', "");
      $(`#result${i+1}`).find("a").attr('href', "");
    }
 getYoutube(query)

}


function chooseVideo(query) {
  $(".videos").on("click", function() {
     clearImages(query);
  });
}

function chooseImages() {
  $(".images").on("click", function() {
    clearVideos();
    getFlickr(state.query);
    console.log("chooseImages on click")
  });
}

function clearVideos() {
  console.log("clearVideos")
  for (var i = 0; i < 6; i++) {
     // Clear results by setting to an empty string
      $(`#result${i+1}`).find("img").attr('src', "");
      $(`#result${i+1}`).find("a").attr('href', "");
    }

}





function renderFlickrResults(response, query) {
    'use strict';
    //Hide lipstick smudges image and headline
    $(".smudges").addClass("hidden");
    $(".headline").addClass("hidden");
    // Unhide Results
    $(".js-search-results").removeClass("hidden");
    // fadeIn Results
    $(".js-search-results").hide().fadeIn("slow");
    // Hide divs that are not being used to render images
    $(".output").addClass('hidden');
    // Change instructions to user for results
    $(".instructions").html("Click thumbnail to view image on Flickr or click to view video results")

    for (var i = 0; i < response.items.length; i++) {
        //Render thumbnail images
        $(`#result${i+1}`).find("img").attr('src', response.items[i].media.m);
        //Render thumbnail links
        $(`#result${i+1}`).find("a").attr('href', response.items[i].link);
        $(`#result${i+1}`).removeClass("hidden");
        hoverFlickrTitles(i, query);
    }

    function hoverFlickrTitles(i, query) {
        'use strict'
        $(`#result${i+1}`).mouseover(function() {
            $(`.title${i+1}`).html(response.items[i].title);
        });
        $(`#result${i+1}`).mouseout(function() {
            $(".title").empty();
        });
        chooseVideo(query)
    }
}


function pickColor() {
    $(".rubywoo").on("click", function() {
        state.query = "rubywoo"
        getFlickr("rubywoo");
    });

    $(".ladydanger").on("click", function() {
      state.query = "ladydanger"
        getFlickr("ladydanger");
    });

    $(".candyyumyum").on("click", function() {
      state.query = "candy yumyum"
        getFlickr("candy yumyum");
    });

    $(".heroine").on("click", function() {
      state.query = "mac heroine"
        getFlickr("mac heroine");
    });

    $(".cremednude").on("click", function() {
      state.query = "creme d' nude"
        getFlickr("creme d' nude");
    });

    $(".velvetteddy").on("click", function() {
      state.query = "velvet teddy"
        getFlickr("velvet teddy");
    });

    $(".morange").on("click", function() {
      state.query = "mac morange"
        getFlickr("mac morange");
    });

    $(".chatterbox").on("click", function() {
      state.query = "mac chatterbox"
        getFlickr("mac chatterbox");
    });

    $(".vegasvolt").on("click", function() {
      state.query = "mac vegas volt"
        getFlickr("mac vegas volt");
    });
    chooseImages();
};



$(function() {
    pickColor();
});
