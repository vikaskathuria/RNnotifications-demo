import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
// import { Text, View, Button, StyleSheet,Share } from 'react-native'
import images from '../../images/imagesBase64';
import Share from 'react-native-share';



const RemotePushController = (props) => {

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
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  useEffect(() => {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token)
      },

      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
        alert(props.url)
        // shareEmailImage()
      },
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export default RemotePushController
