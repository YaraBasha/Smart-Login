//variables of the ids 

var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signupBtn = document.getElementById('signupBtn');

var mailExist = document.getElementById('mailExist');

var signUpMessage = document.getElementById('signUpMessage');
var success = document.getElementById('success');


var email = document.getElementById('email');
var password = document.getElementById('password');
var loginbtn = document.getElementById('loginbtn');
var wrongMessage = document.getElementById('wrongMessage');
var userName = localStorage.getItem('loginUser')


var logOut = document.getElementById('logOut')


var array;
//local storage bl info bta3t el user ely bydkhlhaaa
if (localStorage.getItem('informationUser') == null) {
    array = []
}
else {
    array = JSON.parse(localStorage.getItem('informationUser'))
}

//event listener en b3ml check lma a click on sign up lw el account msh mwgood y3ml new account lw mwgood ydy false en already fyh account bl info dyh
signupBtn?.addEventListener('click', function signUp() {

    if (check() == false && isExist() == false) {
        var user = {
            name: signupName.value,
            mail: signupEmail.value,
            pass: signupPassword.value,
        }
        array.push(user)
        localStorage.setItem('informationUser', JSON.stringify(array))
        clear() //clear el info el mktooba b3d ma bdos 
        success.classList.replace('d-none', 'd-block') 
    }


})

//clear el info lma aktebha w a click on
function clear() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";

    //lw ghlt mtfdlsh mwgooda el msg 
    signupName.classList.remove('is-valid', 'is-invalid');
    signupEmail.classList.remove('is-valid', 'is-invalid');
    signupPassword.classList.remove('is-valid', 'is-invalid');
}


function validateInputs(element) {

    //validation lel element
    if (element.value == "") {
        element.classList.remove('is-valid', 'is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return false
    }


    //regex b what should be written in each form swa2 el email b en lazm @example w .com w kam character ll pw and so on
    var regex = {
        signupName: /^[A-z]{2,6}$/,
        signupEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        signupPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    }

    //b test el regex shghal wlla laa wl msg ely el mfrod tzhr if its write or wrong f bn3ml if condition 
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid') //lw sah
        element.classList.remove('is-invalid') //lw ghlt
        element.nextElementSibling.classList.replace('d-block', 'd-none') //replacing el msg mn enha zahra l msh zahra lma tkon sah 
    }
    else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none', 'd-block')

    }
}


//????????
signupName?.addEventListener('input', function () {
    validateInputs(signupName)
})
signupEmail?.addEventListener('input', function () {
    validateInputs(signupEmail)
})
signupPassword?.addEventListener('input', function () {
    validateInputs(signupPassword)
})
email?.addEventListener('input', function () {
    validateInputs(email)
})
password?.addEventListener('input', function () {
    validateInputs(password)
})



//hal el account existed asln wlla dh new one mhtag yt3mlo sign up f3ln f b3ml for loop 3slhan at2kd en each info is existed wlla laa w b3ml if condition b lw el condition is existed my3mlsh sign up wlw not existed y3ml el account 3ady w mydysh invalid msg
function isExist() {
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail == signupEmail.value) {
            mailExist.classList.replace('d-none', 'd-block')
            return true
        }
    }
    mailExist.classList.replace('d-block', 'd-none')
    return false
}

//check for existence 
function check() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        signUpMessage.classList.replace('d-none', 'd-block')
        success.classList.replace('d-block', 'd-none')
        return true
    }
    else {
        signUpMessage.classList.replace('d-block', 'd-none')
        return false
    }
}


//event listener wheen i login , lw false msh hy3ml login lw true y go for another page saying welcome 
loginbtn?.addEventListener('click', function login() {
    var userFound = false
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail == email.value && array[i].pass == password.value) {

            localStorage.setItem('loginUser', array[i].name)
            window.location.replace('welcome.html')
            userFound = true
        }

    }
    if (userFound == false) {
        wrongMessage.classList.replace('d-none', 'd-block')
    }
    else {
        wrongMessage.classList.replace('d-block', 'd-none')

    }
})

//response the welcome page
function welcome() {
    document.getElementById('welcome').innerHTML = ' welcome ' + userName
}

window.addEventListener('load', welcome)

//logout 

logOut?.addEventListener('click', function logOut() {
    localStorage.removeItem('loginUser')
    window.location.replace('login.html')
})