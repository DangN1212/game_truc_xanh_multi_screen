import React, {useEffect, useState} from 'react';

import {
  useSafeAreaInsets,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Card from './Card/Card';
import {useRef} from 'react';
import {ROUTE, STATUS} from '../constant';
const background = require('../assets/images/background.png');
const {width, height} = Dimensions.get('window');
const randomId = params => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
const MARGIN = {
  HORIZONTAL: 10,
  VERTICAL: 10
};

const LAYOUT_SETTING = {
  ROW: 3,
  COLUMN: 6
};

export default function Home() {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  let intervalRef = useRef(null);
  const arr = Array.from({length: 18}, (v, i) => {
    return {
      isUp: false,
      id: randomId(),
      value: i >= 9 ? i - 9 : i,
      isDisplay: true
    };
  });

  const shuffle = array => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const [cards, setCards] = useState(shuffle(arr));
  const [time, setTime] = useState(5 * 60);
  const [enableCheck, setEnableCheck] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(prevCount => prevCount - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      // clearInterval(interval);
      handleWhenTimeEnd();
    }
  }, [time]);

  useEffect(() => {
    if (enableCheck) {
      if (checkValueOfCardsUp()) {
        setTimeout(() => {
          setCards(
            cards.map(i => {
              if (i.isUp) {
                i['isDisplay'] = false;
                i['isUp'] = false;
              }
              return i;
            })
          );

          //All card is up
          if (!cards.filter(i => i.isDisplay).length) {
            handleAllCardIsUp();
          }
        }, 200);
      } else {
        setTimeout(() => {
          setCards(
            cards.map(i => {
              return {...i, isUp: false};
            })
          );
        }, 200);
      }
    }
  }, [enableCheck]);

  const handleWhenTimeEnd = () => {
    clearInterval(intervalRef.current);
    const cardDisplay = cards.filter(i => i.isDisplay);

    navigation.replace(ROUTE.END, {
      name: route.params.name,
      status: cardDisplay.length ? STATUS.LOSE : STATUS.WIN
    });
  };

  const handleAllCardIsUp = () => {
    clearInterval(intervalRef.current);
    navigation.replace(ROUTE.END, {
      name: route.params.name,
      status: STATUS.WIN
    });
  };

  const checkValueOfCardsUp = () => {
    const cardsUp = cards.filter(i => i.isUp);
    if (cardsUp.length !== 2) {
      return false;
    }

    return cardsUp[0].value === cardsUp[1].value;
  };

  const handleOnPress = id => {
    const cardClicked = cards.find(i => {
      return i.id === id;
    });

    if (!cardClicked.isDisplay) {
      return false;
    }

    // Find cards are up
    const cardsUp = cards.filter(i => i.isUp);
    let newCards = [];
    // If there is no card, open current card
    // if (!cardsUp.length || cardsUp.length === 1) {
    newCards = cards.map(i => {
      if (i.id === id) {
        i.isUp = true;
      }

      return i;
    });
    // setEnableCheck(false)
    // } else {
    if (newCards.filter(i => i.isUp).length === 2) {
      setEnableCheck(true);
    } else {
      setEnableCheck(false);
    }
    // }

    setCards(newCards);

    // setCards(newCards);
  };

  const getPaddingHorizontal = () => {
    return insets.left > insets.right ? insets.left : insets.right;
  };

  const getPaddingVertical = () => {
    return insets.top > insets.bottom ? insets.top : insets.bottom;
  };

  const handleReset = params => {
    const newCards = cards.map(i => {
      (i.isUp = false), (i.isDisplay = true);
      return i;
    });
    setCards(shuffle(newCards));
  };

  /**
   * Width of each card , subtract the padding horizontal value, and margin
   * @param {*} params
   * @returns
   */
  const getWidthOfCard = params => {
    return (
      (width - getPaddingHorizontal() * 2) / LAYOUT_SETTING.COLUMN -
      MARGIN.HORIZONTAL
    );
  };

  const getHeightOfCard = () => {
    return (
      (height - getPaddingVertical() * 2) / LAYOUT_SETTING.ROW - MARGIN.VERTICAL
    );
  };

  const getTimeByHm = () => {
    console.log(time);
    if (time <= 60) {
      return time;
    }

    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  };

  return (
    <View>
      <ImageBackground source={background} style={styles.background}>
        <Text style={{textAlign: 'center'}}>{getTimeByHm()}</Text>
        <View
          style={{
            paddingHorizontal: getPaddingHorizontal(),
            paddingVertical: getPaddingVertical(),
            ...styles.viewContainer,
            ...styles.cardWrap
          }}>
          {cards.map(card => (
            <Card
              width={getWidthOfCard()}
              height={getHeightOfCard()}
              data={card}
              key={card.id}
              onPress={() => handleOnPress(card.id)}
            />
          ))}
        </View>
        {/* <TouchableOpacity onPress={handleReset} style="text-center">
          <Text style={{color: 'red', textAlign: 'center'}}>Reset</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    width: width,
    height: height
  },
  cardWrap: {
    width: width,
    height: height - 30
  },
  viewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
