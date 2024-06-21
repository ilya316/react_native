import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { Audio } from 'expo-av';

const MainBattle = ({ navigation }) => {
  const [value, roll] = useState(Math.floor(Math.random() * 3));
  const [playerHp, setPlayerHp] = useState(10);
  const [enemyHp, setEnemyHp] = useState();
  const [location, setLocation] = useState();
  const [enemyAction, setEnemyAction] = useState();
  const enemies = [
    {
      url: 'https://icon-library.com/images/slime-icon/slime-icon-2.jpg',
      name: 'Slime',
      health: 10,
      damage: 2,
    },
    {
      url: 'https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/edd/2015/06/skeleton_warrior.png',
      name: 'Skeleton',
      health: 20,
      damage: 1,
    },
    {
      url: 'https://www.dungeonsolvers.com/wp-content/uploads/2023/05/an-iron-cobra-with-golden-accents.png',
      name: 'Snake',
      health: 10,
      damage: 3,
    },
    {
      url: 'https://i.pinimg.com/originals/08/9f/a9/089fa98faf1badbd7953c5bbbed4b2b0.png',
      name: 'The BOSS',
      health: 100,
      damage: 10,
    },
  ];
  const locations = [
    {
      uri: 'https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg',
    },
    {
      uri: 'https://img.itch.zone/aW1nLzEyMTkxMTQwLnBuZw==/original/ALYiiE.png',
    },
    {
      uri: 'https://preview.redd.it/volcanic-eruption-in-the-style-of-pixel-art-v0-ca0dl2tgceba1.png?width=1024&format=png&auto=webp&s=5f68d75ccdc7c5712a95b9d4358914b82430b11a',
    },
    {
      uri: 'https://i1.sndcdn.com/artworks-OUh7eZCArvYjKAcV-bALk3w-t500x500.jpg',
    },
  ];
  const actions = ['Do nothing', 'Attack'];
  const sounds = [
    require('../assets/hit.wav'),
    require('../assets/pass.wav'),
    require('../assets/block.wav'),
    require('../assets/game-over.wav'),
    require('../assets/ouch.wav'),
  ];
  const rollAction = () => {
    setEnemyAction(actions[Math.floor(Math.random() * 2)]);
  };
  const rerollEnemy = () => {
    temp = Math.floor(Math.random() * 4);
    roll(temp);
    setEnemyHp(enemies[temp].health);
    temp = Math.floor(Math.random() * 4);
    setLocation(locations[temp]);
    rollAction();
  };
  const enemyDoAction = () => {
    if (enemyAction == 'Attack') {
      setPlayerHp(playerHp - enemies[value].damage);
      playSound(sounds[4]);
      if (playerHp <= enemies[value].damage) {
        playSound(sounds[3]);
        navigation.navigate('Home');
      }
    }
    rollAction();
  };
  const dealDamage = () => {
    setEnemyHp(enemyHp - 1);
    resetTimer();
    playSound(sounds[0]);
    if (enemyHp == 1) {
      setCount(count + 1);
      rerollEnemy();
      playSound(sounds[1]);
    } else {
      enemyDoAction();
    }
  };
  const defend = () => {
    resetTimer();
    if (enemyAction == 'Do nothing') {
      setPlayerHp(playerHp - enemies[value].damage);
      playSound(sounds[4]);
      if (playerHp <= enemies[value].damage) {
        navigation.navigate('Home');
      }
    } else {
      playSound(sounds[2]);
    }
    rollAction();
  };
  const [count, setCount] = useState(0);
  useEffect(() => {
    rerollEnemy();
  }, [roll]);

  const [progress, setProgress] = useState(0);

  const resetTimer = () => {
    setProgress(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 0.66) {
        setProgress(progress + 0.34);
      } else {
        playSound(sounds[3]);
        navigation.navigate('Home');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  async function playSound(path) {
    const { sound } = await Audio.Sound.createAsync(path);
    sound.setVolumeAsync(0.25);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={location}
        resizeMode="cover"
        style={styles.location}>
        <View style={styles.wrapper}>
          <Progress.Bar
            progress={progress}
            width={200}
            color={'yellow'}
            borderWidth={3}
            borderColor={'black'}
          />
          <Text style={styles.text}>{enemies[value].name}</Text>
          <Text style={styles.text}>Is going to: {enemyAction}</Text>
          <Text style={[styles.text, { marginBottom: 10 }]}>
            {enemyHp}/{enemies[value].health} hp
          </Text>
          <Image
            style={[styles.enemy, { marginBottom: 10 }]}
            source={{ uri: enemies[value].url }}
          />
          <Text style={[styles.text, { marginBottom: 10 }]}>
            Your health: {playerHp}/10 hp
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#ff0000' }]}
              onPress={dealDamage}>
              <Text style={styles.buttonText}>Attack</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={defend}>
              <Text style={styles.buttonText}>Defend</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { marginTop: 10 }]}>
            Kill count: {count}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  wrapper: {
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    borderRadius: 6,
    backgroundColor: 'black',
    padding: 6,
  },
  enemy: {
    height: 256,
    width: 256,
  },
});

export default MainBattle;
