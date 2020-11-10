import React from 'react'
import { Text, View, Button, StyleSheet, Share, FlatList, Dimensions, ActivityIndicator,TextInput, Keyboard, ImageBackground, TouchableOpacity } from 'react-native'
import {
  LocalNotification,
  ScheduledLocalNotification
} from './src/services/LocalPushController'

import RemotePushController from './src/services/RemotePushController'
import Share1 from 'react-native-share';

import { Icon } from "react-native-elements";

import RNFS from 'react-native-fs';

import { createFilter } from 'react-native-search-filter';

const { width, height } = Dimensions.get("window");

let few = []
export const MinMargin = width / 40;
export const Margin = width / 20;

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imgData: [],
      search: '',
      loading: false,
      url:''
    }  
  }

  componentDidMount() {

    RNFS.readFile("https://s3-us-west-2.amazonaws.com/mediaapidata/images/Soul+Scenes/soul+scenes+057_result.jpg", 'base64')
    .then(res =>{
      console.log("base64",res);
    });
    

    this.getImageData()
  }
  getImageData() {
    this.setState({ loading: true })
    let url = 'https://resources.vega6.info/get-photo/search'
    let auth = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDAyNTUxOTIsImp0aSI6IkNmc0lJRmYxWm43TUNJdUJrS2pKVVEiLCJpc3MiOiJodHRwczpcL1wvcmVzb3VyY2VzLnZlZ2E2LmluZm9cLyIsIm5iZiI6MTYwMDI1NTIwMiwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsImFwcF91cmwiOiJOVWxsIn19.Y4UpB0--8kQWHFHrONhyJy_jGl3VmDZ93Y-qn7yD6tLZRmzktXeIf4YTdraNIMrYTucuVYLB6VrWVhN4TrZpaA`,
      },
    }
    console.log("authh", auth);
    fetch(url, auth)
      .then((res) => res.json())
      .then((res) => {
        console.log('-------', res);
        this.setState({ loading: false })

        if (res && res.data && res.data != "") {
          few = res.data
          this.setState({ imgData: res.data })
        }
      })
      .catch((error) => {
        console.log("ERROR ", error)
        this.setState({ loading: false })

      })

  }

  handleButtonPress = (item) => {
    this.setState({url:item.url})
    LocalNotification(item)
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




  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>  this.handleButtonPress(item)}

        style={{ backgroundColor: "#fff", paddingVertical: MinMargin / 2, width: width / 2, paddingLeft: index % 2 == 0 ? MinMargin / 2 : MinMargin }}>
        <ImageBackground
          defaultSource={require('./images/profile.png')}
          source={{ uri: item.url, cache: 'force-cache' }} style={{ width: (width - (MinMargin * 3)) / 2, height: (width - (MinMargin * 3)) / 2, }} resizeMode="cover">
          <View style={{ padding: MinMargin, flex: 1, justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: height / 45, color: "#fff", textAlign: 'center' }}>{item.name}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

    )
  }


  searchUpdated(term) {
    this.setState({ loading: true, search: term, imgData: [] })
    console.log('hihihihi ', few)
    const KEYS_TO_FILTERS = ['name'];
    if (term) {
      this.setState({ imgData: few.filter(createFilter(term, KEYS_TO_FILTERS)) })
    }
    else {
      this.setState({ imgData: few })
    }
    this.setState({ loading: false })
  }

  clearSearch() {
    Keyboard.dismiss();
    this.setState({ search: '', imgData: [] })
    this.setState({ imgData: few })
  }

  render() {
    const { imgData, search,loading,url } = this.state
    if (loading) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={"blue"}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
        <Button title={'Local Push Notification'} onPress={()=>this.handleButtonPress()} />
      </View>

      
        <View style={{ flex: 2, backgroundColor: 'orange' }}>
          <View style={{ width: width, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 20 }}>
            <View style={styles.Search}>
              <Icon
                name="search1"
                type="antdesign"
                size={height / 40}
                color={"black"}
                containerStyle={{ width: '11%', alignSelf: 'center' }}
                underlayColor='transparent'
              />
              <TextInput
                value={search}
                style={{
                  padding: 0,
                  margin: 0,
                  borderWidth: 0,
                  textAlignVertical: 'center', width: search ? '79%' : '89%', fontSize: height / 55, height: '100%'
                }} onChangeText={(term) => { this.searchUpdated(term) }} placeholder={"Search"} />
              {search ?
                <Icon
                  name="cancel"
                  type="material"
                  size={height / 40}
                  containerStyle={{ width: '10%', justifyContent: 'center' }}
                  color={"grey"}
                  underlayColor='transparent'
                  onPress={() => this.clearSearch()}
                /> : null}
            </View>
          </View>
        </View>
        <View style={{ flex: 8, }}>
          {imgData.length > 0 ?
            <FlatList
              keyboardShouldPersistTaps='handled'
              data={imgData}
              renderItem={this.renderItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Data Found</Text></View>
          }

        </View>
        <RemotePushController 
        url={url}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20
  },
  Search: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    width: width / 1.08,
    height: height / 20,
    borderRadius: height / 5,
    alignItems: 'center'
  },

})

