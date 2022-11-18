<template>
  <div>
    <ui-autocomplete
      style="margin-top: 20px;"
      placeholder="Rechercher..."
      v-model="searchword"
      :source="pokemonNames"
    />
    <ui-grid>
      <ui-grid-cell class="pokecell_tile" align="middle" columns="2" v-for="(item) in displayedPokemons" v-bind:key="item.id" :hidden="item.hidden">
        <ui-card class="demo-card demo-card--photo" v-on:click="$router.push({'name': 'pokemon', params: { id: item.id}})">
          <ui-card-content class="demo-card__primary-action">
            <ui-card-media square class="demo-card__media" :style="{'background-image': 'url('+item.image+')'}"></ui-card-media>
            <div :class="[$tt('headline6')]">
              <ui-card-text class="pokemon_names">{{ item.name }}</ui-card-text>
              <ui-card-text- style="font-style: italic;">#{{ item.id }}</ui-card-text->
            </div>
          </ui-card-content>
        </ui-card>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>

<script>

import csv from 'csvtojson';

export default {
  name: "PokeDex",
  data: function() {
    return {
      searchword: "",
      page: 1,
      maxPokemons: 200,
      pokemonNames: [],
      displayedPokemons: [],
      pokemons: [],
      locales: []
    }
  },
  watch: {
    searchword: {
      handler(newWord) {
        this.pokemonNames = [];
        this.displayedPokemons = [];
        const isInt = newWord.match(/^[0-9]+$/);
        for(let i = 0; i < this.pokemons.length; i++){
          let obj = this.pokemons[i];
          if(isInt && obj.id.toString() === newWord){
            this.pokemonNames.push(obj.name);
            this.displayedPokemons.push(obj);
            continue;
          }
          if(obj.name.toLowerCase().includes(newWord.toLowerCase())) {
            this.pokemonNames.push(obj.name);
            this.displayedPokemons.push(obj);
          }
        }
      }
    }
  },
  methods: {
    getPokemons: async function(){
      let offset = this.getOffset();
      return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.maxPokemons}&offset=${offset}`)
          .then((data) => data.json())
          .then((datajson) => {
            const pokelist = datajson.results;
            this.pokemons = [];
            for(let i = 0; i < pokelist.length; i++){
              const url = pokelist[i].url;
              const id = parseInt(this.getIdFromUrl(url));
              const name = this.getFRName(pokelist[i].name.split("-")[0], id.toString());
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
              this.pokemons.push({
                id: id,
                name: name,
                image: image,
                hidden: false
              });
            }
            this.pokemons.sort((a,b) => {
              if(a.id > b.id) return 1;
              if(a.id < b.id) return -1;
              return 0;
            });
            this.displayedPokemons = this.pokemons;
          });
    },
    getOffset: function(){
      return (this.page-1)*this.maxPokemons;
    },
    getLocales: function (){
      return fetch("https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv")
          .then((resp) => resp.text())
          .then((data) => csv().fromString(data))
          .then((jsonObj) => {
            this.locales = jsonObj.filter((obj) => obj.local_language_id == "5" || obj.local_language_id == "9");
          });
    },
    getFRName: function(engName, id){
      if(id == null) return engName;
      const pokemons = this.locales.filter((obj) => obj.pokemon_species_id === id && obj.local_language_id === "5");
      if(pokemons.length === 0) return engName;
      return pokemons[0].name;
    },
    getIdFromUrl: function(url) {
      return url.split("/")[6];
    }
  },
  created: async function() {
    await this.getLocales();
    await this.getPokemons();
  }
}
</script>

<style scoped>
.demo-card--photo {
  width: 200px;
}

.demo-card__media {
  background-color: rgba(0, 0, 0, 0.8);
}

.demo-card__media-content--with-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.demo-card__media-title {
  padding: 8px 16px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
  );
  color: white;
}

.pokecell_tile {
  display: flex;
  justify-content: center;
}

.pokemon_names {
  font-weight: bold;
  color: #000000;
}
</style>