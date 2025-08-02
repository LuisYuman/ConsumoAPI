const mainContent = document.getElementById("main-content");

fetch("https://the-cocktail-db.p.rapidapi.com/randomselection.php", {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0f045e8f72msha611b5a4bee1a4ep1e451cjsncd8462cfe8e9", 
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
  }
})
.then(response => response.json())
.then(data => {
  const drinks = data.drinks.slice(0, 5); // Solo mostrar 5 bebidas

  data.drinks.slice(0, 5).forEach((drink, index) => {
  const col = document.createElement("div");
  col.className = "col-md-4 col-sm-6 mb-4";

  const fullText = drink.strInstructions || "Sin descripción disponible";
  const shortText = fullText.substring(0, 100);

  const card = document.createElement("div");
  card.className = "card h-100 shadow cocktail-card";

  card.innerHTML = `
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
    <div class="card-body">
      <h5 class="card-title">${drink.strDrink}</h5>
      <p class="card-text" id="text-${index}">${shortText}...</p>
      <button class="btn btn-sm btn-outline-primary" onclick="toggleText(${index}, \`${shortText}\`, \`${fullText}\`)">
        Ver más
      </button>
    </div>
  `;
  

    col.appendChild(card);
    mainContent.appendChild(col);
  });
})
.catch(error => {
  console.error("Error al obtener datos del API:", error);
});

function toggleText(index, shortText, fullText) {
  const textElement = document.getElementById(`text-${index}`);
  const button = textElement.nextElementSibling;

  if (button.innerText === "Ver más") {
    textElement.innerText = fullText;
    button.innerText = "Ver menos";
  } else {
    textElement.innerText = shortText + "...";
    button.innerText = "Ver más";
  }
}

