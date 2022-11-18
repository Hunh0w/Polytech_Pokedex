<template>
  <div>
    <ui-grid>
      <ui-grid-cell class="pokecell_card" align="middle" columns="2" v-for="(item) in pokecards" v-bind:key="item.id">
        <a :href="item" target="_blank" >
          <img :src="item" width="215" height="312"/>
        </a>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>


<style>
a {
  margin: 0;
  padding: 0;
}

.pokecell_card img {
  transition: 0.4s;
  cursor: pointer;
}
.pokecell_card img:hover {
  width: 225px;
  height: 322px;
  box-shadow: 0px 0px 37px 10px rgba(0,0,0,0.75);

  transition: 0.4s;
}
</style>

<script>

export default {
  name: 'PokeCards',
  data: function(){
    return {
      pokecards: []
    }
  },
  methods: {
    getPokecards: function() {
      fetch('http://162.38.112.154/pokecards')
          .then((data) => data.json())
          .then((datajson) => {
            let pokecards = datajson.pokecards;
            this.pokecards = [];
            for(let i = 0; i < pokecards.length; i++){
              let pokecardurl = "http://162.38.112.154:80"+pokecards[i];
              this.pokecards.push(pokecardurl);
            }
          });
    }
  },
  mounted: function(){
    this.getPokecards();
  }
}
</script>
