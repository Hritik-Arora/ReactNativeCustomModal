import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated, LayoutChangeEvent, PanResponder, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import styles from './styles';
import { getFlexDirectionOfModalContainer } from '../../utils/modal';

interface IProps {
  isVisible: boolean;
  direction: 'left' | 'right' | 'top' | 'bottom';
  onClose: () => void;
  children: React.ReactNode;
  modalContainerStyles?: ViewStyle;
  shouldCloseOnBackdropPress: boolean;
}

const CustomSwipeableModal: React.FC<IProps> = (props: IProps) => {
  const {
    isVisible,
    children,
    onClose,
    modalContainerStyles = {},
    shouldCloseOnBackdropPress,
    direction,
  } = props;

  // Internal state variable to manage modal's visibility
  const [internalIsVisible, setInternaIsVisible] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0));
  const [showBackdrop, setShowBackdrop] = useState(false);
  const translateX = useRef(new Animated.Value(0));
  const translateY = useRef(new Animated.Value(0));
  const modalDimensions = useRef<{
    width: number;
    height: number;
  } | null>(null);

  const handleModalOpenAnimation = useCallback(() => {
    switch (direction) {
      case 'left':
        translateX.current.setValue(-(modalDimensions.current?.width || 0));
        animatedOpacity.current.setValue(1);   // Set opacity to 1 now, so that modal gets visible
        Animated.timing(translateX.current, {
          toValue: 0,
          duration: 100, // 100 ms is the default animation time of modal
          useNativeDriver: true,
        }).start(() => {
          setShowBackdrop(true);
        });
        break;
      case 'right':
        translateX.current.setValue((modalDimensions.current?.width || 0));
        animatedOpacity.current.setValue(1);   // Set opacity to 1 now, so that modal gets visible
        Animated.timing(translateX.current, {
          toValue: 0,
          duration: 100, // 100 ms is the default animation time of modal
          useNativeDriver: true,
        }).start(() => {
          setShowBackdrop(true);
        });
        break;
      case 'bottom':
        translateY.current.setValue((modalDimensions.current?.height || 0));
        animatedOpacity.current.setValue(1);   // Set opacity to 1 now, so that modal gets visible
        Animated.timing(translateY.current, {
          toValue: 0,
          duration: 100, // 100 ms is the default animation time of modal
          useNativeDriver: true,
        }).start(() => {
          setShowBackdrop(true);
        });
        break;
      case 'top':
        translateY.current.setValue(-(modalDimensions.current?.height || 0));
        animatedOpacity.current.setValue(1);   // Set opacity to 1 now, so that modal gets visible
        Animated.timing(translateY.current, {
          toValue: 0,
          duration: 100, // 100 ms is the default animation time of modal
          useNativeDriver: true,
        }).start(() => {
          setShowBackdrop(true);
        });
        break;
      default:
        break;
    }
  }, [direction]);

  const handleModalContainerLayout = useCallback((event: LayoutChangeEvent) => {
    modalDimensions.current = {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    };
    handleModalOpenAnimation();
  }, [handleModalOpenAnimation]);

  const handleModalClose = useCallback(() => {
    if (internalIsVisible) {
      // Modal is currently being shown. Close the Modal in Animated way
      setShowBackdrop(false);
      switch (direction) {
        case 'left':
          Animated.timing(translateX.current, {
            toValue: -(modalDimensions.current?.width || 0),
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.current.setValue(0);
            translateY.current.setValue(0);
            modalDimensions.current = null;
            animatedOpacity.current.setValue(0);
            setInternaIsVisible(false);
          });
          break;
        case 'right':
          Animated.timing(translateX.current, {
            toValue: modalDimensions.current?.width || 0,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.current.setValue(0);
            translateY.current.setValue(0);
            modalDimensions.current = null;
            animatedOpacity.current.setValue(0);
            setInternaIsVisible(false);
          });
          break;
        case 'bottom':
          Animated.timing(translateY.current, {
            toValue: (modalDimensions.current?.height || 0),
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.current.setValue(0);
            translateY.current.setValue(0);
            modalDimensions.current = null;
            animatedOpacity.current.setValue(0);
            setInternaIsVisible(false);
          });
          break;
        case 'top':
          Animated.timing(translateY.current, {
            toValue: -(modalDimensions.current?.height || 0),
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            translateX.current.setValue(0);
            translateY.current.setValue(0);
            modalDimensions.current = null;
            animatedOpacity.current.setValue(0);
            setInternaIsVisible(false);
          });
        default:
          break;
      }
  }
  }, [direction, internalIsVisible]);

  useEffect(() => {
    if (isVisible) {
      setInternaIsVisible(true);
    } else {
      handleModalClose();
    }
  }, [isVisible]);

  // If Modal is not visible, simply return null for optimisation purpose
  if (!internalIsVisible) {
    return null;
  }

  return (
    <View style={[
      styles.container,
      {
        flexDirection: getFlexDirectionOfModalContainer(direction),
      }
    ]}>
      {
        direction === 'left' || direction === 'top' ? (
          <>
            <Animated.View
              onLayout={handleModalContainerLayout}
              style={[
                styles.modalContainer,
                {
                  opacity: animatedOpacity.current,
                  transform: [
                    { translateX: translateX.current },
                    { translateY: translateY.current, }
                  ],
                },
                modalContainerStyles,
              ]}
            >
            {children}
            </Animated.View>
            <TouchableOpacity
              onPress={() => {
                if (shouldCloseOnBackdropPress) {
                  onClose();
                  // handleModalClose();
                } else {
                  console.log('Backdrop pressed, but taking no action as backdrop close is disabled');
                }
              }}
              style={[
                styles.backdrop,
                showBackdrop ? styles.none : styles.hideItem,
              ]}
              activeOpacity={0.4}
            />
        </>
        ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (shouldCloseOnBackdropPress) {
                    onClose();
                    // handleModalClose();
                  } else {
                    console.log('Backdrop pressed, but taking no action as backdrop close is disabled');
                  }
                }}
                style={[
                  styles.backdrop,
                  showBackdrop ? styles.none : styles.hideItem,
                ]}
                activeOpacity={0.4}
              />
              <Animated.View
                onLayout={handleModalContainerLayout}
                style={[
                  styles.modalContainer,
                  {
                    opacity: animatedOpacity.current,
                    transform: [
                      { translateX: translateX.current },
                      { translateY: translateY.current, }
                    ],
                  },
                  modalContainerStyles,
                ]}
              >
              {children}
              </Animated.View>
            </>
        )
      }
    </View>
  );
};

export default CustomSwipeableModal;
