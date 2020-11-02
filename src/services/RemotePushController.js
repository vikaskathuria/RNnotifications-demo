import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
// import { Text, View, Button, StyleSheet,Share } from 'react-native'
import images from '../../images/imagesBase64';
import Share from 'react-native-share';
const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        alert('dd')
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};




const RemotePushController = () => {


  const shareEmailImage = async () => {
    const shareOptions = {
      title: 'Share file',
      email: 'email@example.com', 
      social: Share.Social.EMAIL, 
      failOnCancel: false,
      urls: [images.image1, images.image2],
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      // setResult('error: '.concat(getErrorString(error)));
    }
  };

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token)
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
        shareEmailImage()
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export default RemotePushController
