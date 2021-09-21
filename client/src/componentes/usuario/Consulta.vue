<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />
          <v-text-field label="E-mail" v-model="filter.email" />
          <v-btn color="primary" class="ml-0 mt-3" @click="search">
            Consultar
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
      filter: {},
      profiles: [],
      dados: null,
      erros: null,
    };
  },
  computed: {
  },
  methods: {
    async search() {
      try {
        const filter = {
          id: parseInt(this.filter.id, 10),
          email: this.filter.email,
        };

        const result = await this.$api.query({ query: gql`
          query (
            $id: Int
            $email: String
          ) {
            user(
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

        this.dados = result.data.user;
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
