<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title" :to="child.path">

            <v-list-item-icon>
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title> {{ child.title}} </v-list-item-title>

          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>

        <v-list-item @click="logout">        
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>                   
          <v-list-item-title>Logout</v-list-item-title>           
        </v-list-item>
       
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { exibirMensagem } from "@/actions";
import apiAuth from "@/api/auth/auth-api";
import utilsStorage from "@/utils/storage";

export default {
  name: "Menu",
  components: {  },
  data() {
    return {
      items: [
        {
          title: "Configs",
          action: "mdi-cogs",
          items: [
            { title: "Users", path:"/user", icon:"mdi-account-cog" },            
          ],          
        },        
      ],
    };
  },

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
};
</script>

<style lang="scss" scoped>
/*  mudando o menu lateral */
.v-item--active.v-list-item--active.v-list-item.v-list-item--link,
.v-list .v-list-item--active .v-icon {
  color: #165091;
}

.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-left: 30px;
}
</style>