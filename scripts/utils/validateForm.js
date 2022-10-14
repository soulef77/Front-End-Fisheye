

// eslint-disable-next-line no-unused-vars
function validateForm() {
  
    var name = document.forms["myForm"]["first"];
    var last = document.forms["myForm"]["last"];
    var email = document.forms["myForm"]["email"];
    var message = document.forms["myForm"]["message"];

    if (name.value == "") {
        document.getElementById('errorname').innerHTML = "Veuillez entrez un prénom valide";
        // var errorName= document.createElement('a');
        // errorName.appendChild(document.createTextNode("Veuillez entrez un prénom valide"));
        name.focus();
        return false;
    } else {
        document.getElementById('errorname').innerHTML = "";
    }

    if (last.value == "") {
        document.getElementById('errorlast').innerHTML = "Veuillez entrez un nom valide";
        last.focus();
        return false;
    } else {
        document.getElementById('errorlast').innerHTML = "";
    }

    if (email.value == "") {
        document.getElementById('erroremail').innerHTML = "Veuillez entrez une adresse mail valide";
        email.focus();
        return false;
    } else {
        document.getElementById('erroremail').innerHTML = "";
    }

    if (email.value.indexOf("@", 0) < 0) {
        document.getElementById('erroremail').innerHTML = "Veuillez entrez une adresse mail valide";
        email.focus();
        return false;
    }

    if (email.value.indexOf(".", 0) < 0) {
        document.getElementById('erroremail').innerHTML = "Veuillez entrez une adresse mail valide";
        email.focus();
        return false;
    }

    if (message.value == "") {
        document.getElementById('errormsg').innerHTML = "Veuillez entrez un message valide";
        message.focus();
        return false;
    } else {
        document.getElementById('errormsg').innerHTML = "";
    }

      console.log("vérification first "+ name.value +" "+ email.value + " " + message.value);
      return true;
}