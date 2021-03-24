import React, { useRef, useEffect, forwardRef } from "react";
import { Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface Props {
  children: React.ReactNode;
  ref: any;
}

const SearchBottomSheet = forwardRef((props: Props, ref: any) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <RBSheet
      ref={ref}
      height={SCREEN_HEIGHT / 2}
      closeOnDragDown={true}
      showTopBar={false}
      closeOnPressMask={true}
      customStyles={{
        draggableContainer: {
          backgroundColor: "white",
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
        },
        wrapper: {
          backgroundColor: "rgba(119, 119, 119, 0.3)",
          height: SCREEN_HEIGHT / 2,
        },
        container: {
          borderRadius: 56,
        },
        draggableIcon: {
          backgroundColor: "transparent",
        },
      }}
    >
      {props.children}
    </RBSheet>
  );
});

export default SearchBottomSheet;
