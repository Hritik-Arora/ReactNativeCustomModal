/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import CustomSwipeableModal from './src/components/CustomSwipeableModal/CustomSwipeableModal';

interface IModalState {
  isVisible: boolean;
  direction: 'left' | 'right' | 'top' | 'bottom';
  onClose: () => void;
  modalContainerStyles?: ViewStyle;
  shouldCloseOnBackdropPress: boolean;
}

const DEFAULT_MODAL_STATE: IModalState = {
  isVisible: false,
  direction: 'left',
  onClose: () => {},
  shouldCloseOnBackdropPress: true,
};

const App: React.FC = () => {
  const [modalProps, setModalProps] = useState<IModalState>(DEFAULT_MODAL_STATE);

  const handleModalVisibility = useCallback((direction: 'left' | 'right' | 'top' | 'bottom') => {
    setModalProps({
      isVisible: true,
      direction,
      onClose: () => { setModalProps({
        ...DEFAULT_MODAL_STATE,
        direction,
      }); },
      shouldCloseOnBackdropPress: true,
      // modalContainerStyles: {
      //   flex: 0.8,
      // }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle="dark-content"
      />
      <View style={styles.buttonsView}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              handleModalVisibility('left');
            }}
            title='Left'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              handleModalVisibility('right');
            }}
            title='Right'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              handleModalVisibility('bottom');
            }}
            title='Bottom'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              handleModalVisibility('top');
            }}
            title='Top'
          />
        </View>
      </View>
      <CustomSwipeableModal
        isVisible={modalProps?.isVisible || false}
        onClose={modalProps?.onClose}
        direction={modalProps?.direction}
        shouldCloseOnBackdropPress={modalProps.shouldCloseOnBackdropPress}
        modalContainerStyles={modalProps.modalContainerStyles}
      >
        <View>
          <Text style={styles.text}>Hello Everyone to the custom Modal!</Text>
        </View>
      </CustomSwipeableModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  buttonsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  text: {
    fontSize: 30,
    lineHeight: 36,
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default App;
