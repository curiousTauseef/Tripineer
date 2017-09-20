const AuthKey = "Bearer 2Ly-4eOWIdU0p6M65l1EB_1jNjNgqIDf4XD9Vmmw727kvqIcrlYAQON-D6t7pCAhmMVsh1No-X3FyCbbdsIgcT65lyYEcpNqycJKvTShp-1xjITEhxZOiWKLLei_WXYx"
const url = "https://api.yelp.com/v3/"
const corsURL = "https://cors-anywhere.herokuapp.com/"
const apiURL = "https://evening-dawn-29918.herokuapp.com/"
// import userProfile from './auth.js'

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
          $('.tripButton').on("click", function(event){
            event.preventDefault();
            // alert("click worked")
            // var name = $(".card-Title").innerHTML()
            var name = $(this).attr("data-name")
            var rating = $(this).attr("data-rating")
            var image = $(this).attr("data-img")
            console.log(name, rating, image)
          })
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


// console.log("almost there")
// $('#buttons').on("click", function(event){
//   event.preventDefault();
//   alert("click worked")
//   var name = $(".card-Title").text()
//   console.log(name)
// })



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
