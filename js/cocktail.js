// ** load drink data 

const loaddrinkData = async (searchText,dataLimit)=>{
    try {

        if (searchText) {
            if (searchText.length !== 0) {
                // ** sppiner starts
                sppinerToggler(true)
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
                response.ok ? console.log('Successfull') : console.log('Failed')
                const data = await response.json();
                drinkDisplay(data,dataLimit);
                document.getElementById('no-data').classList.add('d-none')
            } else{
                document.getElementById('no-data').classList.remove('d-none')
                
            }
        } else {
                sppinerToggler(true)
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
                response.ok ? console.log('Successfull') : console.log('Failed')
                const data = await response.json();
                drinkDisplay(data,dataLimit);
                document.getElementById('no-data').classList.add('d-none')
        }

        
        
    } catch (error) {
        console.log(error)
    }
};

// ** Display drink data

const drinkDisplay = (data,dataLimit) => {
    // ** drink data where to display
    const drinkContainer = document.getElementById('drink-display');
    drinkContainer.textContent = '';

    let {drinks} = data;

    if (drinks === null) {
        document.getElementById('no-data').classList.remove('d-none');
        sppinerToggler(false)
    } else{
        document.getElementById('no-data').classList.add('d-none');
        sppinerToggler(true)
    }

    // drinks === null && 
    // console.log(drinks.length)

    if (drinks.length > dataLimit && dataLimit) {
        document.getElementById('show-all').classList.remove('d-none')
        drinks = drinks.slice(0,dataLimit);
    } else{
        document.getElementById('show-all').classList.add('d-none')
        // console.log(drinks)
    }
    console.log(drinks.length)
    
    drinks.forEach(drink => {
        const {idDrink,strDrinkThumb,dateModified,strAlcoholic,strGlass,strCategory,strInstructions,strDrink} = drink;
        const drinkContent = document.createElement('div');

        drinkContent.classList.add('col');
        drinkContent.innerHTML = `
        <div class="card h-full shadow-lg">
        <img src="${strDrinkThumb ? strDrinkThumb : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Klassiche_Margarita.jpg/400px-Klassiche_Margarita.jpg?20120724204522'}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h3 class="card-title">${strGlass ? strGlass : strDrink}</h3>
            <h2 class="card-title text-danger">${strAlcoholic ? strAlcoholic : 'N/A'}</h2>
            <p class="card-text">${strInstructions ? strInstructions.slice(0,70) : 'No Instructions given'}</p>
            <small class='text-info'>Drink Type:${strCategory ? strCategory : 'N/A' }</small>
            <footer class='text-success'>
                Date:<span class='text-primary'> ${new Date(dateModified).toLocaleDateString()}</span>
            </footer>
        </div>
        `;

        drinkContainer.appendChild(drinkContent)
    })

    // ** sppiner ends
    sppinerToggler(false)
};

// ** Search process


// ** search button implimentation

document.getElementById('button-addon2').addEventListener('click',()=>{
    // ** search input value get
    const searchValue = inputFieldValue('search-input');
    loaddrinkData(searchValue,4);

});

// ** Search input enter functionality

document.getElementById('search-input').addEventListener('keypress',(event)=>{
    const searchValue = inputFieldValue('search-input');
    event.key === 'Enter' &&  loaddrinkData(searchValue,4) ;
    // loaddrinkData(searchValue)
})

// ** sppiner toggler 

const sppinerToggler = (isSpining)=>{
    const sppiner = document.getElementById('sppiner');
    isSpining ? sppiner.classList.remove('d-none') : sppiner.classList.add('d-none')
}



// ** data loaded
loaddrinkData()

// ** Show All button functionality

document.getElementById('show-all-button').addEventListener('click',()=>{
    const searchValue = inputFieldValue('search-input');
    loaddrinkData(searchValue);
})

// ** 1.sppiner
// ** 2. 20 ta kore data show kora
// ** details
