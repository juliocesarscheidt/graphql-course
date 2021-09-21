<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Excluir Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />
          <v-text-field label="E-mail" v-model="filter.email" />

          <v-btn color="error" class="ml-0 mt-3" @click="deleteUser">
            Excluir Usuário
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
      filter: {},
      dados: null,
      erros: null,
    };
  },
  methods: {
    async deleteUser() {
      try {
        const filter = {
          id: parseInt(this.filter.id, 10),
          email: this.filter.email,
        };

        const result = await this.$api.mutate({ mutation: gql`
          mutation (
            $id: Int
            $email: String
          ) {
            deleteUser(
              filter: {
                id: $id
                email: $email
              }
            ) {
              id
              name
              email
              password
              age
              logged
              profileId
              profile { id name createdAt }
              status
              createdAt
            }
          }`,
          variables: filter,
        });

        this.dados = result.data.deleteUser;
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
