<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(grupo, index) in grupos" :key="index" cols="3">
        <v-card outlined>
          <v-card-title>
            Grupo: {{ grupo.numGrupo }}
          </v-card-title>
          <v-card-subtitle>
            Descripcion: {{ grupo.tecnicos.length > 0 ? grupo.tecnicos[0].descripcion : 'Libre' }}
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col v-if=" grupo.tecnicos.length > 0" cols="12">Técnicos:</v-col>
            </v-row>
            <v-row v-for="(tecnico, index) in grupo.tecnicos" :key="index">
              <v-col cols="6">{{ tecnico.nombre }}</v-col>
              <v-col cols="3">ID: {{ tecnico.idTecnico }}</v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="modificarGrupo(grupo.numGrupo)">Modificar grupo</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  name: "GruposTecnicos",
  data() {
    return {
      grupos: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:4000/api/grupos/gruposleft");
      const data = await response.json();
      this.grupos = data.body.reduce((acc, curr) => {
        const grupoIndex = acc.findIndex((grupo) => grupo.numGrupo === curr.id);
        if (grupoIndex !== -1) {
          acc[grupoIndex].tecnicos.push(curr);
        } else {
          acc.push({
            numGrupo: curr.id,
            tecnicos: curr.idTecnico !== null ? [curr] : [],
          });
        }
        return acc;
      }, []);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    modificarGrupo(numGrupo) {
      alert(`Modificando grupo ${numGrupo}`);
    },
  },
};
</script>
