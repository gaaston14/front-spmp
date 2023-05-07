<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>
      <v-spacer></v-spacer>
      <v-menu v-for="(item, index) in rutas2" :key="index" :close-on-content-click="false" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon v-if="item.icono">{{ item.icono }}</v-icon>
            {{ item.nombre }}            
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(subItem, subIndex) in item.subitems" :key="subIndex" @click="insertarRuta(subItem.ruta)">
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
        subitems: [
          { nombre: "Crear Tecnico", ruta: "/", icono: "mdi-account-plus"},
          { nombre: "Modificar Tecnico", ruta: "/about", icono: "mdi-account-edit" },
          { nombre: "Listar Tecnicos", ruta: "/ListarTecnicos", icono: "mdi-list-box" }
        ]
      },
      {
        nombre: "Grupos",
        icono: "mdi-account-group",
        subitems: [
          { nombre: "Crear Grupo", ruta: "/", icono: "mdi-account-multiple-plus" },
          { nombre: "Modificar Grupo", ruta: "/about", icono: "mdi-pencil" },
          { nombre: "Listar Grupos", ruta: "/ListarTecnicos", icono: "mdi-list-box" }
        ]
      },
      {
        nombre: "Tareas",
        icono: "mdi-format-list-checkbox",
        subitems: [
          { nombre: "Agregar Tarea", ruta: "/", icono: "mdi-plus" },
          { nombre: "Modificar Tareas", ruta: "/about", icono: "mdi-pencil" },
          { nombre: "Modificar Precio", ruta: "/about", icono: "mdi-currency-usd" },
          { nombre: "Listar Tareas", ruta: "/ListarTecnicos", icono: "mdi-list-box" },
        ]
      },
      {
        nombre: "Certificar Tareas",
        icono: "mdi-cash",
        subitems: [
          { nombre: "Nueva Certificacion", ruta: "/", icono: "mdi-cash-plus" },
          { nombre: "Consultar Certificacion", ruta: "/about", icono: "mdi-pencil" },
          { nombre: "Listar Certifiaciones", ruta: "/ListarTecnicos", icono: "mdi-view-list" }
        ]
      },
    ]
  }),
  methods: {
    insertarRuta(ruta) {
      this.$router.push(ruta);
    }
  }
};
</script>
