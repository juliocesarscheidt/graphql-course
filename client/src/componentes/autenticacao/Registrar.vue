<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Registrar</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="Nome" v-model="user.name" />
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-text-field label="Idade" v-model.number="user.age" type="number" />
          <v-btn color="primary" class="ml-0 mt-3" @click="registerUser">
            Registrar
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
            <v-text-field label="Idade" readonly v-model.number="dados.age" />
            <v-text-field label="Perfil" readonly :value="dados.profile.name" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
  computed: {},
  methods: {
    async registerUser() {
      try {
        const payload = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          age: parseInt(this.user.age, 10),
        };

        const result = await this.$api.mutate({
          mutation: gql`
            mutation (
              $name: String!
              $email: String!
              $password: String!
              $age: Int
            ) {
              registerUser(
                payload: {
                  name: $name
                  email: $email
                  password: $password
                  age: $age
                }
              ) {
                id
                name
                email
                age
                profileId
                profile {
                  id
                  name
                  createdAt
                }
              }
            }
          `,
          variables: payload,
        });

        this.dados = result.data.registerUser;
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
