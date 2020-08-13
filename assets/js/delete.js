if (document.getElementById("btndelete") != null) {
    document.getElementById("btndelete").addEventListener('click', e => {
        var user = firebase.auth().currentUser;
        var adaRef = firebase.database().ref('users/' + user.uid);
        adaRef.remove()
            .then(function() {
                console.log("User Data Removed from the Database.");
            })
            .catch(function(error) {
                console.log(error.message);
            });
        var tokRef = firebase.database().ref('userstoken/' + user.uid);
        tokRef.remove()
            .then(function() {
                console.log("User Data Removed from the Database.");
            })
            .catch(function(error) {
                console.log(error.message);
            });
        user.delete().then(function() {
            console.log("Your Account was Deleted")
            if (document.getElementById("acrmv") != null) {
                document.getElementById("acrmv").innerHTML = '<div class="notification is-success">Your Account Was Deleted From our Database</div>';
            }
            setTimeout(() => {
                window.location = "/";
            }, 2000);
        }).catch(function(error) {
            console.log(error.message);
            if (document.getElementById("acrmv") != null) {
                document.getElementById("acrmv").innerHTML = '<div class="notification is-danger"> ' + error.message + '</div>';
            }
        });
    })
}