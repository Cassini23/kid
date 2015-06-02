/*
@constructor
 */

function AuthenticateService(){

}

AuthenticateService.prototype.create = function(dataObj){
    makeAjaxCall('POST','/accountRouter/register', dataObj, printData);
};

AuthenticateService.prototype.log = function(dataObj){
    makeAjaxCall('POST','/accountRouter/login', dataObj, printData);
};


AuthenticateService.prototype.validate = function(dataObj){
    makeAjaxCall('POST','/accountRouter/validatePhone', dataObj);
};

function getData(data){
//    console.log('form ',data.name);//form data
    var dataObj = {};
    if(data.name === 'register'){
        dataObj.username = data.uname.value;
        dataObj.email = data.email.value;
        dataObj.password = data.password.value;
        dataObj.phone = data.phone.value;
        dataObj.carrier = data.carrier.value;
        dataObj.code = data.verify.value;
        console.log('final data object   ',dataObj);//form data
    }
    else{
        dataObj.username = data.uname.value;
        dataObj.password = data.password.value;
    }

    return dataObj;

}

function makeAjaxCall(HttpVerb, url, dataObject, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(HttpVerb, url);
    if(HttpVerb === 'POST') xhr.setRequestHeader('content-type','application/json');
    xhr.addEventListener('readystatechange', function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                callback(JSON.parse(xhr.responseText));
            }
        }
    });
    if(HttpVerb === 'POST')  xhr.send(JSON.stringify(dataObject));
    else xhr.send();
}

//form validate

function printData(data){
    var header = document.querySelector('.header');
    header.innerHTML = data.msg;
    createElement('a',header,'header logout','Log Out');
}


function createElement(elementType, parent, className, innerHTML, custom) {
   var element = document.createElement(elementType);
   if (parent) parent.appendChild(element);
   if (className) element.className = className;
   if (innerHTML) element.innerHTML = innerHTML;
   if (typeof custom !== 'undefined') {
       for (var prop in custom) {
           element.setAttribute(prop, custom[prop]);
       }
   }
   return element;
}

document.addEventListener('DOMContentLoaded', function(){
    var registerForm = document.forms.register;
    var loginForm = document.forms.login;
    //anchors

    var register = document.querySelector('a.register');
    var login = document.querySelector('a.login');

    var as = new AuthenticateService();

    var regBtn  = document.querySelector('#register');
    var logBtn  = document.querySelector('#log');
    var valBtn = document.querySelector('#authCode');

    regBtn.addEventListener('click', function(event){
        event.preventDefault();
        as.create(getData(registerForm));
    });

    logBtn.addEventListener('click',function(event){
        event.preventDefault();
        as.log(getData(loginForm));
    });

    valBtn.addEventListener('click',function(event){
        event.preventDefault();
        as.validate(getData(registerForm));
        regBtn.disabled = false;
        var verify = document.querySelector('#verify');
        verify.style.display = 'block';
    });

    register.addEventListener('click', function(event){
        event.preventDefault();
        registerForm.style.display ='block';
        loginForm.style.display = 'none';
    });

    login.addEventListener('click',function(event){
        event.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display ='none';
    });
});