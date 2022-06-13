//select elements
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
//dictionary, mapping each type of pokemon by color
const typeColors = {
    electric: '#FFEA70',
    dark: '#000',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
    fairy: '#DA627D'
};

//search pokemon by name
const searchPokemon = event => {
    //cancel log of the page
    event.preventDefault();
    //get the value of pokemon input
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    //take the image of each pokemon
    const sprite = data.sprites.front_default;
    //show types and stats
    const { abilities, stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `${data.id}`
    //setCardColor(types);
    setBackColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonAbilities(abilities);
    console.log(types)
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    //ask if have another color ?  
    //and if we have a color, do the same up 
    //: if not, set default color
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const setBackColor = types =>{
    const backColorOne = typeColors[types[0].type.name];
    const backColorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeCard.style.background = `linear-gradient(to bottom, ${backColorOne} 1%, ${backColorTwo} 100%)`;
}

const renderPokemonTypes = types => {
    // erase the last pokemon types that were search
    pokeTypes.innerHTML = '';
    // for each type create a div and set a color and text
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.backgroundColor = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        // if we have one type, just take one, if we have more, render 2 types
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    const titleStats = document.createElement("h3");
    titleStats.textContent = "Stats";
    pokeStats.appendChild(titleStats);
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonAbilities = abilities => {
    pokeAbilities.innerHTML = '';
    const titleAbility = document.createElement("h3");
    titleAbility.textContent = "Abilities";
    pokeAbilities.appendChild(titleAbility);
    abilities.forEach(ability => {
        const statAbilityName = document.createElement("div");
        statAbilityName.textContent = ability.ability.name;
        pokeAbilities.appendChild(statAbilityName);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'img/poke-shadow.jpg');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeAbilities.innerHTML = '';
    pokeCard.style.background =  '#000';
}