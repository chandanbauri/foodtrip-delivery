import * as React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

// async function intializeSecondaryApp() {
//   await
// }
type contextProps = {
  user: any;
  state: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  login: (
    email: string,
    password: string,
    callBack: (error: any) => void,
  ) => void;
  logOut: () => void;
};

export const AuthContext = React.createContext<contextProps | null>(null);

export const AuthProvider: React.FunctionComponent = ({children}) => {
  const [user, setUser] = React.useState<any>(null);
  const [state, setState] = React.useState<boolean>(false);
  const login = async (
    email: string,
    password: string,
    callBack: (error: any) => void,
  ) => {
    try {
      let user = await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      callBack(error);
    }
  };
  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        state,
        setState,
        setUser,
        login,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
