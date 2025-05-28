import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Store registered users in localStorage
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const register = async (email: string, password: string, name: string) => {
    // Check if user already exists
    if (registeredUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name,
      isAdmin: false,
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    try {
      // Check for admin credentials
      if (email === 'admin@shoppyglobe.com' && password === 'N1sini@n2sinr') {
        const adminUser: User = {
          id: 'admin',
          email,
          isAdmin: true,
          name: 'Admin',
        };
        setUser(adminUser);
        return;
      }

      // Check registered users
      const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        // Remove password before setting user
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        return;
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 