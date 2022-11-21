<template>
  <div class="container">
    <section v-if="pokemon_data.types">
      <div :class="['title', 'bg-'+pokemon_data.types[0].type.name]">
        <h1>{{ pokemon_data.name }}</h1>
      </div>
      <div id="types">
        <h1>Types:</h1>
        <div class="type" v-if="pokemon_data.types.length > 0">
          <span :class="['typeword', pokemon_data.types[0].type.name]">{{ pokemon_data.types[0].type.name }}</span>
        </div>
        <div class="type" v-if="pokemon_data.types.length > 1">
          <span :class="['typeword', pokemon_data.types[1].type.name]">{{ pokemon_data.types[1].type.name }}</span>
        </div>
      </div>
      <div id="properties">
        <span><b>HP:</b> {{ pokemon_data.hp }}</span>
        <span><b>EXP:</b> {{ pokemon_data.experience }}</span>
        <span><b>Taille:</b> {{ pokemon_data.height }}</span>
        <span><b>Epaisseur:</b> {{ pokemon_data.weight }}</span>
      </div>
      <div class="img-container">
        <img :src="pokemon_data.image" />
        <h2 :class="[pokemon_data.types[0].type.name]"><em>#{{ pokemon_data.id }}</em></h2>
      </div>
      <div class="back-container">
        <button v-on:click="this.$router.back()">Retour</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.typeword {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15pt;
  text-shadow: 0 0 15px black, 0 0 10px black;
  padding: 10px;
}

.img-container {
  margin-top: 50px;
}

#properties {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 25px;
  padding: 25px;
  border: 2px dashed white;
  border-radius: 25px;
}

#properties > * {
  color: #ffffff;
  font-size: 17pt;
}

#properties > * > b {
  color: black;
}

.back-container > button {
  margin-left: 50px;
  margin-bottom: 20px;
  padding-block: 10px;
  padding-inline: 20px;
  font-weight: bold;
  cursor: pointer;
}
.back-container {
  display: flex;
  justify-content: start;
  width: 100%;
}

#types {
  margin-top: 100px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#types > div {
  margin-left: 20px;
}
#types > h1{
  color: #343434;
}
.type {
  color: black;
  font-weight: bold;
  border: 3px dashed #4d4d4d;
  padding-inline: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-radius: 20px;
}


div.title {
  margin-top: 20px;
  width: 100%;
  border-block: 2px solid white;
}

div.title > * {
  text-transform: uppercase;
  color: black;
}
table, table * {
  border-collapse: collapse;
  border: 1px solid;
  padding: 30px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40%;
  background-color: #757575;
  box-shadow: 0px 0px 37px 10px rgba(0,0,0,0.75);
  border-radius: 30px;
  margin-bottom: 50px;
}

aside {
  margin-right: 100px;
}

.grass {color: #15aa04;}
.bug {color: #c4c4c4;}
.water {color: aqua;}
.electric {color: yellow;}
.psychic {color: rebeccapurple;}
.flying {color: white;}
.dark {color: #626262;}
.rock {color: saddlebrown;}
.ghost {color: #3e3edc;}
.fairy {color: #c25f29;}
.normal {color: #a9faa5;}
.poison {color: #288600;}
.dragon {color: #ff5f5f;}
.fire {color: #ff0000;}
.ice {color: #b0fff9;}
.ground {color: sandybrown;}
.fighting {color: brown;}

.bg-grass {background-color: #15aa04;}
.bg-bug {background-color: #c4c4c4;}
.bg-water {background-color: aqua;}
.bg-electric {background-color: yellow;}
.bg-psychic {background-color: rebeccapurple;}
.bg-flying {background-color: white;}
.bg-dark {background-color: #626262;}
.bg-rock {background-color: saddlebrown;}
.bg-ghost {background-color: #3e3edc;}
.bg-fairy {background-color: #c25f29;}
.bg-normal {background-color: #a9faa5;}
.bg-poison {background-color: #288600;}
.bg-dragon {background-color: #ff5f5f;}
.bg-fire {background-color: #ff0000;}
.bg-ice {background-color: #b0fff9;}
.bg-ground {background-color: sandybrown;}
.bg-fighting {background-color: brown;}
</style>

<script>
import csv from "csvtojson";

export default {
  name: "pokemon-details",
  data: function (){
    return {
      pokemon_data: {},
      locales: []
    }
  },
  methods: {
    getLocales: function (){
      return fetch("https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv")
          .then((resp) => resp.text())
          .then((data) => csv().fromString(data))
          .then((jsonObj) => {
            this.locales = jsonObj.filter((obj) => obj.local_language_id == "5" || obj.local_language_id == "9");
            if(!(name in this.pokemon_data)) return;
            this.pokemon_data.name = this.getFRName(this.pokemon_data.name);
          });
    },
    getFRName: function(engName){
      const id = this.getIdFromName(engName);
      if(id == null) return engName;
      const pokemons = this.locales.filter((obj) => obj.pokemon_species_id === id && obj.local_language_id === "5");
      if(pokemons.length === 0) return engName;
      return pokemons[0].name;
    },
    getIdFromName: function(name) {
      const pokemons = this.locales.filter((obj) => obj.name.toLowerCase() === name.toLowerCase());
      if(pokemons.length === 0) return null;
      return pokemons[0].pokemon_species_id;
    },
    getPokemonHP: function(obj) {
      for(let i = 0; i < obj.stats.length; i++) {
        const stat = obj.stats[i];
        if (stat.stat.name === "hp") {
          return stat.base_stat;
        }
      }
    },
    getPokemon: function (id) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => data.json())
          .then((jsonresp) => {


            const id = jsonresp.id;
            const name = this.getFRName(jsonresp.name.split("-")[0]);
            const base_experience = jsonresp.base_experience;
            const height = jsonresp.height;
            const weight = jsonresp.weight;
            const hp = this.getPokemonHP(jsonresp);
            const image = jsonresp.sprites.other["official-artwork"].front_default;
            const types = 'types' in jsonresp ? jsonresp.types : [];

            this.pokemon_data = {
              id: id,
              name: name,
              experience: base_experience,
              height: height,
              weight: weight,
              hp: hp,
              image: image,
              types: types
            }
          });
    }
  },
  mounted() {
    this.getLocales().then(() => {
      this.getPokemon(this.$route.params.id);
    });
  }
}
</script>