<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Registrar tarea</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-select
                v-model="grupo"
                :items="grupos"
                label="Grupo que hizo la tarea"
                required
              ></v-select>
              <v-select
                v-model="tarea"
                :items="tareas"
                label="Tarea realizada"
                required
              ></v-select>
              <v-text-field
                v-model="conexion"
                label="Conexión"
                required
              ></v-text-field>
              <v-menu
                v-model="menuFecha"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fecha"
                    label="Fecha de realización"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fecha" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuFecha = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="menuFecha = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                v-model="menuHora"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="hora"
                    label="Hora"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    required
                  ></v-text-field>
                </template>
                <v-time-picker v-model="hora" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuHora = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="menuHora = false">
                    OK
                  </v-btn>
                </v-time-picker>
              </v-menu>
              <v-textarea
                v-model="observacion"
                label="Observación"
                required
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="registrarTarea">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "RegistrarTarea",
  data() {
    return {
      grupos: [],
      tareas: [],
      grupoSeleccionado: "",
      tareaSeleccionada: "",
      conexion: "",
      tareaRealizada: "",
      fecha: "",
      hora: "",
      observacion: "",
    };
  },
  mounted() {
    this.fetchGrupos();
    this.fetchTareas();
  },
  methods: {
    async fetchGrupos() {
      const url = "http://localhost:4000/api/grupos";
      const response = await fetch(url);
      const data = await response.json();
      this.grupos = data.body;
    },
    async fetchTareas() {
      const url = "http://localhost:4000/api/tareas";
      const response = await fetch(url);
      const data = await response.json();
      this.tareas = data.body;
    },
    async submitForm() {
      const url = "http://localhost:4000/api/tareas";
      const data = {
        grupo: this.grupoSeleccionado,
        tarea: this.tareaSeleccionada,
        conexion: this.conexion,
        tareaRealizada: this.tareaRealizada,
        fecha: this.fecha,
        hora: this.hora,
        observacion: this.observacion,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    },
  },
};
</script>
