import { createContext, ReactNode, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../services/apiClient";
import { AxiosError } from 'axios';

type User = {
  email: string;
  // permissions: string[];
  role?:string,
  roles?: string[];
}

type SignInCredentials = {
  identifier: string;
  password: string;
}

type SignUpCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  api.defaults.headers['Authorization'] = '';
  
  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': jwt } = parseCookies();
    
    if (jwt) {
      //api.defaults.headers['Authorization'] = `Bearer ${jwt}`;
      api.get('/users/me').then((response) => {
        const { email, permissions, roles: role } = response.data;

        setUser({
          email,
          // permissions,
          role
        });

      }).catch(() => {
        signOut();      })
    }    
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        case 'signIn':
          Router.push('/dashboard')
          break;
        default:
          break;
      }
    }
  }, [])

  async function signIn({ identifier, password }: SignInCredentials) {
    //delete api.defaults.headers.common["Authorization"];
    try {
      const response = await api.post('auth/local', {identifier: identifier, password: password});

      const { jwt,user } = response.data;

      const {role} = user;

      setCookie(undefined, 'nextauth.token', jwt, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: '/'
      });

      // setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 25 * 30, // 30 days
      //   path: '/'
      // });

      setUser({
        email : identifier,
        // permissions,
        role
      });

      api.defaults.headers['Authorization'] = `Bearer ${jwt}`;

      router.push('/dashboard');

      authChannel.postMessage('signIn');
    } catch (err) {
      console.log('err', err);
    }
  }

  async function signUp({ email, password }: SignUpCredentials) {
    //delete api.defaults.headers.common["Authorization"];
    try {
      const response = await api.post('auth/local/register', {username: email, email: email, password: password});

      const { jwt,user } = response.data;

      const {role} = user;

      setCookie(undefined, 'nextauth.token', jwt, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: '/'
      });

      // setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 25 * 30, // 30 days
      //   path: '/'
      // });

      setUser({
        email : email,
        // permissions,
        role
      });

      api.defaults.headers['Authorization'] = `Bearer ${jwt}`;

      router.push('/dashboard');

      authChannel.postMessage('signIn');
    } catch (err){
      console.log( err.response)
      const {status, data} = err.message;
      console.log( status)
      console.log( data)
      if(status === 400){

        alert(data[0].messages[0].message)
      }

    } 
  }
  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user, isAuthenticated }} >
      {children}
    </AuthContext.Provider>
  )
}