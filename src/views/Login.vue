<template>
  <v-container>     
    <v-row>
      <v-card :loading="loading" class="box-login" elevation="10">      
          <div class="d-flex align-center justify-center logo">                
            <v-img
              :src="require('../assets/logo.svg')"  
              class="shrink mr-2"        
              contain
              width="40"              
            />
            Sign In              
          </div>
        <form class="form-login" autocomplete="off">
          <v-text-field
          outlined dense
            color="primary"
            label="email"
            v-model="usuario.email"
          ></v-text-field>

          <v-text-field
            @keyup.enter="logar"
            outlined dense
            label="password"
            v-model="usuario.senha"
            :append-icon="value ? 'visibility_off' : 'visibility'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>
          
            <v-btn color="primary" @click="logar" type="button" class="btn-entrar">
              Login
            </v-btn>
          
          <div class="lembrar-senha">         
            <a @click="recuperarSenha()">forgot password?</a>
          </div>                    

          <div class="strike">
            <span>or</span>
          </div>
          <div class="sing-up">
            <span>Don't have a login? 
              <a @click="criarConta()">Sing up</a>
            </span>
          </div>
        </form>
      </v-card>
    </v-row>
  </v-container>


</template>
<script>

import utilsStorage from "@/utils/storage";
import UsuarioModel from "@/model/usuario-model";
import apiAuth from "@/api/auth/auth-api";
import { MENSAGENS } from "@/constants/messages";
import { exibirMensagem } from "@/actions";

export default {
  name: "login",
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
        exibirMensagem(MENSAGENS.INFORME_EMAIL_E_SENHA, "error");        
        return;
      }

      this.loading = true;
      apiAuth
        .logar(this.usuario)
        .then((response) => {
          this.loading = false;
          
          utilsStorage.salvarAutenticacao(response.data);

          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          exibirMensagem(
            (error.response &&
              error.response.data &&
              error.response.data.mensagem) ||
              MENSAGENS.FALHA_COMUNICACAO_SERVIDOR,
            "error"
          );
          utilsStorage.removerAutenticacao();
          this.loading = false;
        });
    },    
  },
   
  mounted(){         
    if (this.$route.query && this.$route.query.exibirMensagemExpiracao) { 
      exibirMensagem(MENSAGENS.SESSAO_EXPIRADA, "error");
    }                 
  },  

};

</script>

<style lang="scss" scoped>

.box-login {
  background-color:  #ffffff;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  padding:30px;
  border-radius: 4px;
}

.logo {  
  font-size: 40px;
  font-weight: 800;    
  text-align: center;
  display: block;
  height: 90px;
  margin: auto auto;
  margin-top: 20px;
  transition: scale-transition;
}

.btn-entrar {
  width: 100%;  
  border: 0px;
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid #ddd;
  margin-top: 20px;
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
.sing-up {    
    text-align: center;
    font-size: 15px;
    margin-top: 10px;
}

div {
  width: 100%;
}

.strike {
    display: block;
    text-align: center;    
    font-size: 15px;
    color: grayscale($color: #a8a7a7);
    overflow: hidden;
    white-space: nowrap; 
    margin-top: 20px;
}

.strike > span {
    position: relative;
    display: inline-block;
}

.strike > span:before,
.strike > span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: grayscale($color: #c4c1c1);
}

.strike > span:before {
    right: 100%;
    margin-right: 10px;
}

.strike > span:after {
    left: 100%;
    margin-left: 10px;
}
</style>
