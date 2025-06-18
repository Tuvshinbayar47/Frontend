console.log('Pokemon');

function openDropMenu(){
    document.getElementById('')
}

const dropdownButton = document.getElementById('dropdownButton');
const dropDownMenu = document.getElementById('dropDownMenu');
const dropText = document.querySelector('dropText');

dropdownButton.addEventListener('event', (event) => {
    event.stopPropagatio();
    dropDownMenu.classList.toggle('show');
});
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event .target) && !dropDownMenu.contains(event.target)) {
        dropDownMenu.classList.toggle('show');
    }
})


function openPanel(){
    document.getElementById('slidePanel').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}

function closePanel(){
    document.getElementById('slidePanel').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
}



const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100';

const pokemonContainer = document.querySelector('.Pokemon-Container');
const loadingText = 'waiting...';
let globalData = []

fetch(POKEMON_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const results = data.results;
        console.log('Results: ', results);


        for (let i = 0; i < results.length; i++) {
            //     console.log(results[i]);
            //     pokemonContainer.innerHTML += `
            // <h1>${results[i].name}</h1>
            // `;


            const pokemonDetailURL = results[i].url;
            fetch(pokemonDetailURL)
                .then((response) => response.json())
                .then((data) => {
                    globalData.push(data);
                    const typeName01 = document.createElement('span');
                    typeName01.textContent = [data.types[0].type.name]
                    const pokemonCard = document.createElement('div');
                    pokemonCard.className = 'pokemon-card';
                    pokemonCard.style.backgroundColor = pokemonBackgroundColor[[data.types[0].type.name]];
                  

                    // Pokemon Image
                    const pokemonImg = document.createElement('img');
                    pokemonImg.src = data.sprites.other["official-artwork"].front_default;
                    pokemonImg.className = 'pokemon-img';

                    //Pokemon Name
                    const titleElement = document.createElement('h1');
                    titleElement.textContent = data.name
                    pokemonCard.appendChild(titleElement);

                    //Pokemon ID
                    const numberElement = document.createElement('h5');
                    numberElement.classList.add('pokemon-id');
                    // numberElement.textContent = ('#') + data.id < 100 ? "000" : data.id < 100 ? "0" : "" + data.id;÷
                    numberElement.textContent = `#${data.id < 10 ? "00" : data.id < 100 ? "0" : ""}${data.id}`;
                    pokemonCard.appendChild(numberElement);


                    //Pokemon Type 01
                    const typeElement = document.createElement('div');
                    typeElement.classList.add('pokemon-type');
                    const typeElementImage1 = document.createElement('img');
                    typeElementImage1.src = pokemonIcon[data.types[0].type.name]
                    typeElement.appendChild(typeElementImage1);
                    typeElement.appendChild(typeName01);



                  
                    typeElement.style.backgroundColor = pokemonTypes[[data.types[0].type.name]];


                    pokemonCard.appendChild(typeElement)
                    pokemonCard.appendChild(pokemonImg);
                    pokemonContainer.appendChild(pokemonCard);
                    
                    if (data.types[1]) {
                        //Pokemon type 02
                        const typeElement2 = document.createElement('div');
                        typeElement2.classList.add('pokemon-type2');
                        const typeName02 = document.createElement('span');
                        //Type 02 Name
                        typeName02.textContent = data.types[1].type.name;
                        //Type 02 img
                        const typeElementimage2 = document.createElement('img');
                        //Type 02 Icon
                        typeElementimage2.src = pokemonIcon[data.types[1].type.name]
                        //Type 02 Background 
                        typeElement2.style.backgroundColor = pokemonBackgroundColor[data.types[1].type.name]


                        typeElement2.appendChild(typeElementimage2)
                        typeElement2.appendChild(typeName02)


                        typeElement2.style.backgroundColor = pokemonTypes[typeName02]
                        pokemonCard.appendChild(typeElement2)
                    }
                })
        }
    })


const pokemonBackgroundColor = {
    fire: '#FF6464',
    bug: '#91AC22',
    water: '#009ACB',
    flying: '#2299EE',
    poison: '#7E00CB',
    normal: '#B6B6B6',
    rock: '#CFC06F',
    ground: '#A77437',
    fighting: '#BA114E',
    ghost: '#B592FF',
    psychic: '#C4484A',
    ice: '#AEFFF4',
    dragon: '#87C5FF',
    dark: '#8F8F8F',
    fairy: '#FFA2E3',
    electric: '#B7B117',
    grass: '#1EBA11',
    steel: '#A4FFE9',
    water: '#009ACB',
}
const pokemonTypes = {
    fire: "#EB6C6C",
    bug: "#C9FF84",
    water: "#9FF3FF",
    flying: "#2299EE",
    poison: "#D89CFD",
    normal: "#CBCBCB",
    rock: "#CFC06F",
    ground: "#FFBF72",
    fighting: "#FF699F",
    ghost: "#B592FF",
    psychic: "#FF5E60",
    ice: "#AEFFF4",
    dragon: "##87C5FF",
    dark: "#8F8F8F",
    fairy: "#FFA2E3",
    electric: "#FFFA86",
    steel: "#A4FFE9",
    grass: "#80E177"
}
const pokemonIcon = {
    fire: 'img/fire.svg',
    bug: 'img/bug.svg',
    water: 'img/water.svg',
    flying: 'img/flying.svg',
    poison: 'img/poison.svg',
    normal: 'img/normal.svg',
    rock: 'img/rock.svg',
    grass: 'img/grass.svg',
    ground: 'img/ground.svg',
    fighting: 'img/fighting.svg',
    ghost: 'img/ghost.svg',
    psychic: 'img/psychic.svg',
    ice: 'img/ice.svg',
    dragon: 'img/dragon.svg',
    dark: 'img/dark.svg',
    fairy: 'img/fairy.svg',
    electric: 'img/electric.svg',
    steel: 'img/steel.svg',
}


// Search 
async function fetchData(searchTerm = ''){
    try{
        
       const searchResult = globalData.filter((data) => data.name.includes(searchTerm))
       console.log(searchResult)
       for(let i = 0; i < searchResult.length; i++){
        displayData(searchResult[i])
       }
        
        console.log(searchResult    )
    }catch(error) {
        console.error('Error occurerred to load data,', error);
        document.getElementById('result').innerHTML =`
        <div class="loading">Error during Fetch. try again later</div>`;
    }
}


function displayData(pokemon){
    console.log("Pokemon: ", pokemon);
    pokemonContainer.innerHTML = ''; 
    
    if(pokemon.length === 0){
        pokemonContainer.innerHTML = `
        <div class="loading">No pokemon found</div>
        `;
    }


    const pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.sprites.other["official-artwork"].front_default;
    pokemonContainer.appendChild(pokemonImg);
    pokemonImg.style.width = "100px";
    pokemonImg.style.height = "100px";
    
    const titleElement = document.createElement('h1');
    titleElement.src = pokemon.name
    pokemonContainer.appendChild(titleElement);

    const numberElement = document.createElement('h5');
    numberElement.classList.add('pokemon-id');
    numberElement.textContent = `#${data.id < 10 ? "00" : data.id < 100 ? "0" : ""}${data.id}`;
    pokemonCard.appendChild(numberElement);



    

    
    
    
    

     
    


}
function searchData(){
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);
    fetchData(searchInput);
}


searchButton.addEventListener('click', searchData);
