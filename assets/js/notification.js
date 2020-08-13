if (Notification.permission !== "granted") {
    sendSubscriptionToServer();
    document.getElementById("getpush").classList.remove('hide');
} else {
    const messaging = firebase.messaging();
    const appsNotices = $('.apps .notices');
    appsNotices.html('<p>Fetching your Push Token 📦</p>');
    messaging.getToken()
        .then(function(token) {
            if (document.getElementById("tokens") != null) {
                console.log(token);
                appsNotices.empty();
                appsNotices.append('<pre>your Free Push Token : ' + token + ' </pre>');
                document.getElementById("getpush").classList.add('hide');

                firebase.auth().onAuthStateChanged(function(user) {
                    var user = firebase.auth().currentUser;
                    if (user) {
                        function GetUsertoken(user) {
                            firebase.database().ref('userstoken/' + user.uid).set(userstoken).catch(error => {
                                console.log(error.message);
                            });
                        }
                        var userstoken = {
                            uid: user.uid,
                            usertoken: token,
                        }
                        GetUsertoken(userstoken)

                        function getUserData() {
                            firebase.database().ref('userstoken/' + user.uid).once("value", snap => {
                                console.log(snap.val())
                            })
                        }
                        getUserData();
                    } else if (user == null) {
                        console.log('Error on Token Storage');
                    } else {
                        console.log('Error on Token Storage');
                    }
                    //})
                    // $.ajax('https://example.firebaseio.com/freshtokens/' + token + '.json', {
                    //    method: 'PUT',
                    //    data: 'true',
                    //    success: function(data) {
                    //       if (data == true) {
                    //console.log('Token Stored in the Server');
                    //       }
                    //    },
                    //    error: function(error) {
                    // console.log('ERROR: ', error.statusText);
                    //    }
                })
            }
        }).catch(function(err) {
            console.log(err);
            console.log('Push Token Generation Error');
            appsNotices.empty();
            if (document.getElementById("tokens") != null) {
                document.getElementById("tokens").innerHTML = '<div class="notification is-danger">Push Token Generation Error.</div>';
                document.getElementById("getpush").style.visibility = 'hidden';
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
}

function sendSubscriptionToServer() {
    if (document.getElementById("getpush") != null) {
        document.getElementById("getpush").addEventListener('click', e => {
            document.getElementById("getpush").classList.add('hide');
            const messaging = firebase.messaging();
            const appsNotices = $('.apps .notices');
            appsNotices.html('<img src="/assets/images/loader.gif" alt="san loader"><br>');
            messaging.requestPermission()
            messaging.getToken()
                .then(function(token) {
                    console.log(token);
                    appsNotices.empty();
                    appsNotices.append('<div class="notification is-warning">Successfully Subscribed to the Free Push Notification Updates.</div>');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                })
                .catch(function(err) {
                    console.log('Permission denied');
                    appsNotices.empty();
                    if (document.getElementById("tokens") != null) {
                        document.getElementById("tokens").innerHTML = '<div class="notification is-danger">Push Notification Blocked Please Allow your Browser to Get Updates.</div>';
                        document.getElementById("getpush").style.visibility = 'hidden';
                    }
                });
        })
    }
}