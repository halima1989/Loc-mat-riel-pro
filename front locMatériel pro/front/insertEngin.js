async function getAllListings() {
    try {
      let apiCall = await fetch("http://localhost:3000/api/allEquipment");
      let response = await apiCall.json();
      console.log(response);
  
      let cardsContainer = document.querySelector(".cards");
  
      response.data.forEach((listing) => {
        // Accéder à response.data
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "20rem";
        card.style.padding = "30px";
        card.style.margin = "8px";
  
        card.innerHTML = `
  <div class="container d-flex flex-wrap">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <div class="card-body">
            <h5 class="card-title">${nom}</h5>
            <img src="${image}" class="img-fluid"> <!-- Ajout de la classe img-fluid -->
            <p class="card-text">${catégorie}</p>
            <p class="card-text">${description}</p>
            <p class="card-text">Prix : ${Nb_exemplaires} $</p>
            <p class="card-text">Quantity : ${prix_location}</p>
            <div> <button class='btnDelete-${engin_id}' > <i class="fa-solid fa-trash"></i> </button>  <button class='ml-2 btnEdit-${engin_id}' >         <i class="fa-solid fa-pen-to-square"></i>
 </button> </div></div>  
          </div>
        </div>
      </div>
    </div>
  </div>
        `;
  
        cardsContainer.appendChild(card);
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  }
  
  function logout() {
    localStorage.removeItem("jwt");
  }
