<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="fechaInicio" label="Fecha de inicio" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="fechaInicio" no-title scrollable @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="fechaFin" label="Fecha de fin" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="fechaFin" no-title scrollable @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Id Grupo</th>
                    <th>Conexion</th>
                    <th>Id Tarea</th>
                    <th>Fecha de Cumplimiento</th>
                    <th>Cantidad</th>
                    <th>Hora</th>
                    <th>Observacion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="certificacion in certificaciones" :key="certificacion.idtarea">
                    <td>{{ certificacion.idgrupo }}</td>
                    <td>{{ certificacion.conexion }}</td>
                    <td>{{ certificacion.idtarea }}</td>
                    <td>{{ certificacion.fechaCumplimiento }}</td>
                    <td>{{ certificacion.cantidad }}</td>
                    <td>{{ certificacion.hora }}</td>
                    <td>{{ certificacion.observacion }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      fechaInicio: '',
      fechaFin: '',
      certificaciones: []
    }
  },
  methods: {
    async consultarCertificaciones() {
      try {
        const body = {
          f1: this.fechaInicio,
          f2: this.fechaFin
        }
        const response = await axios.get('http://localhost:4000/api/tareas/ListarCertificaciones', {
          params: body
        })
        this.certificaciones = response.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  watch: {
    fechaInicio() {
      this.consultarCertificaciones()
    },
    fechaFin() {
      this.consultarCertificaciones()
    }
  }
}
</script>