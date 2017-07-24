Ajax = {
    var form = document.getElementById('signup');
    var email = form.email.value;
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    // if( email == "" || !emailFormat){
    //     // write message in message space
    //     return false;
    // }
    var pass = form.password.value;
    var confirmPass = form.confirmPassword.value;

    if(pass == "" || confirmPass == ""){
        //write message empty field
        return false;
    }

    if (pass != confirmPass){
        //write message pass not same with confirm password
        return false;
    }

    var params = `email=${email}&password=${pass}`;
    var ajax = new XMLHttpRequest(); 

    ajax.open("POST", "/newUser", true);
    
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // ajax.onreadystatechange = function () {
    // if(ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
    //     console.log(JSON.parse(ajax.responseText));
    //         form.reset();
    //     }
    // };
    // console.log(params);
    ajax.send(params);
}

function valite(){
    console.log('esta vaina')
    Ajax.post(function(response){
      if(response.success == "success") {
        window.location.assign('/');
      } else {
        window.location.assign('/signUp');
      }
    }); 
}

valite();

