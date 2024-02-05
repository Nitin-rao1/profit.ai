// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// //import liraries
// import React, {Component} from 'react';
// import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
// import FlashMessage from 'react-native-flash-message';
// import {scale} from 'react-native-size-matters';
// // import {Provider} from 'react-redux';
// // import {POPPINS_MEDIUM} from './src/constants/constants';
// // import store, {persistor} from './src/redux/store';
// import Routes from './src/navigations/Routes';
// // import {PersistGate} from 'redux-persist/integration/react';
// import Colors from './src/constants/colors';
// import mainStyles from './src/constants/mainStyles';

// // create a component
// const App = () => {
//   return (
//     <>
//       {/* <Provider store={store}> */}
//       {/* <PersistGate loading={null} persistor={persistor}> */}
//       <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
//       <SafeAreaView style={mainStyles.flex}>
//         <Routes />
//         <FlashMessage position="top" />
//       </SafeAreaView>
//       {/* <SafeAreaView style={mainStyles.flex} /> */}
//       {/* </PersistGate> */}
//       {/* </Provider> */}
//     </>
//   );
// };

// export default App;

import React, { useEffect } from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/navigations/Routes';
import {scale} from 'react-native-size-matters';
import Colors from './src/constants/colors';
import mainStyles from './src/constants/mainStyles';
import {Provider, useSelector} from 'react-redux';
import store, {persistor} from './src/redux/store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();    
  }, []);
  return (
    // <>
    //   <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
    //   <SafeAreaView style={mainStyles.flex}>
    //     <Routes />
    //     <FlashMessage position="top" />
    //   </SafeAreaView>
    // </>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <SafeAreaView style={mainStyles.flex}>
          <Routes />
          <FlashMessage position="top" />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
