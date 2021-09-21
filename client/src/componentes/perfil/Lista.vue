<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-btn color="primary" class="ml-0 mb-4" @click="getProfiles">
          Obter Perfis
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="erros" class="mb-4">
          <Erros :erros="erros" />
        </div>
      </v-flex>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="profiles"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
          </template>
        </v-data-table>
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
      erros: null,
      profiles: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "name" },
      ],
    };
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      try {
        const result = await this.$api.query({ query:
          gql`{
            profiles { id name createdAt }
          }`,
          fetchPolicy: 'network-only',
        });

        this.profiles = result.data.profiles;
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
