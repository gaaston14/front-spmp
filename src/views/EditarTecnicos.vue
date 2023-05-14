<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="nombre" label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="formattedDate" label="Fecha de Nacimiento" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="fNac" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="guardarCambios">Guardar Cambios</v-btn>
      </v-col>
    </v-row>
    <Alertas v-if="mostrarAlerta" titulo="Guardado Exitoso" mensaje="El cambio se realizó exitosamente" @salir="redirigirAListarTecnicos"></Alertas>
  </v-container>
</template>

<script>
import axios from 'axios';
import Alertas from '@/components/Alertas.vue';

export default {
  name: 'EditarTecnicos',
  components: {
    Alertas,
  },
  data() {
    return {
      id: this.$route.params.id,
      nombre: '',
      fNac: null,
      menu: false,
      mostrarAlerta: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    formattedDate() {
      if (this.fNac) {
        const date = new Date(this.fNac);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      return '';
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/tecnicos/${this.id}`);
        const tecnico = response.data.body;
        this.nombre = tecnico.nombre;
        this.fNac = tecnico.fNac.substring(0, 10);
      } catch (error) {
        console.error(error);
      }
    },
    async guardarCambios() {
      const data = {
        nombre: this.nombre,
        fNac: this.fNac,
        id: this.id,
      };

      try {
        await axios.put('http://localhost:4000/api/tecnicos/actualizartecnico', data);
        this.mostrarAlerta = true;
      } catch (error) {
        console.error(error);
      }
    },
    redirigirAListarTecnicos() {
      this.$router.push({ path: '/ListarTecnicos' }).catch(() => {});
    },
  },
};
</script>
