import React from 'react'
import { Text, View, Button, StyleSheet,Share } from 'react-native'
import {
  LocalNotification,
  ScheduledLocalNotification
} from './src/services/LocalPushController'

import RemotePushController from './src/services/RemotePushController'
import Share1 from 'react-native-share';






export default class App extends React.Component {





  componentDidMount() {

    fetch("https://resources.vega6.info/get-photo/search",
     {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDAyNTUxOTIsImp0aSI6IkNmc0lJRmYxWm43TUNJdUJrS2pKVVEiLCJpc3MiOiJodHRwczpcL1wvcmVzb3VyY2VzLnZlZ2E2LmluZm9cLyIsIm5iZiI6MTYwMDI1NTIwMiwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsImFwcF91cmwiOiJOVWxsIn19.Y4UpB0--8kQWHFHrONhyJy_jGl3VmDZ93Y-qn7yD6tLZRmzktXeIf4YTdraNIMrYTucuVYLB6VrWVhN4TrZpaA`,
      },
    }
    ).then((res) => res.json())
      .then((res) => {
        console.log('-------', res);      

    })
      .catch((error) => {

        console.log("ERROR ", error)
      })
           

    // fetch(auth).then((response) => {
    //   console.log('-------', response);
      
    // })
    //   .catch((error) => {

    //     console.log("ERROR ", error)
    //   })
                                        

  }





   handleButtonPress = () => {
    LocalNotification()
   }

 handleScheduleNotification = () => {
    ScheduledLocalNotification()
  }
   onShare = async () => {
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

   shareEmailImage = async () => {
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

  render() {
    return (
      <View style={styles.container}>
      <Text>Press a button to trigger the notification</Text>
      {/* <View style={{ marginTop: 20 }}>
        <Button title={'Local Push Notification'} onPress={()=>this.handleButtonPress()} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title={'Scheduled Local Push Notification'}
          onPress={()=>this.handleScheduleNotification()}
        />

      </View>
      <Button onPress={()=>this.onShare()} title="Share" />


      <RemotePushController /> */}







      </View>
    )
  }
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

