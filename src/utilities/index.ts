import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
export let test = functions().httpsCallable('test');
export let acceptOrder = functions().httpsCallable('acceptOrder');
export let rejectOrder = functions().httpsCallable('rejectOrder');
export let updateOrder = functions().httpsCallable('updateOrder');
export let onDeliveryComplete = functions().httpsCallable('onDeliveryComplete');
export let addFCMtoke = functions().httpsCallable('addFCMtoke');
export let fetchRequests = functions().httpsCallable('fetchRequests');
export const getFCMToken = async () => await messaging().getToken();
export let onPickUp = functions().httpsCallable('onPickUp');
export let ToggleState = functions().httpsCallable('ToggleState')