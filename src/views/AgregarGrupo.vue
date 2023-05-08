<template>
  <v-container class="my-10">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="grupo.descripcion" label="Nombre" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" :loading="loading" @click="submitForm">
          <v-icon left>mdi-account-plus</v-icon>
          Agregar Grupo
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
      grupo: {
        id: "0",
        descripcion: "",
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
        const response = await fetch("http://localhost:4000/api/grupos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.grupo),
        });

        const data = await response.json();
        this.alerta.mostrar = true;
        this.alerta.mensaje = data.body;
        this.alerta.type = "success";

        this.grupo.descripcion = "";
      } catch (error) {
        this.alerta.mostrar = true;
        this.alerta.mensaje = "Error al agregar técnico";
        this.alerta.type = "error";
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