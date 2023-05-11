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
          <v-date-picker v-model="fecha" @input="fechaMenu = false" ></v-date-picker>
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
        <v-select :items="grupoOptions" label="Grupo" v-model="descripcion"></v-select>
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
            <v-select :items="tareaOptions" label="Tarea" v-model="tarea.descripcion"></v-select>
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

      <v-row v-if="alerta.mostrar">
      <v-col>
        <alertas :type="alerta.type" :mensaje="alerta.mensaje" @salir="alerta.mostrar = false"></alertas>
      </v-col>
    </v-row>
    </v-row>
    
  </v-container>
</template>
<script>
import axios from "axios";
import Alertas from "@/components/Alertas.vue";
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
      alerta: {
        mostrar: false,
        mensaje: "",
        type: "",
      },
    };
  },
  async mounted() {
    try {
      const responseTareas = await axios.get("http://localhost:4000/api/tareas");
      this.tareaOptions = responseTareas.data.body.map((tarea) => ({
        text: tarea.nombre,
        value: tarea.id,
      }));
      const responseGrupos = await axios.get("http://localhost:4000/api/grupos/asignados");
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
  components: {
    Alertas,
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
          idgrupo: this.descripcion,
          conexion: this.conexion,
          tareas: this.tareas,
          fecha: this.fecha,
          hora: this.hora,
          observacion: this.observaciones,
        };
        console.log(data);
        const response = await axios.post(
          "http://localhost:4000/api/tareas/RegistrarTarea",
          data
        );
        console.log(response.data);
        console.log(response.body);
        this.alerta.mostrar = true;
        this.alerta.mensaje = "Tarea agregada correctamente";
        this.alerta.type = "success";
        this.alerta.mostrar = false;
        this.alerta.mostrar = true;
        this.fecha = "";
        this.fechaMenu = "";
        this.horaMenu = "";
        this.hora = "";
        this.descripcion = "";
        this.conexion = "";
        this.observaciones = "";

        this.tareas = [{ descripcion: "", cantidad: "" }];
      } catch (error) {
        this.alerta.mostrar = true;
        this.alerta.mensaje = "No se pudo agregar la tarea";
        this.alerta.type = "Error";
        this.alerta.mostrar = false;
        this.alerta.mostrar = true;
        console.error(error);
      }
    },
  },
};
</script>