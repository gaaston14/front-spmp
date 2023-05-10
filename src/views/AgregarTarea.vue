<template>
  <v-container class="my-10">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="tecnico.nombre" label="Nombre" required></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="tecnico.fNac"
              label="Fecha de nacimiento"
              prepend-icon="mdi-calendar"
              readonly
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="tecnico.fNac" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" :loading="loading" @click="submitForm">
          <v-icon left>mdi-account-plus</v-icon>
          Agregar técnico
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="alerta.mostrar">
      <v-col>
        <alertas :type="alerta.type" :mensaje="alerta.mensaje" @salir="alerta.mostrar = false"></alertas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alertas from "@/components/Alertas.vue";

export default {
  name: "AgregarTecnicos",
  components: {
    Alertas,
  },
  data() {
    return {
      tecnico: {
        id: "0",
        nombre: "",
        fNac: "",
      },
      loading: false,
      alerta: {
        mostrar: false,
        mensaje: "",
        type: "",
      },
      menu: false,
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;

      try {
        const response = await fetch("http://localhost:4000/api/tecnicos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.tecnico),
        });

        const data = await response.json();
        this.alerta.mostrar = true;
        this.alerta.mensaje = data.body;
        this.alerta.type = "success";
        this.alerta.mostrar = false;
        this.alerta.mostrar = true;

        this.tecnico.nombre = "";
        this.tecnico.fNac = "";
        
      } catch (error) {
        this.alerta.mostrar = true;
        this.alerta.mensaje = "Error al agregar técnico";
        this.alerta.type = "error";
        this.alerta.mostrar = false;
        this.alerta.mostrar = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-menu__content {
  z-index: 9999;
}
</style>