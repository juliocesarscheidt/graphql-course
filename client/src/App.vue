<template>
  <v-app>
    <v-toolbar app color="red" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>GraphQL</span>
        <span class="font-weight-light">Client</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <Conteudo />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Conteudo from "./componentes/Conteudo";
import gql from "graphql-tag";

export default {
  name: "App",
  components: { Conteudo },
  created() {
    this.checkToken();
  },
  methods: {
    ...mapActions(["setUser"]),
    async checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setUser(null);
      } else {
        try {
          const result = await this.$api.query({ query: gql`
            query (
              $token: String!
            ) {
              verifyToken(
                payload: {
                  token: $token
                }
              ) {
                id
                name
                token
                profileId
                profile { id name createdAt }
                token
              }
            }`,
            variables: { token },
          });

          this.setUser(result.data.verifyToken);
          this.erros = null;

        } catch (err) {
          console.error(err);
          this.erros = err;
        }
      }
    }
  }
};
</script>
