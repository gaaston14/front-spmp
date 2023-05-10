<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="@/assets/SPM.png" transition="scale-transition" width="40" cursor-pointer />
        </router-link>
        <router-link to="/">
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="@/assets/SPM_Letras-removebg-preview.png" width="100" />
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-menu v-for="(item, index) in rutas2" :key="index" :close-on-content-click="false" transition="scale-transition" offset-y v-model="item.menu">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon v-if="item.icono">{{ item.icono }}</v-icon>
            {{ item.nombre }}            
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(subItem, subIndex) in item.subitems" :key="subIndex" @click="insertarRuta(subItem.ruta, item); closeMenu(subItem)">
            <v-list-item-title>
              <v-icon v-if="subItem.icono">{{ subItem.icono }}</v-icon>
              {{ subItem.nombre }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    rutas2: [
      {
        nombre: "Tecnicos",
        icono: "mdi-account",
        menu:false,
        subitems: [
          { nombre: "Crear Tecnico", ruta: "/AgregarTecnico", icono: "mdi-account-plus"},
          { nombre: "Listar Tecnicos", ruta: "/ListarTecnicos", icono: "mdi-list-box" }
        ]
      },
      {
        nombre: "Grupos",
        icono: "mdi-account-group",
        menu:false,
        subitems: [
          { nombre: "Crear Grupo", ruta: "/AgregarGrupo", icono: "mdi-account-multiple-plus" },
          { nombre: "Listar Grupos En uso", ruta: "/ListarGrupos", icono: "mdi-list-box" },
          { nombre: "Listar Grupos Libres", ruta: "/ListarGruposLibres", icono: "mdi-list-box" }
        ]
      },
      {
        nombre: "Tareas",
        icono: "mdi-format-list-checkbox",
        menu:false,
        subitems: [
          { nombre: "Agregar Tarea", ruta: "/", icono: "mdi-plus" },
          { nombre: "Listar Tareas", ruta: "/ListarTareas", icono: "mdi-list-box" },
        ]
      },
      {
        nombre: "Certificar Tareas",
        icono: "mdi-cash",
        menu:false,
        subitems: [
          { nombre: "Nueva Certificacion", ruta: "/RegistrarCertificacion", icono: "mdi-cash-plus" },
          { nombre: "Consultar Certificacion", ruta: "/about", icono: "mdi-pencil" },
          { nombre: "Listar Certifiaciones", ruta: "/ListarTecnicos", icono: "mdi-view-list" }
        ]
      },
    ]
  }),
  methods: {
    insertarRuta(ruta, item) {
      this.$router.push(ruta);
      this.closeMenu(item);
    },
    closeMenu(item){
      item.menu = false;
    }
  }
};
</script>
