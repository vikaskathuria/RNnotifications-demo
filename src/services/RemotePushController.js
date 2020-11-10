import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token)
      },
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
      },
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export default RemotePushController
