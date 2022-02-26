<template>
  <v-container>
    <v-row>
        <div> Tela de usuário </div>
    </v-row> 
    <v-row>

      <v-list>
        <template v-for="(usuario, index) in usuarios">          
          <v-list-item :key="index">            
            <v-list-item-content >   
              <v-container>
                <v-divider :key="index"></v-divider>
                <v-row>
                  <v-col cols="12" lg="10">{{usuario.nome}} | {{ usuario.email }} | {{usuario.login}} | {{usuario.cpf}}</v-col>
                  <v-col cols="12" lg="2"><v-btn @click="() => {exibirModal = true} ">Editar</v-btn> </v-col>
                </v-row> 
                <v-row>
                  
                </v-row> 
              </v-container>
            </v-list-item-content>
          </v-list-item>

        </template>
      </v-list>
        
    </v-row> 
    <v-row>
        <v-btn color="primary" @click="exibirModal = !exibirModal" type="button">
          Abrir Modal
        </v-btn>
    </v-row>
    <v-rol>
      <UserModal v-model="exibirModal" :exibirModal="exibirModal"/>
    </v-rol>
  </v-container>
</template>

<script>

import UserModal from "@/views/UserModal";
import UserApi from "@/api/user/user-api";
//import UsuarioModel from "@/model/usuario-model";
// import { MENSAGENS } from "@/constants/messages";
// import { exibirMensagem } from "@/actions";

export default {
  components: { UserModal },
  name: "user",
  data() {
    return {
      //user: new UsuarioModel(),
      exibirModal: false,
      loading: false,
      usuarios: [],
      value: 'password'
    };
  },
  
  methods: {
 
  },
   
  async mounted(){         
    var retorno = await UserApi.obterPaginado(1, 10);    
    this.usuarios = retorno.data.itens;
  },  

};

</script>