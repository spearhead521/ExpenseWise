'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const [user, setUser] = useState<User>({
    name: 'shadcn',
    email: 'm@example.com',
    avatar: userAvatar?.imageUrl || '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
