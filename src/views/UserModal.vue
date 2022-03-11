<template>
  <v-container>
    <v-row>
      <v-dialog v-model="exibirModal" max-width="500px" persistent>
        <v-card>
          <v-card-title class="text-h5">
            <h4>Usuário</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.nome"
                    :counter="50"
                    maxlength="50"
                    label="Nome"
                    :rules="[rules.required, rules.minLength5]"
                  ></v-text-field>
                </v-col>
              </v-row> 

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.login"
                    :counter="20"
                    maxlength="20"
                    label="Login"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.email"
                    :counter="50"
                    maxlength="50"
                    label="E-mail"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    :type="exibirSenha ? 'password' : 'text'"
                    :append-icon="exibirSenha ? 'visibility_off' : 'visibility'"
                    v-model="usuario.senha"
                    :counter="50"
                    maxlength="50"
                    label="Senha"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              
                <v-col cols="12" lg="6">
                  <v-text-field  
                    :type="exibirConfirmacao ? 'password' : 'text'"   
                    :append-icon="exibirConfirmacao ? 'visibility_off' : 'visibility'"               
                    :counter="50"
                    maxlength="50"
                    label="Confirmação"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.cpf"
                    :counter="14"
                    maxlength="14"
                    label="CPF"
                    :rules="[rules.required]"                    
                    v-mask="'###.###.###-##'"
                  ></v-text-field>
                </v-col>
              </v-row> 

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.cnpj"
                    :counter="18"
                    maxlength="18"
                    label="CNPJ"
                    :rules="[rules.required]"
                    v-mask="'##.###.###/####-##'"
                  ></v-text-field>
                </v-col>
              </v-row> 

              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="usuario.celular"
                    :counter="16"
                    maxlength="16"
                    label="Celular"                    
                    v-mask="'(##) 9 ####-####'"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row> 

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn-primary" text @click="save">
                Salvar
              </v-btn>
                <v-btn color="primary" text @click="closeModal">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

import UserApi from "@/api/user/user-api";
import { MENSAGENS } from "@/constants/messages";
import { exibirMensagem } from "@/actions";

export default {
  name: "userModal",
  props: { exibirModal: { type: Boolean, required: true }, usuario: { required: true } },
  data() {
    return {
      valid: null,
      modalAberto: false,
      exibirSenha: 'password',
      exibirConfirmacao: 'password',
      rules: {
        required: value => !!value || 'Required',
        minLength5: value => (value && (value?.length  >= 5)) || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    };
  },
  methods: {
    closeModal() {
      this.modalAberto = false;
      this.$emit("input", !this.exibirModal);
    },
    
    async save(){
      if (this.usuario.modeloValido())
      {                        
        if (!this.usuario.id)
        {
          var retorno =await UserApi.cadastrar(this.usuario); 
          this.usuario.id = retorno.data.id;                   
        }
        else
        {
          await UserApi.atualizar(this.usuario);           
        }

        this.$emit("atualizar-usuario", this.usuario); 
        this.closeModal();    
      }      

      exibirMensagem(MENSAGENS.CAMPOS_OBRIGATORIOS, "error");      
    }           
  },
};

</script>


+