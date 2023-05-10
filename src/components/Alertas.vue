<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ titulo }}</v-card-title>
        <v-card-text>{{ mensaje }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false ; $emit('salir')">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: ['titulo', 'mensaje'],
  
    data: () => ({
      dialog: true,
    }),
  };
  </script>