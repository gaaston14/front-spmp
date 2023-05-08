<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="nombre" label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-date-picker v-model="fNac" label="Fecha de Nacimiento"></v-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="guardarCambios()">Guardar Cambios</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "EditarTecnicos",
  data() {
    return {
      id: this.$route.params.id,
      nombre: "",
      fNac: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = `http://localhost:4000/api/tecnicos/${this.id}`;
      const response = await fetch(url);
      const data = await response.json();
      const tecnico = data.body;
      this.nombre = tecnico.nombre;
      this.fNac = new Date(tecnico.fNac);
    },
    async guardarCambios() {
      const data = {
        id: this.id,
        nombre: this.nombre,
        fNac: this.fNac.toISOString().substring(0, 10),
      };
      const url = `http://localhost:4000/api/tecnicos/`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        this.$router.push({ name: "Tecnicos" });
      }
    },
  },
};
</script>