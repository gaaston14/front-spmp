<template>
    <v-card outlined>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ content }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="onClick">{{ buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      content: String,
      buttonText: String,
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  };
  </script>