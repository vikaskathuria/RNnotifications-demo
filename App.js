import React from 'react'
import { Text, View, Button, StyleSheet,Share } from 'react-native'
import {
  LocalNotification,
  ScheduledLocalNotification
} from './src/services/LocalPushController'

import RemotePushController from './src/services/RemotePushController'
import Share1 from 'react-native-share';
const App = () => {
  const handleButtonPress = () => {
    LocalNotification()
   }

  const handleScheduleNotification = () => {
    ScheduledLocalNotification()
  }
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

  const shareEmailImage = async () => {
    const shareOptions = {
      title: 'Share file',
      email: 'email@example.com',
      social: Share1.Social.EMAIL,
      failOnCancel: false,
      urls: "https://www.npmjs.com/package/react-native-social-share",
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log("ShareResponse",ShareResponse);
      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      // setResult('error: '.concat(getErrorString(error)));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Press a button to trigger the notification</Text>
      <View style={{ marginTop: 20 }}>
        <Button title={'Local Push Notification'} onPress={handleButtonPress} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title={'Scheduled Local Push Notification'}
          onPress={handleScheduleNotification}
        />

      </View>
      <Button onPress={onShare} title="Share" />


      <RemotePushController />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20
  }
})

export default App
