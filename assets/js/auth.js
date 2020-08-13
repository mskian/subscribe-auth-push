var provider = new firebase.auth.GoogleAuthProvider();

if (document.getElementById("btnLogin") != null) {
    document.getElementById("btnLogin").addEventListener('click', e => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log(user);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode);
            console.log(credential);
            console.log(email);
            console.log(error.message);
            if (document.getElementById("results") != null) {
                document.getElementById("results").innerHTML = '<div class="notification is-danger"> ' + errorMessage + '</div>';
            }
          });
    })
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = '/user.html';
    }
})