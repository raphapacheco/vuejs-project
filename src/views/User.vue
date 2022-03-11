<template>  
  <v-layout row justify-center>
    <UserModal v-model="exibirModal" :exibirModal="exibirModal" :usuario="usuarioSelecionado" @atualizar-usuario="atualizarUsuario"/>
    <v-flex xs12 sm8>        

      <v-card elevation="5">

        <v-toolbar color="blue" dark>         
          <v-icon large>person</v-icon>      
          <v-toolbar-title class="ml-1">Users</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="novoUsuario()">
            <v-icon>person_add</v-icon>
          </v-btn>          
        </v-toolbar>

        <v-list two-line min-height="345">
          <template v-for="(usuario, index) in usuarios">

            <v-list-item :key="index" avatar ripple @click="exibirModal = exibirModal">    
              
              <v-list-item-content @click="abrirModal(usuario)">

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
            
            <v-divider v-if="index < 4" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
        <v-divider/>        
        <v-layout justify-end>
          <v-pagination
            v-if="totalPaginas > 1"
            v-model="pagina"
            :length="totalPaginas"
            :total-visible="7"
            @input="atualizarPagina(pagina)"          
          ></v-pagination>        
        </v-layout>
      </v-card> 

    </v-flex>
  </v-layout>    
</template>

<script>

import UserModal from "@/views/UserModal";
import UsuarioModel from "@/model/usuario-model";
import UserApi from "@/api/user/user-api";
import { MENSAGENS } from "@/constants/messages";
import { exibirMensagem } from "@/actions";

export default {
  components: { UserModal },
  name: "user",
  data() {
    return {
      usuarioSelecionado: new UsuarioModel(),
      bloquear: false,
      exibirModal: false,
      loading: false,
      usuarios: [],
      totalPaginas: 0,
      pagina: 1,
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
    },

    atualizarUsuario(usuario){
      var index = this.usuarios.findIndex((usr => usr.id == usuario.id));
      
      if (index >= 0)
      {
        this.usuarios[index] = usuario;
        return;
      }

      this.usuarios.push(usuario);
    },

    abrirModal(usuario)
    {
       this.exibirModal = !this.exibirModal; 
       this.usuarioSelecionado = new UsuarioModel(usuario);
    },
    
    novoUsuario()
    {
       this.exibirModal = !this.exibirModal; 
       this.usuarioSelecionado = new UsuarioModel();
    },

    async atualizarPagina(pagina){         
      var retorno = await UserApi.obterPaginado(pagina, 5);    
      this.usuarios = retorno.data.itens;
      this.totalPaginas = retorno.data.totalPaginas;
      console.log(retorno);
    },  
  },

  async mounted(){ 
    this.atualizarPagina(1);
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