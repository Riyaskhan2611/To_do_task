// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyC5jL-slRkD_QUFJAliss0CCYEb6XXIpOc",
//     authDomain: "fir-f69fd.firebaseapp.com",
//     projectId: "fir-f69fd",
//     storageBucket: "fir-f69fd.appspot.com",
//     messagingSenderId: "48110327522",
//     appId: "1:48110327522:web:6d2ec74076ff9a8e34f0bb",
//     measurementId: "G-R8P9887T7B"
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// export { auth, provider };

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyC5jL-slRkD_QUFJAliss0CCYEb6XXIpOc",
    authDomain: "fir-f69fd.firebaseapp.com",
    projectId: "fir-f69fd",
    storageBucket: "fir-f69fd.appspot.com",
    messagingSenderId: "48110327522",
    appId: "1:48110327522:web:6d2ec74076ff9a8e34f0bb",
    measurementId: "G-R8P9887T7B"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, database };