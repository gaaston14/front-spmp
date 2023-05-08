<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Grupos libres</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(grupo, index) in gruposLibres" :key="index" cols="12" sm="6" md="4">
        <v-card class="my-3">
          <v-card-title>{{ grupo.descripcion }}</v-card-title>
          <v-card-text>ID: {{ grupo.id }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editarGrupo(grupo)">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GruposLibres",
  data() {
    return {
      grupos: [],
      gruposTecnicos: [],
    };
  },
  computed: {
    gruposLibres() {
      return this.grupos.filter((grupo) => {
        return !this.gruposTecnicos.some((gt) => gt.id === grupo.id);
      });
    },
  },
  methods: {
    async cargarGrupos() {
      const response = await fetch("http://localhost:4000/api/grupos");
      const data = await response.json();
      this.grupos = data.body;
    },
    async cargarGruposTecnicos() {
      const response = await fetch("http://localhost:4000/api/grupos/grupostecnicos");
      const data = await response.json();
      this.gruposTecnicos = data.body;
    },
    editarGrupo(grupo) {
      // Aquí colocar la lógica para editar un grupo
      console.log("Editar grupo:", grupo);
    },
  },
  async created() {
    await this.cargarGrupos();
    await this.cargarGruposTecnicos();
  },
};
</script>