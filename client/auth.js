window.addEventListener('load', function() {

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
    leeway: 60
  });

  // buttons and event listeners
  var userProfile;
  var loginBtn = document.getElementsByClassName('login')
  var createBtn = document.getElementsByClassName('create')
  var logoutBtn = document.getElementsByClassName('logout')

  loginBtn[0].addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });
  createBtn[0].addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn[0].addEventListener('click', logout);

  function logout() {
    localStorage.clear()
    document.getElementById('lblUserName').innerHTML= "&#160;"
    document.getElementById('userImage').innerHTML= "&#160;"
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
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        getProfile();
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
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
      webAuth.client.userInfo(accessToken, function(err, profile) {
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
    document.getElementById('lblUserName').innerHTML= "Hello, " + userProfile.name
    document.getElementById('userImage').innerHTML= "<img class='image-circle' src='" + userProfile.picture + "'>"
  }

   handleAuthentication();
});
