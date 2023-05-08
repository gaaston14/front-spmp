<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="fechaMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fecha"
              label="Fecha"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              dense
              class="mt-2"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fecha" @input="fechaMenu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="horaMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="hora"
              label="Hora"
              append-icon="mdi-clock"
              readonly
              v-bind="attrs"
              v-on="on"
              dense
              class="mt-2"
            ></v-text-field>
          </template>
          <v-time-picker v-model="hora" @input="horaMenu = false"></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select :items="grupoOptions" label="Descripción" v-model="descripcion"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Conexión" v-model="conexion"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="9">
        <v-textarea label="Observaciones" v-model="observaciones"></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="agregarTarea">Agregar tarea</v-btn>
      </v-col>
      <v-col cols="12" v-for="(tarea, index) in tareas" :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select :items="tareaOptions" label="Descripción tarea" v-model="tarea.descripcion"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Cantidad" v-model.number="tarea.cantidad"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn color="error" @click="eliminarTarea(index)">Eliminar tarea</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="enviarFormulario">Enviar formulario</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "Formulario",
  data() {
    return {
      fecha: "",
      hora: "",
      descripcion: "",
      conexion: "",
      observaciones: "",
      tareas: [{ descripcion: "", cantidad: "" }],
      tareaOptions: [],
      grupoOptions: [],
    };
  },
  async mounted() {
    try {
      const responseTareas = await axios.get("http://localhost:4000/api/tareas");
      this.tareaOptions = responseTareas.data.body.map((tarea) => ({
        text: tarea.nombre,
        value: tarea.id,
      }));
      const responseGrupos = await axios.get("http://localhost:4000/api/grupos");
      this.grupoOptions = responseGrupos.data.body.map((grupo) => ({
        text: grupo.descripcion,
        value: grupo.id,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
  },
  methods: {
    agregarTarea() {
      this.tareas.push({ descripcion: "", cantidad: "" });
    },
    eliminarTarea(index) {
      this.tareas.splice(index, 1);
    },
    async enviarFormulario() {
      try {
        const data = {
          fecha: this.fecha,
          hora: this.hora,
          descripcion: this.descripcion,
          conexion: this.conexion,
          observacion: this.observaciones,
          tareas: this.tareas,
        };
        const response = await axios.post(
          "http://localhost:4000/api/formulario",
          data
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>