const passwordBox = document.getElementById("password");
const length = 12;

const UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~|}{[]></-=";

const allChars = UpperCase + LowerCase + number + symbol;

function createPassword(){
    let password = "";
    password += UpperCase[Math.floor(Math.random() * UpperCase.length)];
    password += LowerCase[Math.floor(Math.random() * LowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while(length > password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    passwordBox.value = password;
}

function copyPass(){
    passwordBox.select();
    passwordBox.setSelectionRange(0,99999);
    navigator.clipboard.writeText(passwordBox.value);
    alert("Copied the text: " + passwordBox.value);
}