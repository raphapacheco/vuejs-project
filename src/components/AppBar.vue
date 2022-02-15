<template>
  <div>
    <v-app-bar  app color="primary" dark>
      <v-app-bar-nav-icon v-if="exibirMenu" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
          :src="require('@/assets/project-name.svg')"     
          width="200"
        />        
      </div>
      
      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <div v-if="!exibirMenu">
          <v-btn
            href="https://github.com/raphapacheco/vuejs-project"
            target="_blank"
            text
          >      
            <v-img
              alt="Vuetify Signature"
              class="shrink"          
              contain          
              :src="require('@/assets/assinatura.svg')"     
              min-width="100"
              width="170"
              transition="scale-transition"
            />     
            <v-img
              :src="require('@/assets/github.svg')" 
              min-width="25"
              width="40" 
              transition="scale-transition"           
            />
          </v-btn>
        </div>
        
        <v-divider vertical class="mr-1"></v-divider>
        
        <div v-if="exibirMenu">
          <Notifications/>                        
          <AccountInfo/>
        </div>
      </div>
    </v-app-bar>

    <SideMenu v-if="exibirMenu && drawer"></SideMenu>
    
  </div>

</template>

<script>

import SideMenu from '@/components/SideMenu'
import Notifications from '@/components/Notifications'
import AccountInfo from '@/components/AccountInfo'

export default {
  name: "AppBar",
  components: { SideMenu, Notifications, AccountInfo},
  props: { exibirMenu: {type: Boolean} },
  data: () => ({
    drawer: null,
  }),
};
</script>