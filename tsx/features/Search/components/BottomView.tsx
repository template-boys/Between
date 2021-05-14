import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONTENT_HEIGHT = 310;
const NAVBAR_HEIGHT = 49;

interface Props {
  setMapHeight: (number: number) => void;
}

const BottomView = (props: React.PropsWithChildren<Props>) => {
  const { bottom: BOTTOM_INSETS, top: TOP_INSETS } = useSafeAreaInsets();
  const [animatedBottom, setAnimatedBottom] = React.useState(
    new Animated.Value(CONTENT_HEIGHT)
  );

  useEffect(() => {
    Animated.timing(animatedBottom, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      props.setMapHeight(SCREEN_HEIGHT - CONTENT_HEIGHT - 80);
    });

    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (e: any) => {
    Animated.timing(animatedBottom, {
      toValue: BOTTOM_INSETS - e.endCoordinates.height + NAVBAR_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (
        SCREEN_HEIGHT - CONTENT_HEIGHT - e.endCoordinates.height + 40 >
        SCREEN_HEIGHT / 3
      ) {
        props.setMapHeight(
          SCREEN_HEIGHT - CONTENT_HEIGHT - e.endCoordinates.height + 5
        );
      }
    });
  };

  const keyboardWillHide = () => {
    setTimeout(() => {
      props.setMapHeight(SCREEN_HEIGHT - CONTENT_HEIGHT - 80);
    }, 100);

    Animated.timing(animatedBottom, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };

  const transformStyle = {
    transform: [
      {
        translateY: animatedBottom,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, transformStyle]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

export default BottomView;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    zIndex: -3,
  },
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 1,
    position: "absolute",
    backgroundColor: "white",
    height: CONTENT_HEIGHT,
    width: SCREEN_WIDTH,
    bottom: 0,
  },
});
