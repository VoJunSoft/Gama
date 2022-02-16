import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import admob, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const gama = (props, {navigation}) => {
  // replace adTest with asUnitId
  const adUnitId = 'ca-app-pub-4556757412228601/2364433214';
  
  const [rightCeleb, setRightCeleb] = useState([
    {id: 1, url:require("../assets/celebrations/correct1.png")},
    {id: 2, url:require("../assets/celebrations/correct2.png")},
    {id: 3, url:require("../assets/celebrations/correct3.png")}])

  const [wrongCeleb, setWrongCeleb] = useState([
    {id: 1, url:require("../assets/celebrations/wrong1.png")},
    {id: 2, url:require("../assets/celebrations/wrong2.png")},
    {id: 3, url:require("../assets/celebrations/wrong3.png")}])

  //state for the entire stack of cards
  //update: fetch this state from a database or external file in useeffect
  const [cards, setCards] = useState([
    {id: 1, url:require("../assets/cards/pen.webp")},
    {id: 2, url:require("../assets/cards/oasis.webp")},
    {id: 3, url:require("../assets/cards/nina.webp")},
    {id: 4, url:require("../assets/cards/Plane.webp")},
    {id: 5, url:require("../assets/cards/scale.webp")},
    {id: 6, url:require("../assets/cards/spa.webp")},
    {id: 7, url:require("../assets/cards/tomato.webp")},
    {id: 8, url:require("../assets/cards/warning.webp")},
    {id: 9, url:require("../assets/cards/wifi.webp")},
    {id: 10, url:require("../assets/cards/z.webp")},
    {id: 11, url:require("../assets/cards/tl.webp")},
    {id: 12, url:require("../assets/cards/smile.webp")},
    {id: 13, url:require("../assets/cards/amb.webp")},
    {id: 14, url:require("../assets/cards/art.webp")},
    {id: 15, url:require("../assets/cards/bell.webp")},
    {id: 16, url:require("../assets/cards/cloud.webp")},
    {id: 17, url:require("../assets/cards/clock.webp")},
    {id: 18, url:require("../assets/cards/earth.webp")},
    {id: 19, url:require("../assets/cards/envelope.webp")},
    {id: 20, url:require("../assets/cards/fire.webp")},
    {id: 21, url:require("../assets/cards/glasses.webp")},
    {id: 22, url:require("../assets/cards/heart1.webp")},
    {id: 23, url:require("../assets/cards/heart2.webp")},
    {id: 24, url:require("../assets/cards/lemon.webp")},
    {id: 25, url:require("../assets/cards/lp.webp")},
    {id: 26, url:require("../assets/cards/map.webp")},
    {id: 27, url:require("../assets/cards/shrimps.webp")},
    {id: 28, url:require("../assets/cards/1.png")},
    {id: 29, url:require("../assets/cards/2.png")},
    {id: 30, url:require("../assets/cards/3.png")},
    {id: 31, url:require("../assets/cards/4.png")},
    {id: 32, url:require("../assets/cards/5.png")},
    {id: 33, url:require("../assets/cards/6.png")},
    {id: 34, url:require("../assets/cards/7.png")},
    {id: 35, url:require("../assets/cards/8.png")},
    {id: 36, url:require("../assets/cards/9.png")},
    {id: 37, url:require("../assets/cards/10.png")},
    {id: 38, url:require("../assets/cards/11.png")},
    {id: 39, url:require("../assets/cards/12.png")},
    {id: 40, url:require("../assets/cards/13.png")},
    {id: 41, url:require("../assets/cards/14.png")},
    {id: 42, url:require("../assets/cards/15.png")},
    {id: 43, url:require("../assets/cards/16.png")},
    {id: 44, url:require("../assets/cards/17.png")},
    {id: 45, url:require("../assets/cards/18.png")},
    {id: 46, url:require("../assets/cards/19.png")},
    {id: 47, url:require("../assets/cards/20.png")},
    {id: 48, url:require("../assets/cards/21.png")},
    {id: 49, url:require("../assets/cards/22.png")},
    {id: 50, url:require("../assets/cards/23.png")},
    {id: 51, url:require("../assets/cards/24.png")},
    {id: 52, url:require("../assets/cards/25.png")},
    {id: 53, url:require("../assets/cards/26.png")},
    {id: 54, url:require("../assets/cards/27.png")},
    {id: 55, url:require("../assets/cards/28.png")},
    {id: 56, url:require("../assets/cards/29.png")},
    {id: 57, url:require("../assets/cards/30.png")},
    {id: 58, url:require("../assets/cards/31.png")},
    {id: 59, url:require("../assets/cards/32.png")},
    {id: 60, url:require("../assets/cards/33.png")},
    {id: 61, url:require("../assets/cards/34.png")},
    {id: 62, url:require("../assets/cards/36.png")},
    {id: 63, url:require("../assets/cards/37.png")},
    {id: 64, url:require("../assets/cards/38.png")},
    {id: 65, url:require("../assets/cards/39.png")},
    {id: 66, url:require("../assets/cards/Play.png")},
    {id: 67, url:require("../assets/cards/Play2.png")},
    {id: 68, url:require("../assets/cards/drink.png")},
    {id: 69, url:require("../assets/cards/angry.png")},
    {id: 70, url:require("../assets/cards/bluets.png")},
    {id: 71, url:require("../assets/cards/spaceship2.png")},
    {id: 72, url:require("../assets/cards/MM2.png")},
    {id: 73, url:require("../assets/cards/zonal.png")},
    {id: 74, url:require("../assets/cards/earth2.png")}
  ])

  // load user data from local storage 
  const [userInfo, setUserInfo] = useState({})

   //get the number of cards based on level
   const [numberOfCards, setNumberOfCards] = useState(props.noCards)

   //state for 6/9 random images using NextPlay
  const [selectedCards, setSelectedCards] = useState([])

  //wining card
  const [qCard, setQcard] = useState({})

  useEffect(() => {
    //loading items/photos from json file
    //getAssetsData()
    
    //get Data from asyncstorage on page load and store it to userInfo
    getData() 

    //play the first random set: selectedCards
    nextPlay()
    
    //choose one card from selectedCards for the first time 
    setQcard(async () => await selectedCards[Math.floor(Math.random() * selectedCards.length)]) 
   },[])

   const getAssetsData = () =>{
        fetch('data.json',{
          headers : { 
           'Content-Type': 'application/json',
           'Accept': 'application/json'}})
         .then(function(response){
           console.log(response)
           return response.json() })
         .then(function(myJson) {
            console.log(myJson)
            setCards(myJson)})
}

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userInfoKey', jsonValue)
    } catch (e) {
      // saving error
      setUserInfo({
        userName: 'Anonymous',
        hiScore: 435,
        currentScore: 0,
        level: 1
      })
      storeData(userInfo)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfoKey')
      if(value !== null){
        setUserInfo(JSON.parse(value))
      }else{
        setUserInfo({
          userName: 'Anonymous',
          hiScore: 0,
          currentScore: 0,
          level: 1
        })
      storeData(userInfo)
      }
    } catch(e) {
      // error reading value
      setUserInfo({
        userName: 'Anonymous',
        hiScore: 0,
        currentScore: 0,
        level: 1
      })
    }
  }

  //when the timer if off then cards need to be flipped
  const [isTimerOn, setIsTimerOn] = useState(true)

  //when user makes a choice then the cards showed be flipped back
  const [showCards, setShowCards] = useState(true)

  //user's result wrong/correct/nada
  const [result, setResult] = useState('nada')

  //connect sound
  Sound.setCategory('Playback')

  const nextPlay = () => {
    //find out the number of cards
    //setNumberOfCards()

    //TODO: random picks: create an array of n unique numbers
    var startIndex = Math.floor(Math.random() * (cards.length - numberOfCards - 1))
    
    console.log(cards.length , startIndex)
    //refill deck of cards
    setSelectedCards([])
    for(let i=startIndex; i < (startIndex + numberOfCards); i++)
        setSelectedCards((record) =>  [
                                        {
                                          id: cards[i].id,
                                          url: cards[i].url
                                        }, ...record 
                                      ]) 
  }

  const nextQuestion = () => {
    //on animation exist refill selectedcards 
    nextPlay()
    //set showcards to true => already true if you coming from previous play
    //setIsTimerOn to true
    setIsTimerOn(true)
    //set Result field to null
    setResult('nada')
  }

  //flip cards on touch, check answer
  const handleFlip = (id) => {
      //show cards when an answer is selected
      setShowCards(true)

      //if id == userRes.id then show animation
      if(id == qCard.id){
        var correctSound = new Sound('correct.mp3',Sound.MAIN_BUNDLE, (error) => {
          if (error) {
              console.log('failed to load the sound', error)
              return
            }
            // if loaded successfully
            correctSound.setVolume(1)
            correctSound.play(()=>correctSound.release())
          });
        setResult('correct')
        //add 2 points if player is correct
        setUserInfo(obj => {
          return { ...obj, currentScore: userInfo.currentScore + 2 }
        })

        //TODO:if current score is bigger than highest score then replace 
        if (userInfo.currentScore > userInfo.hiScore){
          setUserInfo(obj => {
            return { ...obj, hiScore: userInfo.currentScore }
        })}
        console.log('---------->', userInfo)
      }else{
        var wrongSound = new Sound('wrong.mp3',Sound.MAIN_BUNDLE, (error) => {
          if (error) {
              console.log('failed to load the sound', error)
              return
            }
            // if loaded successfully
            wrongSound.setVolume(1)
            wrongSound.play(()=>wrongSound.release())
          });
        setResult('wrong')
        setUserInfo(obj => {
          return { ...obj, currentScore: userInfo.currentScore - 1 }
        })
      }

      storeData(userInfo)
  }

  const timerTick = () => {
    //when timer is on (the card is flipped on the back):
    //1. cards are shown 2. ticking sound is playing 
    var tickingSound = new Sound('ticking.mp3',Sound.MAIN_BUNDLE, (error) => {
      if (error) {
          console.log('failed to load the sound', error)
          return
        }
        // if loaded successfully
        console.log('loaded successfully ');
        tickingSound.setVolume(0.5)
        tickingSound.setCurrentTime(27.2);
        tickingSound.play(()=>tickingSound.release())
      }); 
    // when timer animation ends: 1. chards will be flipped on the back 
    // (showcards will be false and card will be flipped to back)
    // 2. timer card will be revealed [isTimerOn will be off and card will be shown]
  }


  return(
    <View style={styles.container}>
      <View style={styles.row}>
      <View style={{ 
          flex: -1, 
          flexDirection: 'row',
          justifyContent:'space-around',
          padding: 5}}>
          <Text style={styles.title}>Level:</Text>
          <Text style={{color : props.level == "Easy" ? "darkgreen" : "darkred", fontSize:19, paddingLeft: 5}}>
          {props.level}
          </Text>
      </View>
      <View style={{ 
          flex: -1, 
          flexDirection: 'row',
          justifyContent:'flex-end',
          padding: 5}}>
        <Text style={styles.title}>Score:</Text>
        <Text style={{color : userInfo.currentScore >= 0 ? "darkgreen" : "darkred", fontSize:19, paddingLeft: 5}}>
          {userInfo.currentScore}
        </Text>
      </View>
      </View>
      {isTimerOn ?
        <Animatable.View
        onAnimationBegin={() => {timerTick()}}
          onAnimationEnd={() => {
            setIsTimerOn(false), 
            setShowCards(false), 
            setQcard(selectedCards[Math.floor(Math.random() * numberOfCards)])}}
          easing="ease"
          animation="pulse"
          iterationCount={3}
          direction="normal"
          duration={1500}>
          <Image style={styles.headCardCover} source={require("../assets/gallary/card2.png")} /> 
      </Animatable.View>
      :
      <Image style={styles.headCard} source={qCard.url} />
     }
      
      {showCards ?
        <FlatList 
          data={selectedCards}
          numColumns={3}
          style={styles.cards}
          renderItem={ ({item}) => (
            <View style={styles.card}><Image style={styles.img} source={item.url} /></View>
          )}
        />
        :
        <FlatList 
          data={selectedCards}
          numColumns={3}
          style={styles.cards}
          renderItem={ ({item}) => (
            <View style={styles.cardSpot}>
            <TouchableOpacity 
            onPress={() => handleFlip(item.id)}>
                  <Image style={styles.cardImg} source={require("../assets/gallary/card2.png")} />  
            </TouchableOpacity>
            </View>
          )}
        />
      }
      {result == 'correct' ?
      
        <Animatable.View
          onAnimationEnd={() => [storeData(userInfo)]}
          easing="ease"
          animation="pulse"
          iterationCount={1}
          duration={1000}
          direction="normal">
            <TouchableNativeFeedback 
              onPress={() => nextQuestion()}>
              <Image style={styles.output} source={rightCeleb[Math.floor(Math.random() * 3)].url} />
           </TouchableNativeFeedback>
        </Animatable.View>
      
        : result == 'wrong' ?
      
        <Animatable.View
          onAnimationEnd={() => storeData(userInfo)}
          easing="ease"
          animation="pulse"
          iterationCount={1}
          duration={1000}
          direction="normal">
          <TouchableNativeFeedback 
            onPress={() => nextQuestion()}>
            <Image style={styles.output} source={wrongCeleb[Math.floor(Math.random() * 3)].url} />
          </TouchableNativeFeedback>
        </Animatable.View>
      
        :
        null
      }

      <BannerAd
        //unitId={TestIds.BANNER}
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#6183B4",
    },
    title: {
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 20,
      marginTop:0,
      padding: 0,
      textAlign: 'center',
      color:'white',
      
    },
    output: {
      height:350,
      width:350,
      alignSelf:'center',
      marginTop:-500,
    },
    headCardCover: {
      alignSelf: 'center',
      height:100,
      width:100,
      resizeMode: 'contain',
      margin:10
    },
    headCard: {
      alignSelf: 'center',
      height:100,
      width:100,
      resizeMode: 'contain',
      margin:10
    },
    card: {
      height:120,
      width:100,
      borderWidth:1,
      borderColor: 'black',
      backgroundColor:'white',
      justifyContent:'center',
      borderRadius: 5,
      margin:5,
    },
    cards: {
      alignSelf:'center',
      marginTop:10
    },
    cardSpot: {
      height:120,
      width:100,
      justifyContent:'center',
      borderRadius: 5,
      margin:5,
    },
    img: {
      height:120,
      width:90,
      alignSelf:'center',
      resizeMode: 'contain',
      margin: 0
    },
    cardImg: {
      height:120,
      width:130,
      alignSelf:'center',
      resizeMode: 'contain',
      margin: 0
    },
    row: {
      flex: -1,
      flexDirection: "row",
      justifyContent: "space-between",
      margin:5,
      padding: 5
    },
    info: {
      fontSize: 15,
      margin:5,
      textAlign: 'center',
      color:'white'
    },
  });

export default gama;