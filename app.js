let options = {
    method: "GET"
}


// je  recupere la valeur d'un input type texte
document.getElementById("nom").value
// console.log("coucou")


// j'écoute l'utilisateur pendant qu'il écrit

let nomInput = document.getElementById("nom")
nomInput.addEventListener("input", () => {

})

//////////
// ici la partie de vérification du formulaire

//je recupere le nom
let nom = document.getElementById("nom")
nom.addEventListener("change", () => {
    testNom()
})

// je recupere le prenom
let prenom = document.getElementById("prenom")
prenom.addEventListener("change", () => {
    testPrenom()
})

//je recupere l'adresse mail
let email = document.getElementById("email")
email.addEventListener("change", () => {
    verifMail()
})

//je recupere le siret
let siret = document.getElementById("siret")
siret.addEventListener("change", () => {
    verifSiret()
})

//je recupere le chackbox des cgu
let checkDoc = document.getElementById("cgu")
checkDoc.addEventListener("change", () => {
    verifCheck()
})

// ici les fonctions pour la verification des donnes:

//pour le NOM:
function testNom() {

    //je teste si le champ est vide
    if (nom.value == "") {
        // affiche le message d'erreur
        // met le rouge sur l'input
        afficheErreur("nom", "ce champs ne peut pas être vide")
        return false
    }

    // si characteres bizzares
    else {
        let reg = /^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/

        if (reg.test(nom.value) === false) {

            afficheErreur("nom", "ce champ comporte des caracteres non autorisés")
            return false
        }

        // il ya du code
        else if (hasCode(nom.value)) {
            afficheErreur("nom", "vous ne pouvez pas ecrire du code ici")
            return false
            // si trop long
        } else if (nom.value.length >= 50) {
            afficheErreur("nom", "vous avez ecrit un nom trop long!")
        }
    }
    //si tout est juste, j'enleve l'erreur et je retourne 'true' pour la suite
    enleveErreur("nom")
    return true
}

// pour PRENOM:
function testPrenom() {
    //si vide
    if (prenom.value == "") {
        afficheErreur("prenom", "ce champ n'est pas rempli correctement")
        return false
    } else
    // si characteres bizzares
    {
        let reg = /^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/
        if (reg.test(prenom.value) === false) {
            afficheErreur("prenom", "ce champ comporte des caracteres non autorisés")
            return false
        }
        //si code
        else if (hasCode(prenom.value)) {
            afficheErreur("prenom", " pas de code ici!")
            return false
        }
        //si trop long
        else if (prenom.value.length >= 50)
            afficheErreur("prenom", "prenom trop long")
    }
    //si tout est juste, j'enleve l'erreur et je retourne 'true' pour la suite
    enleveErreur("prenom")
    return true
}
// function pour verifier si il y a du code dans le champ:

function hasCode(text) {
    // cherche s'il y a une balise script
    // retour true : il y'a du code
    // false :y'a pas de code
    let reg = /<script/
    return reg.test(text)

}


// Pour l'adresse mail:

function verifMail() {
    // regle pour adresse mail conforme:

    let reg = / ^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$ /
    let email = document.getElementById("email")

    if (reg.test(email.value) === false) {
        afficheErreur("email", "adresse mail non valide")
        return false
    }
    enleveErreur("email")
    return true
}

// Pour le mot de passe:

function verifMdp() {

    // regle pour mot de passe conforme:
    let reg = / ^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$ /
    let mdp = document.getElementById("mdp")
    if (reg.test(mdp.value) === false) {
        afficheErreur("mdp", "mot de passe non conforme")
        return false
    }
    enleveErreur("mdp")
    return true

}




// verification SIRET:
function verifSiret() {
    // ma regle pour numero siret conforme:
    let reg = / ^\d{14}$ /
    let siret = document.getElementById("siret")

    if (reg.test(siret.value) === false) {
        afficheErreur("siret", "siret non valide")
        return false
    }
    enleveErreur("siret")
    return true

}

/* 
explication de l'expression regulière pour la verification SIRET:
    ^ : Indique le début de la chaîne.
    \d : Représente un chiffre (0-9).
    {14} : Spécifie que le chiffre précédent (le \d) doit apparaître exactement 14 fois.
    $ : Indique la fin de la chaîne.
*/


// fonction qui déroule la saisie du siret si l'option "Professionnel" a été cochée.
//j'appelle mon id "siPro"  et mon id "professionnel" -
//Je récupere le bouton radio qui est coché
let siPro = document.querySelector("#siPro")
let professionnel = document.querySelector("#professionnel")


// j'écoute le changement  

professionnel.addEventListener("change", () => {
    console.log(professionnel.value)
    deroulePro()
})



// si "profesionnel" est coché, deroule mes options

// function deroule pro qui ouvre la saisie du siret et le numero de postes à renseigner qui initialement a la classe'cachée'

function deroulePro() {
    if (professionnel.checked === true) {
        siPro.classList.remove("hidden")
        siPro.classList.add("active")
    }
}


// Pour savoir si la case des CGU est cochée

function verifCheck() {
    if (cgu.checked === false) {
        afficheErreur("cgu", "veuillez accepter les cgu!")
        return false
    }
    enleveErreur("cgu")
    return true

}




// fonction pour afficher une erreur: 
// role: afficher une erreur  en mettant une bordure rouge et en affichant un message d'erreur
//parametre: id de l'input dans lequel il y a l'erreur
// message d'erreur: le message à afficher
// retour:rien

function afficheErreur(id, messageErreur) {

    let input = document.getElementById(id)
    input.classList.add("input-error")

    let p = document.getElementById("error-" + id)
    p.innerText = messageErreur
    p.classList.remove("d-none")

}

function enleveErreur(id) {
    //role: enleve l'erreur sur l'input et cache le paragraphe associé

    let input = document.getElementById(id)
    input.classList.remove("input-error")
    let p = document.getElementById("error-" + id)
    p.innerText = ""
    p.classList.add("d-none")
}


// J'ecoute la soumission du formulaire 
let form = document.getElementById("mon-formulaire")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e)

    // vérifier ce qui a été saisi
    //si c'est tout bon: je soumets mon formulaire

    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;



})
