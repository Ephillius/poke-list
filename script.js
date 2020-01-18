//Vue instance created
new Vue({
    //element that is gonna be controlled
    el: '#app',
    //all the variables needed throughout this project
    data: {
        toggle: false,
        pokemonSprite: 'https://image.flaticon.com/icons/svg/748/748044.svg',
        name: 'n/a',
        hp: 'n/a',
        type1: 'n/a',
        type2: '',
        text: 'n/a'
    },
    beforeMount() {
        this.pokemonInfo();
    },
    methods: {
        //generate pokemon stats and pokedex entry - used on button click as well
        pokemonInfo() {
            const pokemonID = Math.floor(Math.random() * 151) + 1;
            const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID;
            const urlPokedex = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonID;
            const self = this;

            axios.all([
                    axios.get(urlPokemon),
                    axios.get(urlPokedex)
                ])
                .then(axios.spread((pokemonRes, pokedexRes) => {
                    const pokemonStats = pokemonRes.data;
                    const pokedexEntry = pokedexRes.data;

                    console.log(pokemonStats);
                    console.log(pokedexEntry);

                    //pokemon stats
                    self.pokemonSprite = pokemonStats.sprites.front_default;
                    self.name = pokemonStats.name;
                    self.hp = pokemonStats.stats[5].base_stat;
                    self.type1 = pokemonStats.types[0].type.name;
                    if (pokemonStats.types.length == 2) {
                        self.type2 = `/` + pokemonStats.types[1].type.name;
                    } else {
                        self.type2 = '';
                    }

                    //pokedex entry for the specific pokemon
                    const entriesList = pokedexEntry.flavor_text_entries;
                    for (i = 0; i < entriesList.length; i++) {
                        if (entriesList[i].version.name == 'alpha-sapphire' && entriesList[i].language.name == 'en') {
                            self.text = entriesList[i].flavor_text;
                            break;
                        }
                    }
                }))
                .catch(axios.spread((pokemonError, pokedexError) => {
                    console.log(pokemonError);
                    console.log(pokedexError);
                }))
        }
    }
});