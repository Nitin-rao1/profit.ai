import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabRoutes from './TabRoutes';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import CreateInvoice from '../screens/CreateInvoice/CreateInvoice';
import AddItems from '../screens/AddNewItems/AddItems';
import Invoice from '../screens/Invoice/Invoice';
import Payment from '../screens/PaymentMethod/Payment';
import CustomerInfo from '../screens/CustomerInformation/CustomerInfo';
import Gstscreen from '../screens/Gstscreen/Gstscreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import Profile from '../screens/Profile/Profile';
import Paymentstatus from '../screens/Paymentstatus/Paymentstatus';
import InvoiceDetails from '../screens/Invoice/InvoiceDetails';
import PaymentAgain from '../screens/PaymentMethod/PaymentAgain';
import LogBookFilterList from '../screens/LogBook/LogBookFilterList';
import LogBookSortList from '../screens/LogBook/LogBookSortList';
import LogBookSearchList from '../screens/LogBook/LogBookSearchList';
import HistorySortList from '../screens/History/HistorySortList';
import HistorySearchList from '../screens/History/HistorySearchList';
import InventoryFilterList from '../screens/Inventory/InventoryFilterList';
import InventorySortList from '../screens/Inventory/InventorySortList';
import InventorySearchList from '../screens/Inventory/InventorySearchList';
import reports from '../screens/Reports/Reports';
import Reports from '../screens/Reports/Reports';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
        <Stack.Screen name="GstVerify" component={Gstscreen} options={{ headerShown: false }} />
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
        <Stack.Screen name="AddItems" component={AddItems} />
        <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <Stack.Screen name="Invoices" component={Invoice} />
        <Stack.Screen name="PaymentAgain" component={PaymentAgain} />
        <Stack.Screen name="InventoryFilterList" component={InventoryFilterList} />
        <Stack.Screen name="InventorySearchList" component={InventorySearchList} />
        <Stack.Screen name="InventorySortList" component={InventorySortList} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="LogBookSortList" component={LogBookSortList} />
        <Stack.Screen name="HistorySearchList" component={HistorySearchList} />
        <Stack.Screen name="LogBookFilterList" component={LogBookFilterList} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="LogBookSearchList" component={LogBookSearchList} />
        <Stack.Screen name="HistorySortList" component={HistorySortList} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Paymentstatus" component={Paymentstatus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
