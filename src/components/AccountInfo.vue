<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-1" icon x-large v-bind="attrs" v-on="on">        
          <v-avatar >
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>        
        </v-btn>
    </template>

    <v-card class="mx-auto text-center" max-width="400">
        <v-card-subtitle class="pb-6 pt-8">
        <v-btn icon large>
            <v-avatar color="#ededed" size="75px">
            <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="imagem"
            />
            </v-avatar>
        </v-btn>
        </v-card-subtitle>

        <v-card-text>
          <p>{{ usuario.nome }}</p>
          <p>{{ usuario.email }}</p>

          <v-divider></v-divider>       

          <v-btn                
            @click="logout"              
            icon   
            link 
            class="ma-2 sair"        
          >
          <v-icon>mdi-logout</v-icon>
          Logout
          </v-btn>
        
        </v-card-text>

        <v-card-actions></v-card-actions>
    </v-card>
</v-menu>
</template>

<script>

import { exibirMensagem } from "@/actions";
import apiAuth from "@/api/auth/auth-api";
import utilsStorage from "@/utils/storage";

export default {
  name: "AccountInfo",
  data: () => ({
    usuario: { nome: "User name", email : "user@email.com" },   
  }),

  methods: {
    logout() {
      apiAuth
        .deslogar()
        .then(() => {
          utilsStorage.removerAutenticacao();
          this.$router.push({ name: "Login" });
        })
        .catch((error) =>
          exibirMensagem(error.response.data.mensagem, "error")
        );
    },  
  },
  mounted() {
    this.usuario = utilsStorage.obterUsuarioNaStorage();
  }
};
</script>

<style lang="scss" scoped>

.sair {
  text-transform: none;
  background-color: $white;
  border: 1px solid #dadce0;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.15px;
  margin: 16px;
  outline: 0;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  white-space: normal;
  font-size: 12px;
  color: #5f6368;
}