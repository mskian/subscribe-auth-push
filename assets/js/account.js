const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    if (user) {
        console.log(user);
        if (document.getElementById("useremail") != null) {
            document.getElementById("useremail").innerHTML = '<p>' + user.email + '</p>';
            console.log(user.uid);
            $("#userimage").attr("src", user.photoURL + '=s150-c-mo');
            $("#userimage").attr("alt", user.email);

            function writeUserData(user) {
                firebase.database().ref('users/' + user.uid).set(users).catch(error => {
                    console.log(error.message);
                });
            }
            if (user.displayName == undefined) {
                $('#name').html('<p>Hello \t <b>username Not Found</b></p><br>');
            } else {
                $('#name').html('<p>Hello \t <b>' + user.displayName + '</b>\t 😊</p>');
            }
            var users = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profileimage: user.photoURL,
                verified: user.emailVerified
            }
            writeUserData(users)
        }
        document.getElementById("btnLogOut").classList.remove('hide');
    } else if (user == null) {
        window.location.href = '/';
    } else {
        window.location.href = '/';
    }
})
firebase.auth().onAuthStateChanged(function(user) {
    if (user.emailVerified) {
        console.log('Email is verified');
        if (document.getElementById("status") != null) {
            document.getElementById("status").innerHTML = '<p>✅ Verified user</p>';
        }
    } else {
        console.log('Email is Not verified');
        if (document.getElementById("status") != null) {
            document.getElementById("status").innerHTML = '<p>❎ Email is Not verified Please Check your Email Inbox.</p>';
        }
        user.sendEmailVerification().then(function() {
            console.log("Email verification sent to user");
        });
    }
})
document.getElementById("btnLogOut").addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href = '/';
    console.log('logged out');
})