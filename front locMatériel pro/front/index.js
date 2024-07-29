let cards = document.querySelector('.card')

async function createLocation() {
    let jwt = window.localStorage.getItem('jwt')

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }

 

        let btnSupprimer = document.querySelector(`.btnDelete-${engin_id}`)
        btnSupprimer.addEventListener('click', () => {
            SupprimerLocation(engin_id)
        })

        let btnModifier = document.querySelector(`.btnEdit-${engin_id}`)
        btnModifier.addEventListener('click', () => {
            modifierLocation(engin_id , engin)
        })
    }


createLocation()

async function SupprimerLocation(engin_id) {
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(engin_id),
    }

    let apiRequest = await fetch('http://localhost:3002/api/deleteEngin/:engin_id', request)
    let response = await apiRequest.json()
}

let modalSupprimer = document.querySelector('.modal');
let btnClose = document.querySelector('btn-close');
modalSupprimer.style.display ='block';
btnClose.onclick = function() {
    modalSupprimer.style.display = 'none';
  }
  



async function modifierLocation(engin_id, engin) {
    let nom = document.querySelector('.nom')
    let description = document.querySelector('.description')
    let prix_location = document.querySelector('.prix')
    let image = document.querySelector('.image')
    let categorie = document.querySelector('.categorie')

    nom.value = engin.nom
    description.value = engin.description
    prix_location.value = engin.prix_location
    image.value = engin.image
    categorie.value = engin.categorie

    modal.classList.remove('hidden')
}
function editerEngin() {
    modal.classList.add('hidden')

    let nom = document.querySelector('.nom').value
    let description = document.querySelector('.description').value
    let prix_location = document.querySelector('.prix').value
    let image = document.querySelector('.image').value
    let catégorie = document.querySelector('.categorie').value

    console.log(nom, description, prix_location,catégorie,image )
}