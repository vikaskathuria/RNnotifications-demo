import PushNotification from 'react-native-push-notification'
import Share from 'react-native-share';
const shareEmailImage = async (url) => {
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

export const LocalNotification = (url) => {
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
      console.log('LOCAL NOTIFICATION123 ==>', notification,"item")
      shareEmailImage(url)
    },
  
    popInitialNotification: true,
    requestPermissions: true
  })
  
}

