<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="fechaInicio" label="Fecha de inicio" @click="abrirFechaInicio"></v-text-field>
        <v-date-picker v-model="fechaInicio" v-if="mostrarFechaInicio" @input="cerrarFechaInicio"></v-date-picker>
        <v-text-field v-model="horaInicio" label="Hora de inicio" @click="abrirHoraInicio"></v-text-field>
        <v-time-picker v-model="horaInicio" v-if="mostrarHoraInicio" format="24hr" @change="cerrarHoraInicio"></v-time-picker>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="fechaFin" label="Fecha de fin" @click="abrirFechaFin"></v-text-field>
        <v-date-picker v-model="fechaFin" v-if="mostrarFechaFin" @input="cerrarFechaFin"></v-date-picker>
        <v-text-field v-model="horaFin" label="Hora de fin" @click="abrirHoraFin"></v-text-field>
        <v-time-picker v-model="horaFin" v-if="mostrarHoraFin" format="24hr" @change="cerrarHoraFin"></v-time-picker>
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
          <template v-slot:item.subtotal="{ item }">
            {{ calcularSubtotal(item) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="text-right"><strong>Total: {{ calcularTotal() }}</strong></p>
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
      horaInicio: null,
      horaFin: null,
      tecnicoSeleccionado: null,
      tecnicos: [],
      tareas: [],
      mostrarFechaInicio: false,
      mostrarFechaFin: false,
      mostrarHoraInicio: false,
      mostrarHoraFin: false,
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
        { text: 'Observación', value: 'observacion' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Precio', value: 'precio' },
        { text: 'Subtotal', value: 'subtotal' }
      ],
    };
  },
  mounted() {
    this.obtenerTecnicos();
  },
  methods: {
    calcularSubtotal(item) {
      return item.cantidad * item.precio;
    },

    calcularTotal() {
      return this.tareas.reduce((total, item) => total + this.calcularSubtotal(item), 0);
    },
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
    abrirHoraInicio() {
      this.mostrarHoraInicio = true;
    },
    abrirHoraFin() {
      this.mostrarHoraFin = true;
    },
    cerrarFechaInicio() {
      this.mostrarFechaInicio = false;
    },
    cerrarFechaFin() {
      this.mostrarFechaFin = false;
    },
    cerrarHoraInicio() {
      this.mostrarHoraInicio = false;
    },
    cerrarHoraFin() {
      this.mostrarHoraFin = false;
    },
    async consultarTareas() {
      if (!this.fechaInicio || !this.fechaFin || !this.tecnicoSeleccionado) {
        return;
      }

      const requestData = {
        f1: this.fechaInicio,
        f2: this.fechaFin,
        id: this.tecnicoSeleccionado,
        h1: this.horaInicio,
        h2: this.horaFin,
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
    formatTime(value) {
      if (!value) return '';
      const time = new Date(value);
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    },
  },
};

</script>