# Web Push Notification

A Simple Static Site with Web Auth Built Using Firebase for Web Push Notification.

## Requirements

- Firebase project
- Firebase Project Web SDK - <https://firebase.google.com/docs/web/setup>
- Enable Google Firebase web Auth - <https://firebase.google.com/docs/auth/web/google-signin>
- Firebase Realtime Database - <https://firebase.google.com/docs/database>

## Features

it is Pure Static site Built Using

- HTML
- CSS
- Javascript

you can Hosted it Freely on Github pages and Netlify

## Setup

- Download or Clone this Repo Files to your Server
- Create new Firebase project - <https://firebase.google.com/>
- Setup Project for Web app and Open `app.js` File <https://github.com/mskian/subscribe/blob/master/assets/js/app.js> and add your Firebase Project Web SDK
- Next Goto **Authentication** in Sign-in providers Enable the Google Sign-in Method
- Add your Domain to Authorized domains you can find this Option on elow the Sign-in Method tab
- Next Goto Realtime Databse - Create New database and Update the Database Rules
- Add this Below Rules on Database Rules Section

```json
{
	"rules": {
		"users": {
			"$uid": {
				".read": "$uid === auth.uid",
				".write": "$uid === auth.uid"
			}
		},
    "userstoken": {
			"$uid": {
				".read": "$uid === auth.uid",
				".write": "$uid === auth.uid"
			}
		}
	}
}
```

- Save and Publish the Rules
- That's all Our Site Setup is Done - Sign-in with your Google Account and Test the Site

## Send Push Notifications

Currently i am working on Custom Dashboard for Sending Push notifications
you can send Push Notification via cURL - <https://firebase.google.com/docs/cloud-messaging/js/first-message>

```sh
curl -X POST -H "Authorization: <CLOUD MESSAGING SERVER KEY> -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Hello World",
    "body": "Test Push",
    "icon": "https://subscribe.example.com/assets/icons/Icon-48.png",
    "click_action": "https://example.com"
  }
  "to": "<USER PUSH TOKEN>"
}' "https://fcm.googleapis.com/fcm/send"
```

## LICENSE

MIT
