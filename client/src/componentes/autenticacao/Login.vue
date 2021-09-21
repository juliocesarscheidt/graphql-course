<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Login</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-btn color="primary" class="ml-0 mt-3" @click="login">
            Logar
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Resultado</h1>
          <v-divider />
          <template v-if="dados">
            <v-text-field label="ID" readonly v-model="dados.id" />
            <v-text-field label="Nome" readonly v-model="dados.name" />
            <v-text-field label="E-mail" readonly v-model="dados.email" />
            <v-text-field label="Token" readonly v-model="dados.token" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Erros from "../comum/Erros";
import gql from "graphql-tag";

export default {
  components: { Erros },
  data() {
    return {
      user: {},
      dados: null,
      erros: null,
    };
  },
  computed: {
  },
  methods: {
    ...mapActions(["setUser"]),
    async login() {
      const payload = {
        email: this.user.email,
        password: this.user.password,
      };

      try {
        const result = await this.$api.query({ query: gql`
          query (
            $email: String!
            $password: String!
          ) {
            login(
              payload: {
                email: $email
                password: $password
              }
            ) {
              id
              name
              email
              profileId
              profile { id name createdAt }
              token
            }
          }`,
          variables: payload,
        });

        this.dados = result.data.login;
        this.setUser(this.dados);
        this.erros = null;

      } catch (err) {
        console.error(err);
        this.erros = err;
      }
    },
  },
};
</script>

<style>
</style>
