'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  upgradeToPro: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: '',
    isPro: false,
  });

  const upgradeToPro = () => {
    setUser((prevUser) => ({ ...prevUser, isPro: true }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, upgradeToPro }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
