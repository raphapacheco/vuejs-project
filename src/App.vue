<template>
  <v-app>    
    <AppBar :exibirMenu="this.$router.currentRoute.name != 'Login'"></AppBar>   
    <v-main> 

      <div class="snackbar">    
        <v-snackbar
          v-model="snackbar"
          :vertical="false"
          :timeout="2000"
          top="top"
          :color="tipo"
          :elevation="5"
          multi-line
          right
          shaped
          app
        >
          {{ snackbarMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
              >OK</v-btn
            >
          </template>
        </v-snackbar>    
      </div> 

      <router-view />

    </v-main>
  </v-app>
</template>

<script>
import EventBus, { ACTIONS } from "./events/index";
import AppBar from '@/components/AppBar'

export default {
  name: "App",
  components: { AppBar },
  data: () => ({
    snackbar: false,
    snackbarMessage: "",    
    tipo: "error",
    drawer: null,
  }),
  mounted() {
    EventBus.$on(ACTIONS.SNACKBAR, (message, tipo) => {
      this.snackbarMessage = message;
      this.snackbar = true;
      this.tipo = tipo;
    });
  },
};
</script>