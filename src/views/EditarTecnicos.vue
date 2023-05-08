<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="tecnico.id" label="ID" readonly></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tecnico.nombre" label="Nombre" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-date-picker v-model="tecnico.fNac" label="Fecha de nacimiento" required></v-date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" :loading="loading" @click="submitForm">Guardar cambios</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <transition name="fade">
      <alertas :type="alerta.type" :mensaje="alerta.mensaje" v-if="alerta.mostrar" @salir="alerta.mostrar = false"></alertas>
    </transition>
  </v-container>
</template>


<script>
import Alertas from "@/components/Alertas.vue";

export default {
  name: "EditarTecnico",
  components: {
    Alertas,
  },
  data() {
    return {
      tecnico: {
        id: "",
        nombre: "",
        fNac: "",
      },
      valid: true,
      loading: false,
      alerta: {
        mostrar: false,
        mensaje: "",
        type: "",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const urlParams = new URLSearchParams(window.location.search);
      const tecnicoId = urlParams.get("id");
      const url = `http://localhost:4000/api/tecnicos/${tecnicoId}`;
      const response = await fetch(url);
      const data = await response.json();
      this.tecnico = data.body;
    },
    async submitForm() {
      this.loading = true;

      try {
        const response = await fetch(`http://localhost:4000/api/tecnicos/${this.tecnico.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.tecnico),
        });

        const data = await response.json();
        this.alerta.mostrar = true;
        this.alerta.mensaje = data.message;
        this.alerta.type = "success";
      } catch (error) {
        this.alerta.mostrar = true;
        this.alerta.mensaje = "Error al actualizar técnico";
        this.alerta.type = "error";
      }

      this.loading = false;
    },
  },
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
