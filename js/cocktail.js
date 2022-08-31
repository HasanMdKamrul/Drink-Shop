// ** load drink data 

const loaddrinkData = async (searchText)=>{
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
        response.ok ? console.log('Successfull') : console.log('Failed')
        const data = await response.json();
        drinkDisplay(data);
    } catch (error) {
        console.log(error)
    }
};

// ** Display drink data

const drinkDisplay = data => {
    // ** drink data where to display

    const drinkContainer = document.getElementById('drink-display');

    const {drinks} = data;

    drinks.forEach(drink => {
        const {idDrink,strDrinkThumb,dateModified,strAlcoholic,strDrink,strCategory} = drink;

        console.log(strDrinkThumb)

        const drinkContent = document.createElement('div');

        drinkContent.classList.add('col');

        drinkContent.innerHTML = `
        
        <div class="card h-full shadow-lg">
        <img src="${strDrinkThumb ? strDrinkThumb : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Klassiche_Margarita.jpg/400px-Klassiche_Margarita.jpg?20120724204522'}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h3 class="card-title">${strDrink}</h3>
            <h2 class="card-title text-danger">${strAlcoholic}</h2>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <small class='text-info'>Drink Type:${strCategory}</small>
            <footer class='text-success'>
                Date:<span class='text-primary'> ${new Date(dateModified).toLocaleDateString()}</span>
            </footer>
        </div>
        
        `;

        drinkContainer.appendChild(drinkContent)
    })
}

// ** data loaded
loaddrinkData('Mojito')