import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth,GoogleAuthProvider, signInWithPopup,onAuthStateChanged ,createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getStorage,ref } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js"; 

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAYAWd-ruaT8e-aXcOwHAzG05dAprOqzoI",
    authDomain: "gocloud-da6fd.firebaseapp.com",
    projectId: "gocloud-da6fd",
    storageBucket: "gocloud-da6fd.appspot.com",
    messagingSenderId: "390719678134",
    appId: "1:390719678134:web:8d3bddfab4edf547e72817",
    measurementId: "G-BGPMWRYS35"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const Oauth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  //firestore 
  export const storage = getStorage(app);
  export const storageRef = ref(storage);

  //email
  export let mail;

export const userSignIn = async() =>{
    
    signInWithPopup(auth,provider)
    .then((result)=>{
            const user= result.user;
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    window.location.href="home.html";
                    document.cookie = `email=${user.email}`;
                }
                else{
            
                }
              })
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

export const userLogin = async()=>{
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  
  signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      window.location.href = "home.html";
      document.cookie = "Hello " + userCredential.user;
    }).catch((error)=>{
      console.log("Error : " + error);
    });
  //window.location.href = "home.html";
  
}

export const userRegistration = async()=>{

  const email = document.getElementById("register_email").value;
  const password = document.getElementById("register_password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if(password == confirmPassword){
    
    createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        console.log("Account created successfully");
        window.location.href = "index.html";
      }).catch((error)=>{
        console.log("Error : " + error.message);
      })
  }else console.log("Wrong Password!");
}

export const forgotPasscode = async()=>{

  const email = document.getElementById("login-email").value;
  sendPasswordResetEmail(auth,email)
    .then(()=>{
      console.log("Mail send Successfully!");
    }).catch((error)=>{
      console.log("Error : " + error);
    })
}



