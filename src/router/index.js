import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AgregarTecnico from '../views/AgregarTecnico.vue'
import EditarTecnicos from '../views/EditarTecnicos.vue'
import ListarTecnicos from '../views/ListarTecnicos.vue'
import ListarTareas from '../views/ListarTareas.vue'
import ListarGrupos from '../views/ListarGrupos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
    },
  {
    path: '/AgregarTecnico', 
    name: 'AgregarTecnico',
    component: AgregarTecnico
  },
  {
      path: '/ListarTecnicos',
      name: 'ListarTecnicos',
      component: ListarTecnicos
  },
{
  path: '/EditarTecnicos',
  name: 'EditarTecnicos',
  component: EditarTecnicos
},
  {
    path: '/ListarTareas',
    name: 'ListarRareas',
    component: ListarTareas
  },
  {
    path: '/ListarGrupos',
    name: 'ListarGrupos',
    component: ListarGrupos
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
