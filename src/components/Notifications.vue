<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-1" v-bind="attrs" v-on="on" icon>
        <v-badge :color="'error'" overlap>
          <template v-slot:badge>
            <span>{{notifications.length}}</span>
          </template>

          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list subheader two-line>
      <v-subheader>Notifications</v-subheader>
      <v-list-item
        v-for="notification in notifications"
        :key="notification.title"
      >
        <v-list-item-avatar small>
          <v-icon color="primary" v-text="notification.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="notification.text"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "Notifications",
  data: () => ({
    notifications: [
        {
          title: "Notificação",
          icon: "mdi-alert-circle",
          text: "Just a simple notification.",
        },
      ],
  }),
};
</script>