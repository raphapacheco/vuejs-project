<template>  
  <v-layout row justify-center>
    <UserModal v-model="exibirModal" :exibirModal="exibirModal"/>
    <v-flex xs12 sm8>        

      <v-card elevation="5">

        <v-toolbar color="blue" dark>         
          <v-icon large>person</v-icon>      
          <v-toolbar-title class="ml-1">Users</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="exibirModal = !exibirModal">
            <v-icon>person_add</v-icon>
          </v-btn>          
        </v-toolbar>

        <v-list two-line>
          <template v-for="(usuario, index) in usuarios">

            <v-list-item :key="index" avatar ripple @click="exibirModal = exibirModal">    
              
              <v-list-item-content @click="exibirModal = !exibirModal">

                <v-list-item-title class="title">{{ usuario.nome }}</v-list-item-title>
                <v-list-item-title class="subtitle">
                  E-mail: {{ usuario.email }} | CPF: {{ usuario.cpf }}
                </v-list-item-title>


              </v-list-item-content>    
              
              <v-list-item-action >
                <v-btn icon @click="bloquearUsuario(usuario)">
                  <v-icon :color="usuario.ativo ? '' : 'red'">{{usuario.ativo ? 'lock_open' : 'lock'}}</v-icon>
                </v-btn>
              </v-list-item-action>
                
              <v-list-item-action >

                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                    >
                      <v-icon>person_remove</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>

                      <v-toolbar>         
                        <v-icon large>person</v-icon>      
                        <v-toolbar-title class="ml-1">Confirma a exclusão deste usuário?</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn 
                          large
                          text
                          color="green"
                          @click="() => {dialog.value = false; deletarUsuario(usuario);}"
                        >Sim</v-btn>  
                        <v-btn 
                          large
                          text
                          color="red"
                          @click=" dialog.value = false"
                        >Não</v-btn>        
                      </v-toolbar>

                    </v-card>
                  </template>
                </v-dialog>
                
              </v-list-item-action>
             
            </v-list-item>
            
            <v-divider v-if="index + 1 < usuarios.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>

      </v-card> 

    </v-flex>
  </v-layout>    
</template>

<script>

import UserModal from "@/views/UserModal";
import UserApi from "@/api/user/user-api";
import { MENSAGENS } from "@/constants/messages";
import { exibirMensagem } from "@/actions";

export default {
  components: { UserModal },
  name: "user",
  data() {
    return {
      bloquear: false,
      exibirModal: false,
      loading: false,
      usuarios: [],
      value: 'password'
    };
  },
  
  methods: {
    async deletarUsuario(usuario){                
      await UserApi.deletar(usuario);  
      this.usuarios.pop(usuario);
      exibirMensagem(MENSAGENS.USUARIO_REMOVIDO, "success");      
    },

    async bloquearUsuario(usuario){        
        usuario.ativo = !usuario.ativo;
        await UserApi.atualizar(usuario);
        exibirMensagem(MENSAGENS.USUARIO_BLOQUEADO, "success");      
    }
  },
   
  async mounted(){         
    var retorno = await UserApi.obterPaginado(1, 10);    
    this.usuarios = retorno.data.itens;
  },  

};

</script>

<style lang="scss" scoped>

.subtitle {
  font-size: 12px;
  color: gray;
}

.title{
  
  font-style: bold;
}
</style>