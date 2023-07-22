import { StyleSheet, ViewStyle } from 'react-native';

interface IStyles {
  container: ViewStyle;
  backdrop: ViewStyle;
  modalContainer: ViewStyle;
  none: ViewStyle;
  hideItem: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.4,
    flex: 0.5,
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  none: {},
  hideItem: {
    opacity: 0,
  }
});

export default styles;