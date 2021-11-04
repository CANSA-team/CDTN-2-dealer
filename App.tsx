import React from 'react';
import { StyleSheet} from 'react-native';
import SwitchNavigation from './src/components/SwitchNavigation';
import { Provider} from 'react-redux';
import { store } from './src/redux/store';
import RegisterShop from './src/screens/Shop/RegisterShop';
import EditProfile from './src/screens/User/EditProfile';
import Profile from './src/screens/User/Profile';
import ProfileShop from './src/screens/Shop/ProfileShop';
import EditProfileShop from './src/screens/Shop/EditProfileShop';

export default function App() {
  return (
    <Provider store={store}>
      <SwitchNavigation />
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
