window.addEventListener('load', function () {

  var globalTripineer = [];
  var globalID = [];
  var realIDGlobal = [];

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
    leeway: 60
  });
  //-------------------------------------------------

  //------------------------------------------------
  // buttons and event listeners
  var userProfile;
  var loginBtn = document.getElementsByClassName('login')
  var createBtn = document.getElementsByClassName('create')
  var logoutBtn = document.getElementsByClassName('logout')

  loginBtn[0].addEventListener('click', function (e) {
    e.preventDefault();
    webAuth.authorize();
  });
  createBtn[0].addEventListener('click', function (e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn[0].addEventListener('click', logout);

  function logout() {
    localStorage.clear()
    document.getElementById('userImage').innerHTML = "&#160;"
    alert("Thanks for logging out!")
  }

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log(new Date().getTime() < expiresAt)
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function (err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        getProfile();
      } else if (err) {
        console.log(err);
        alert(
          'Something went wrong, try logging in again.'
        );
      }
    });
  }

  function getProfile() {
    if (!userProfile) {
      var accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log('Access token must exist to fetch profile');
      }
      webAuth.client.userInfo(accessToken, function (err, profile) {
        if (profile) {
          userProfile = profile;
          displayProfile();
        }
      });
    } else {
      displayProfile();
    }
  }

  function displayProfile() {
    // display the profile
    console.log(userProfile)
    document.getElementById('userImage').innerHTML = "<img class='image-circle' src='" + userProfile.picture + "'>" + "Hello, " + userProfile.given_name

    var firstName = userProfile.given_name
    var lastName = userProfile.family_name
    var email = userProfile.email
    var username = userProfile.nickname

    const tripineerUser = {
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'username': username
    }

    globalTripineer.push(tripineerUser);
    console.log(tripineerUser);
    var emailArray = []
    $.get('https://evening-dawn-29918.herokuapp.com/' + 'tripineer_user')
      .then(function (data) {
        // console.log(data);
        // email = email.toString()
        // console.log(typeof email);
        for (var i = 0; i < data.length; i++) {
          emailArray.push(data[i]["email"])
        }


        if (emailArray.some(x => email === x)) {
          console.log("you exist");
          $('#createdTrips').css({
            "display": "flex",
            "height": "50px",
            "background-color": "white",
            "font-size": '1.5em'
          })

          // $.get('https://evening-dawn-29918.herokuapp.com/tripineer_user/' + email)
          // .then(function(data){
          //   console.log(data)
          //   var realID = data[0].id;
          //   realIDGlobal.push(realID)
          // })

          console.log(realIDGlobal[0])
          // $.get('https://evening-dawn-29918.herokuapp.com/trip/' + realIDGlobal)
          //   .then(function(data) {
          //     console.log(data)
          //     for (var i = 0; i < data.length; i++) {
          //       $('#createdTrips').append(
          //
          //         '<div class="tripLink" data-tripID="'+ data[i].id + '">' + data[i].id + '</div>'
          //       )
          //     }
          //     $('.tripLink').on('click', function(event){
          //       event.preventDefault()
          //       $('main').css({
          //         'height': '600px',
          //         'width': '100%'
          //       })
          //       $('.search-location').css({
          //         'top': '1.5%',
          //         'left': '30%',
          //         'height': '10px !important',
          //       })
          //       $('.search-activity').css({
          //         'top': '1.5%',
          //         'left': '50%',
          //         'height': '10px !important',
          //       })
          //
          //       $.get('https://evening-dawn-29918.herokuapp.com/activity')
          //     })
          //   })


          // console.log('you exist');
        } else {
          console.log("you don't exist");
          $.post('https://evening-dawn-29918.herokuapp.com/tripineer_user/', tripineerUser)
            .then(result => {
              console.log(result);
            })
        }
        //-------------
        $.get('https://evening-dawn-29918.herokuapp.com/tripineer_user/' + email)
          .then(function (data) {
            console.log(data)
            var realID = data[0].id;
            realIDGlobal.push(realID)
          })

        var realIDLocal = realIDGlobal[0];
        $.get('https://evening-dawn-29918.herokuapp.com/trip/' + 4)
          .then(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
              $('#createdTrips').append(

                '<div class="tripLink" data-tripID="' + data[i].id + '">' + data[i].id + '</div>'
              )
            }
            $('.tripLink').on('click', function (event) {
              event.preventDefault()
              $('#main-pic').css({
                'display': 'none',
                'height': '600px',
                'width': '100%'
              })
              $('main').css({
                'height': '100%',
                'width': '100%'
              })
              $('.search-location').css({
                'top': '1.5%',
                'left': '30%',
                'height': '10px !important',
              })
              $('.search-activity').css({
                'top': '1.5%',
                'left': '50%',
                'height': '10px !important',
              })

              $.get('https://evening-dawn-29918.herokuapp.com/activity/' + 4)
                .then(function (data) {
                  var activityData = data;
                  console.log(activityData)
                  var source = $("#trip-template").html();
                  var template = Handlebars.compile(source);
                  var context = {
                    trips: activityData
                  };
                  var html = template(context);
                  $('.activityContainer').prepend(html)
                })
            })
          })

        //--------------
      })
    $.get('https://evening-dawn-29918.herokuapp.com/tripineer_user/' + email)
      .then(function (data) {
        console.log(data)
        var myid = data[0].id;
        globalID.push(myid);
        console.log("push", myid)
        $('#makeTrip').click(function (event) {
          event.preventDefault()
          console.log('ive been clicked')
          const tripCreation = {
            "user_id": myid,
          };
          console.log(tripCreation)
          $.post('https://evening-dawn-29918.herokuapp.com/trip', tripCreation)
            .then(result => {
              console.log(result)
            })
        })
      })

  }

  handleAuthentication();
  //----------------------------


  const AuthKey = "Bearer 2Ly-4eOWIdU0p6M65l1EB_1jNjNgqIDf4XD9Vmmw727kvqIcrlYAQON-D6t7pCAhmMVsh1No-X3FyCbbdsIgcT65lyYEcpNqycJKvTShp-1xjITEhxZOiWKLLei_WXYx"
  const url = "https://api.yelp.com/v3/"
  const corsURL = "https://cors-anywhere.herokuapp.com/"
  const apiURL = "https://evening-dawn-29918.herokuapp.com"

  $("#input-search-activity, #input-search-location").keyup(function (event) {
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
          success: function (data) {
            console.log(data);

            var yelpData = data.businesses;
            console.log(yelpData)

            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var context = {
              businesses: yelpData
            };
            var html = template(context);
            $('#main-pic').hide()
            $('.tripContainer').prepend(html)
            $('.tripButton').on("click", function (event) {
              event.preventDefault();

              console.log(globalTripineer)
              // alert("click worked")
              // var name = $(".card-Title").innerHTML()
              var name = $(this).attr("data-name")
              var rating = $(this).attr("data-rating")
              var image = $(this).attr("data-img")
              //  console.log(name, rating, image)
              console.log(globalID)


              const cardData = {
                'name': name,
                'rating': rating,
                'image_url': image,
                "trip_id": globalID[0],
              }

              console.log(cardData);
              $.post('https://evening-dawn-29918.herokuapp.com/activity', cardData)
                .then(result => {
                  console.log(result);
                })
            })
          }
        })
      }
      $('main').css({
        'height': '100%',
        'width': '100%'
      })
      $('.search-location').css({
        'top': '1.5%',
        'left': '30%',
        'height': '10px !important',
      })
      $('.search-activity').css({
        'top': '1.5%',
        'left': '50%',
        'height': '10px !important',
      })
      // $('nav').css({
      //   'margin-bottom': '20px',
      // })
      $('#input-search-activity').val('')
      $('#input-search-location').val('')
    }
  });




  //----------------------------
});

// for (var i = 0; i < data.length; i++) {
//   if (email === data[i]["email"]) {
//     console.log("your account exists already");
//   } else {

//   }
//   console.log(data[i]["email"]);
// }