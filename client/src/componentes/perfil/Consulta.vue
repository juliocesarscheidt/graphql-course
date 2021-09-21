<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Perfis</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="profile.id" />
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
      profile: {},
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
          id: parseInt(this.profile.id, 10),
        };

        const result = await this.$api.query({ query: gql`
          query (
            $id: Int
          ) {
            profile(
              id: $id
            ) {
              id
              name
              createdAt
            }
          }`,
          variables: filter,
        });

        this.dados = result.data.profile;
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
