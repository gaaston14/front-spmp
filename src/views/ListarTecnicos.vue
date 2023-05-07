<template>
  <v-container>
    <v-card v-for="(item, index) in items" :key="index" outlined class="my-4">
      <v-card-title class="headline">{{ item.nombre }}</v-card-title>
      <v-card-text>
        <p>Descripción de la tarea</p>
        <p>Fecha de creación: {{ item.fechaCreacion }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Tareas",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = "http://localhost:4000/api/tareas";
      const response = await fetch(url);
      const data = await response.json();
      this.items = data.body;
    },
  },
};
</script>