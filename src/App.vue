<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('./assets/project-name.svg')"     
          width="200"
        />        
      </div>
      
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/raphapacheco/vuejs-project"
        target="_blank"
        text
      >      
        <v-img
          alt="Vuetify Signature"
          class="shrink"          
          contain          
          :src="require('./assets/assinatura.svg')"     
          min-width="100"
          width="170"
          transition="scale-transition"
        />     
        <v-img
          :src="require('./assets/github.svg')" 
          min-width="25"
          width="40" 
          transition="scale-transition"           
        />
      </v-btn>
    </v-app-bar>

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

export default {
  name: "App",

  data: () => ({
    snackbar: false,
    snackbarMessage: "",    
    tipo: "error",
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