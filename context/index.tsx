import { ChildProps, IAccount, IContext, IUser } from "@/types";
import { createContext, useContext, useState } from "react";

const Context = createContext<IContext | null>(null);

export const Provider = ({ children }: ChildProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);

  return (
    <Context.Provider value={{ account, setAccount, setUser, user }}>
      {children}
    </Context.Provider>
  );
};

export const useGloabalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGloabalContext must be used within a Provider");
  }
  return context;
};
