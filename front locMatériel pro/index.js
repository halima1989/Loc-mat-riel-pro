
let jwt = window.localStorage.getItem('jwt')
if (!jwt || jwt === 'undefined' || jwt.length < 20) {
    window.location.href = './login.html'
}
const loginBtn = document.querySelector('.login')
const registerBtn = document.querySelector('.register')


async function handleRegister() {

    const nom = document.querySelector('.nom').value;
    const prénom = document.querySelector('.prenom').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const téléphone = document.querySelector('.telephone').value;
    const adresse = document.querySelector('.adresse').value;

    const client = {
        nom: nom,
        prénom: prénom,
        email: email,
        password: password,
        téléphone: téléphone,
        adresse: adresse,
    }
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(client),
    }


    const apiRequest = await fetch('http://localhost:3002/api/register', request)
    const result = await apiRequest.json();
    if (apiRequest.status === 201) {
        window.location.href = './login.html'
    } else {
        alert('Mauvais identifiants')
    }

}

async function insertOneEngin() {
    let nom = document.querySelector('.nom').value
    let image = document.querySelector('.image').value
    let catégorie = document.querySelector('.categorie').value
    let description = document.querySelector('.description').value
    let Nb_exemplaires = document.querySelector('.Nb_exemplaires').value
    let prix_location = document.querySelector('.prix_location').value

    let engin = {
        nom: nom,
        image: image,
        catégorie: catégorie,
        description: description,
        Nb_exemplaires: Nb_exemplaires,
        prix_location: prix_location

    }
    const response = await fetch(
        'http://localhost:3002/api/engin/add',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(engin),
        }
    )


}


async function handleLogin() {
    let email = document.querySelector('.email').value;
    let password = document.querySelector('.password').value;

    let client = {
        email: email,
        password: password,
    };

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(client),
    };

    let apiRequest = await fetch('http://localhost:3002/api/login', request);
    let response = await apiRequest;
    let data = await response.json();
    console.log(response);
    if (response.status === 200) {
        console.log(data)
        let jwt = data.jwt;
        let role = data.role

        window.localStorage.setItem('jwt', jwt);
        window.localStorage.setItem('role_id', role)
        console.log(role)

        if (role === 2) {
            console.log("je suis l'admin");
            window.location.href = '../admin.html';
        }
        else {
            window.location.href = '../user.html';

        }
    } else {
        alert('Mauvais identifiants');
    }
};

const deconnecterBtn = document.querySelector('.deconnecter')
function deconnexion() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role_id')
}

if (deconnecterBtn) {
    deconnecterBtn.addEventListener('click', (e) => {
        e.preventDefault
        deconnexion()
        window.alert('déconnexion')
    })
}


if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault()
        handleRegister()
    })
}

if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        handleLogin()
    })
}


