import PushNotification from 'react-native-push-notification'
import Share from 'react-native-share';

// PushNotification.configure({
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function(notification) {
//     console.log('LOCAL NOTIFICATION ==>', notification)
//   },

//   popInitialNotification: true,
//   requestPermissions: true
// })

const shareEmailImage = async (url) => {
  alert(url)
  const shareOptions = {
    title: 'Share file',
    email: 'email@example.com', 
    social: Share.Social.EMAIL, 
    failOnCancel: false,
    urls:[ url],
  };

  try {
    const ShareResponse = await Share.open(shareOptions);
  } catch (error) {
    console.log('Error =>', error);
  }
};

export const LocalNotification = (item) => {
  
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'Ready to Publish',
    subText: 'Local Notification Demo',
    title: 'Ready to Publish',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION123 ==>', notification,"item",item)
      shareEmailImage(item.url)
      // alert(item.url)
    },
  
    popInitialNotification: true,
    requestPermissions: true
  })
  
}


export const ScheduledLocalNotification = () => {
  PushNotification.localNotificationSchedule({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Scheduled Notification Title',
    message: 'Scheduled Notification Message',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date: new Date(Date.now() + 3 * 1000) // in 3 secs
  })
}
