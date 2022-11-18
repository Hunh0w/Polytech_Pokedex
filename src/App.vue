<template>
  <header>
    <aside>
      <span>Pokédex</span>
    </aside>
    <div class="links">
      <router-link to="/">Liste des Pokémons</router-link>
      <router-link to="/pokecards">Cartes Légendaires</router-link>
    </div>
  </header>
  <router-view/>
</template>

<style>
body {
  background-color: #575757;
  margin: 0;
}

header {
  overflow: hidden;
  background-color: #333;
}

header > aside {
  float: left;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

header > aside > span {
  font-size: 24pt;
  font-family: Pokemon;
  color: white;
  margin-bottom: 10px;
}

header > .links {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

header > .links > a {
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.4s;
}

header > .links > a:hover {
  background-color: #ddd;
  color: black;
  transition: 0.4s;
}

header > .links > a.router-link-active {
  border-bottom: 3px solid #818181;
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
