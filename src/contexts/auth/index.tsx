import * as React from 'react';
import auth from '@react-native-firebase/auth';
type contextProps = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
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
    await auth().signOut();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
