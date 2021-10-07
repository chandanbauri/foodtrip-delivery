import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
export let test = functions().httpsCallable('test');
export let acceptOrder = functions().httpsCallable('acceptOrder');
export let rejectOrder = functions().httpsCallable('rejectOrder');
export let updateOrder = functions().httpsCallable('updateOrder');
export let onDeliveryComplete = functions().httpsCallable('onDeliveryComplete');
export let addFCMtoke = functions().httpsCallable('addFCMtoke');
export let fetchRequests = functions().httpsCallable('fetchRequests');
export const getFCMToken = async () => await messaging().getToken();
export let onPickUp = functions().httpsCallable('onPickUp');
export let ToggleState = functions().httpsCallable('ToggleState');
export const getState = async (user: string | undefined): Promise<boolean> => {
  if (user)
    try {
      let res = await firebase
        .app('SECONDARY_APP')
        .firestore()
        .collection('deliveryPartners')
        .doc(user)
        .get();
      if (res && res.exists && res.data) {
        return res.data()?.state;
      }
      return false;
    } catch (error) {
      //   console.error(error);
      return false;
    }
  return false;
};
