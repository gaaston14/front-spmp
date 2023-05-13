<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="fechaInicio" label="Fecha de inicio" @click="abrirFechaInicio"></v-text-field>
        <v-date-picker v-model="fechaInicio" v-if="mostrarFechaInicio" @input="cerrarFechaInicio"></v-date-picker>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="fechaFin" label="Fecha de fin" @click="abrirFechaFin"></v-text-field>
        <v-date-picker v-model="fechaFin" v-if="mostrarFechaFin" @input="cerrarFechaFin"></v-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-select v-model="tecnicoSeleccionado" :items="tecnicos" label="Seleccionar Técnico" item-text="nombre" item-value="id"></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn @click="consultarTareas" color="primary">Consultar Tareas</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="tareas" hide-default-footer>
          <template v-slot:item.fechaCumplimiento="{ item }">
            {{ item.fechaCumplimiento | formatDate }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fechaInicio: null,
      fechaFin: null,
      tecnicoSeleccionado: null,
      tecnicos: [],
      tareas: [],
      mostrarFechaInicio: false,
      mostrarFechaFin: false,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Conexión', value: 'conexion' },
        {
          text: 'Fecha de Cumplimiento',
          value: 'fechaCumplimiento',
          sortable: true,
          width: '200',
          class: 'text-truncate',
        },
        { text: 'Hora', value: 'hora' },
        { text: 'Tarea', value: 'tarea' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Observación', value: 'observacion' },
      ],
    };
  },
  mounted() {
    this.obtenerTecnicos();
  },
  methods: {
    async obtenerTecnicos() {
      try {
        const response = await axios.get('http://localhost:4000/api/tecnicos/asignados');
        this.tecnicos = response.data.body;
      } catch (error) {
        console.error(error);
      }
    },
    abrirFechaInicio() {
      this.mostrarFechaInicio = true;
    },
    abrirFechaFin() {
      this.mostrarFechaFin = true;
    },
    cerrarFechaInicio() {
      this.mostrarFechaInicio = false;
    },
    cerrarFechaFin() {
      this.mostrarFechaFin = false;
    },
    async consultarTareas() {
      if (!this.fechaInicio || !this.fechaFin || !this.tecnicoSeleccionado) {
        return;
      }
      
      const requestData = {
        f1: this.fechaInicio,
        f2: this.fechaFin,
        id: this.tecnicoSeleccionado,
      };
      
      try {
        const response = await axios.post('http://localhost:4000/api/tareas/ListarCertificaciones', requestData);
        this.tareas = response.data.body;
      } catch (error) {
        console.error(error);
      }
    },
  },
  filters: {
    formatDate(value) {
      if (!value) return '';
      return value.slice(0, 10);
    },
  },
};
</script>
