import { createContext, useState, ReactNode } from "react";

type User = {
  id: string;
  username: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  setUser: (string) => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
