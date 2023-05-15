import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AgregarTecnico from '../views/AgregarTecnico.vue'
import EditarTecnicos from '../views/EditarTecnicos.vue'
import ListarTecnicos from '../views/ListarTecnicos.vue'
import AgregarTarea from '../views/AgregarTarea.vue'
import ListarTareas from '../views/ListarTareas.vue'
import ListarGrupos from '../views/ListarGrupos.vue'
import AgregarGrupo from '../views/AgregarGrupo.vue'
import EditarGrupos from '../views/EditarGrupos.vue'
import RegistrarCertificacion from '../views/RegistrarTareaCertificacion.vue'
import ListarCertificaciones from '../views/ListarCertificaciones.vue'
import EditarTarea from '../views/EditarTarea.vue'

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
    path: '/AgregarTarea',
    name: 'AgregarTarea',
    component: AgregarTarea
  },
  {
    path: '/EditarTarea',
    name: 'EditarTarea',
    component: EditarTarea
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
  {
    path: '/AgregarGrupo',
    name: 'AgregarGrupo',
    component: AgregarGrupo
  },
  {
    path: '/EditarGrupos',
    name: 'EditarGrupos',
    component: EditarGrupos
  },
  {
    path: '/RegistrarCertificacion',
    name: 'RegistrarCertificacion',
    component: RegistrarCertificacion
  },
  {
    path: '/ListarCertificaciones',
    name: 'ListarCertificaciones',
    component: ListarCertificaciones
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
