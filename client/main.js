const AuthKey = "Bearer 2Ly-4eOWIdU0p6M65l1EB_1jNjNgqIDf4XD9Vmmw727kvqIcrlYAQON-D6t7pCAhmMVsh1No-X3FyCbbdsIgcT65lyYEcpNqycJKvTShp-1xjITEhxZOiWKLLei_WXYx"
const url = "https://api.yelp.com/v3/"
const corsURL = "https://cors-anywhere.herokuapp.com/"
const apiURL = "https://salty-island-62883.herokuapp.com/"

$(() => {
  console.log('jQuery is connected!!!!!');
})
$(document).ready(function() {
  $('.parallax').parallax();
});

$("#espanol").click(function() {
  alert("We're' learning spanish still, be tune")
})


$("#input-search-activity, #input-search-location").keyup(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var locationSearch = $("#input-search-location").val();
    var activitySearch = $("#input-search-activity").val();
    // window.location.assign("tripCards.html");

    if (locationSearch.length == 0) {
      alert("Enter Location")
    } else {
      console.log(activitySearch, locationSearch);
      var businessURL = url + "businesses/search?location=" + locationSearch + "&categories=" + activitySearch
      $.ajax({
        type: "GET",
        url: corsURL + businessURL,
        headers: {
          "authorization": "Bearer 2Ly-4eOWIdU0p6M65l1EB_1jNjNgqIDf4XD9Vmmw727kvqIcrlYAQON-D6t7pCAhmMVsh1No-X3FyCbbdsIgcT65lyYEcpNqycJKvTShp-1xjITEhxZOiWKLLei_WXYx",
          "expires_in": 641713742,
          "token_type": "Bearer"
        },
        success: function(data) {
          console.log(data);

          var yelpData = data.businesses;
          console.log(yelpData)

          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = {businesses: yelpData};
          var html = template(context);

          $('.tripContainer').append(html)
        }
      })




    }
    $('.search-location').css({
      'top': '1%',
      'left': '5%',
    })
    $('.search-activity').css({
      'top': '1%',
      'left': '25%',
    })
    $('#input-search-activity').val('')
    $('#input-search-location').val('')
  }
});


// $(document).ajaxStart(function() {
//   $(".preloader-wrapper").css({
//     'display':'block',
//     'position':'absolute',
//     'top':'45%',
//     'left':'45%',
//   });
// });
// $(document).ajaxComplete(function() {
//   $(".preloader-wrapper").css({
//       'display':'none'
//     })
//
//     $('.cardDiv').css({
//       'display':'grid',
//       'border':'1px solid black',
//       // 'z-index':'99',
//     })
//     $('.cardData').css({
//       'display':'grid',
//       'border':'1px solid black'
//     })
//
//
//     for (var i=0;i<5;i++){
//     $('.cardDiv').appendTo(
//       $('.cardData')
//     )
//     console.log("hi");
//   }
// });






$("#input-first-name").keyup(function(event) {
  // var firstName = $("input-first-name").val()
  if (event.keyCode == 13) {

    event.preventDefault()
    var firstName = $("#input-first-name").val();
    console.log(firstName);
    const postName = {
      "first_name": firstName,
    }
    $.post(apiURL + "tripineer_user/", postName)
      .then(result => {
        console.log(result)
      })
  }
})

// $.post(apiURL + "activity", postActivity)
//   .then(result => {
//     console.log(result);
//   })
//
//
//   $.post(apiURL + "trip", postActivity)
//     .then(result => {
//       console.log(result);
//     })
