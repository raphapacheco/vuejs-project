<template>
  <v-snackbar
      v-model="snackbar"
      :vertical="false"
      :timeout="timeout"
      top="top"
      :color="tipo"
      elevation="5"
      multi-line
      right
      shaped
    >
      {{ mensagem }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
          >OK</v-btn
        >
      </template>
     </v-snackbar>
</template>

<script>
  export default {
    name: "SnackbarMensagem",    
    components: {},
    props: { 
      mensagem: {type: String},
      snackbar: {type: Boolean},
      timeout: {type: Number},
      tipo: {type: String}
    },    
  }
</script>

