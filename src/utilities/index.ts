import functions from '@react-native-firebase/functions';

export let test = functions().httpsCallable('test');
export let acceptOrder = functions().httpsCallable('acceptOrder');
export let rejectOrder = functions().httpsCallable('rejectOrder');
export let updateOrder = functions().httpsCallable('updateOrder');
export let OnDeliveryComplete = functions().httpsCallable('OnDeliveryComplete');
