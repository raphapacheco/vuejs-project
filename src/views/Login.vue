<template>
  <v-container>
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
    <v-row>
      <v-card :loading="loading" class="box-login" elevation="10">
      <div class="logo">
        <!-- <img src="colocar imagem aqui" alt=""> -->
        Sign In
      </div>

      <form class="form-login" autocomplete="off">
        <v-text-field
        outlined dense
          color="primary"
          label="Email"
          v-model="usuario.email"
        ></v-text-field>

        <v-text-field
          @keyup.enter="logar"
           outlined dense
          label="Senha"
          v-model="usuario.senha"
          :append-icon="value ? 'visibility_off' : 'visibility'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
        ></v-text-field>
        
          <v-btn color="primary" @click="logar" type="button" class="btn-entrar">
            Entrar
          </v-btn>
        
        <div class="lembrar-senha">
          <a @click="recuperarSenha()">Esqueci minha senha</a>
        </div>
      </form>
    </v-card>
    </v-row>
  </v-container>


</template>
<script>

//import utilsStorage from "@/utils/storage";
//import mixinMensagen from "@/mixin/mixin-mensagem";
import UsuarioModel from "@/model/usuario-model";
//import apiUsuario from "@/api/usuario/usuario-api";
//import { MENSAGENS } from "@/constants/mensagens";


export default {
  name: "login",
  //mixins: [mixinMensagen],
  data() {
    return {
      loading: false,
      usuario: new UsuarioModel(),
      value: 'password'
    };
  },
  
  methods: {

    logar() {
      if (!this.usuario.email || !this.usuario.senha) {
        //this.dispararMensagem(MENSAGENS.INFORME_EMAIL_E_SENHA, "error");
        return;
      }

      this.loading = true;
      /*apiUsuario
        .logar(this.usuario)
        .then((response) => {
          this.loading = false;
          
          utilsStorage.salvarAutenticacao(response.data);

          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          this.dispararMensagem(
            (error.response &&
              error.response.data &&
              error.response.data.mensagem) ||
              MENSAGENS.FALHA_COMUNICACAO_SERVIDOR,
            "error"
          );
          utilsStorage.removerAutenticacao();
          this.loading = false;
        });*/
    },    
  },
   
  mounted(){         
    if (this.$route.query && this.$route.query.exibirMensagemExpiracao) { 
      //this.dispararMensagem(MENSAGENS.SESSAO_EXPIRADA, "error");
    }                 
  },  

};

</script>

<style lang="scss" scoped>

.box-login {
  background-color:  #ffffff;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  padding:30px;
  border-radius: 4px;
}

.logo {
  font-size: 39px;
  font-weight: 800;
  text-align: center;

  display: block;
  height: 90px;
  margin: auto auto;
  margin-top: 35px;
}

.btn-entrar {
  width: 100%;
  
  border: 0px;
  padding: 15px;
  font-weight: 600;
  border: 1px solid #ddd;
  margin-top: 25px;
  
}

.btn-entrar:hover {
  cursor: pointer;
  background-color: rgb(217, 223, 217);
}

.btn-entrar:focus {
  outline: none;
}
.lembrar-senha {
    text-align: end;
    font-size: 12px;
    margin-top: 10px;
}

div {
  width: 100%;
}
</style>
