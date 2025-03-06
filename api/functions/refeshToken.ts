// import { DeviceEventEmitter } from 'react-native';

// export default async () => {
//   try {
//     const session = await Auth.currentSession();
//     const idToken = session.getIdToken();
//     const accessToken = session.getAccessToken();

//     const idTokenExp = idToken.getExpiration(); // Unix timestamp
//     const accessTokenExp = accessToken.getExpiration(); // Unix timestamp
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//     if (idTokenExp > currentTime && accessTokenExp > currentTime) {
//       return session;
//     } else {
//       return await Auth.currentSession(); // This will refresh the tokens
//     }
//   } catch (error) {
//     DeviceEventEmitter.emit('TokenExpire');
//     throw error; // Handle error, possibly redirect to login
//   }
// };
