
import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestQueue = [];



export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  function setAuthorization(){
    const token = cookies['nextauth.token']
    if(token) {
     return {
             Authorization: `Bearer ${cookies['nextauth.token']}`
            }
    }
    return {};
  }

  const api = axios.create({
    baseURL: 'https://digital-company.herokuapp.com', 
    headers: setAuthorization()
  });
  
  return api;
}