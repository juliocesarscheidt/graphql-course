<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Filtrar Perfil</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />

          <h1 class="mt-4 headline">Alterar Perfil</h1>
          <v-divider class="mb-3" />
          <v-text-field label="Nome" v-model="profile.name" />

          <v-btn color="primary" class="ml-0 mt-3" @click="updateProfile">
            Alterar Perfil
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
      filter: {},
      profile: {},
      dados: null,
      erros: null,
    };
  },
  methods: {
    async updateProfile() {
      try {
        const filter = {
          id: parseInt(this.filter.id, 10),
        };

        const payload = {
          name: this.profile.name,
        };

        const result = await this.$api.mutate({ mutation: gql`
          mutation (
            $id: Int
            $name: String
          ) {
            updateProfile(
              filter: {
                id: $id
              }
              payload: {
                name: $name
              }
            ) {
              id
              name
              createdAt
            }
          }`,
          variables: { ...filter, ...payload },
        });

        this.dados = result.data.updateProfile;
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
