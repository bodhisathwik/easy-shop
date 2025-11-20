import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalSpending: number;
  rewardPoints: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserSpending: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('easyshop_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('easyshop_users') || '[]');
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('easyshop_user', JSON.stringify(userWithoutPassword));
  };

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('easyshop_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      membershipTier: 'Bronze' as const,
      totalSpending: 0,
      rewardPoints: 0,
      joinDate: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('easyshop_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('easyshop_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('easyshop_user');
  };

  const updateUserSpending = (amount: number) => {
    if (!user) return;

    const newTotalSpending = user.totalSpending + amount;
    const newRewardPoints = user.rewardPoints + Math.floor(amount / 100);
    
    let newTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze';
    if (newTotalSpending >= 100000) newTier = 'Platinum';
    else if (newTotalSpending >= 50000) newTier = 'Gold';
    else if (newTotalSpending >= 20000) newTier = 'Silver';

    const updatedUser = {
      ...user,
      totalSpending: newTotalSpending,
      rewardPoints: newRewardPoints,
      membershipTier: newTier,
    };

    setUser(updatedUser);
    localStorage.setItem('easyshop_user', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('easyshop_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      localStorage.setItem('easyshop_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserSpending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
