import { createRouter, createWebHashHistory } from 'vue-router'
import Pokedex from "@/views/Pokedex";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Pokedex
  },
  {
    path: '/pokecards',
    name: 'pokecards',
    component: () => import('../views/Pokecards.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: () => import('../views/Pokemon.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
