import React from 'react';
import { StyleSheet} from 'react-native';
import SwitchNavigation from './src/components/SwitchNavigation';
import { Provider} from 'react-redux';
import { store } from './src/redux/store';
import Login from './src/screens/Auth/Login';
import Resgister from './src/screens/Auth/Register';
import OTPscreen from './src/screens/Auth/OTPscreen';
import PasswordInformation from './src/screens/Auth/PasswordInformation';

export default function App() {


  return (
    <Provider store={store}>
      <PasswordInformation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
