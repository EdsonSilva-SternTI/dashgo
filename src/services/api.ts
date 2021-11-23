// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
// });

// export default api;

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
    console.log('nextauth.token',token)
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
  
//   api.interceptors.response.use(response => {
//     return response
//   }, (error: AxiosError) => {
//     if (error.response.status === 401) {
//       if (error.response.data?.code === 'token.expired') {
//         cookies = parseCookies(ctx);
  
//         const { 'nextauth.refreshToken': refreshToken } = cookies;
//         const originalConfig = error.config;
  
//         if (!isRefreshing) {
//           isRefreshing = true;
  
//           api.post('/refresh', { refreshToken }).then(response => {
//             const { token } = response.data;
    
//             setCookie(ctx, 'nextauth.token', token, {
//               maxAge: 60 * 60 * 25 * 30, // 30 days
//               path: '/'
//             });
      
//             setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
//               maxAge: 60 * 60 * 25 * 30, // 30 days
//               path: '/'
//             });
    
//             api.defaults.headers['Authorization'] = `Bearer ${token}`;
  
//             failedRequestQueue.forEach(request => request.onSuccess(token));
//             failedRequestQueue = [];
//           }).catch((err) => {
//             failedRequestQueue.forEach(request => request.onFailure(err));
//             failedRequestQueue = [];
  
//             if (process.browser) {
//               signOut();
//             }
//           }).finally(() => {
//             isRefreshing = false;
//           })
//         }
  
//         return new Promise((resolve, reject) => {
//           failedRequestQueue.push({
//             onSuccess: (token: string) => {
//               originalConfig.headers['Authorization'] = `Bearer ${token}`;
  
//               resolve(api(originalConfig));
//             },
//             onFailure: (err: AxiosError) => {
//               reject(err)
//             },
//           })
//         })
//       } else {
//         if (process.browser) {
//           signOut();
//         } else {
//           return Promise.reject(new AuthTokenError());
//         }
//       }
//     }
  
//     return Promise.reject(error);
//   });

  return api;
}