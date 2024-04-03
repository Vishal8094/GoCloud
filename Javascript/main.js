import { userSignIn,userLogin,userRegistration, forgotPasscode} from "../firebase.js";
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');

});
loginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');

});

btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');

});
    

const signInButton = document.getElementById("signin");
signInButton.addEventListener('click',userSignIn);

const disappearButton = document.getElementById("disappear");
disappearButton.addEventListener("click",()=>{
    var text= document.getElementById('mytext');
    text.style.display="none";
});

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click",userLogin);

const registrationButton = document.getElementById("registration_button");
registrationButton.addEventListener("click",userRegistration);

const forgotPassword = document.getElementById("forgot-password");
forgotPassword.addEventListener("click",forgotPasscode);