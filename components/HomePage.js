import { Text, View, StyleSheet, TouchableOpacity, Animated,} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const HomePage = ({ navigation }) => {

  const imageAnimation = useRef(new Animated.Value(0)).current;
  const viewAnimation = useRef(new Animated.Value(1)).current;

  const start = () => {
    playSound(require('../assets/start.wav'))
    Animated.parallel([
    Animated.timing(imageAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }),
    Animated.timing(viewAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
    ]).start(() => {
      imageAnimation.setValue(0)
      viewAnimation.setValue(1)
      navigation.navigate('Battle')
  })
  };

  async function playSound(path) {
    const { sound } = await Audio.Sound.createAsync(path);
    sound.setVolumeAsync(0.25);
    await sound.playAsync();
  }

  return (
    <View style={styles.wrap}>
    <Animated.Image source={{uri:'https://image.slidesdocs.com/responsive-images/background/adventure-game-dusk-scene-powerpoint-background_6afde3ae4e__960_540.jpg'}} resizeMode="cover" blurRadius={20} style={ styles.image }>
    </Animated.Image>
    <Animated.Image source={{uri:'https://image.slidesdocs.com/responsive-images/background/adventure-game-dusk-scene-powerpoint-background_6afde3ae4e__960_540.jpg'}} resizeMode="cover" style={[styles.image, {opacity: imageAnimation}]}>
    </Animated.Image>
    <Animated.View style={[styles.info, {opacity: viewAnimation}]}>
    <Text style={styles.theName}>
      The not so simple game you can think of
    </Text>
    <Text style={styles.rules}>
      The rules are simple
    </Text>
    <Text style={styles.rules}>
      If the enemy is going to <Text style={{fontWeight: 'bold'}}>do nothing</Text> - you <Text style={{color: 'red', fontWeight: 'bold'}}>attack</Text>
    </Text>
    <Text style={styles.rules}>
      If the enemy is going to <Text style={{fontWeight: 'bold'}}>attack</Text> - you <Text style={{color: 'blue', fontWeight: 'bold'}}>defend</Text>
    </Text>
    <Text style={styles.rules}>
      If your health reaches <Text style={{fontWeight: 'bold'}}>zero</Text> - you <Text style={{fontWeight: 'bold'}}>lose</Text>
    </Text>
    <Text style={styles.rules}>
      You have <Text style={{fontWeight: 'bold'}}>3 seconds</Text> to make your move or you <Text style={{fontWeight: 'bold'}}>lose</Text>
    </Text>
    <TouchableOpacity style={[styles.button,{marginTop: 10}]} onPress={start}>
      <Text style={styles.buttonText}>
      START
      </Text>
    </TouchableOpacity>
    </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  theName: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rules: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  wrap: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundColor: 'black'
  }
});

export default HomePage;