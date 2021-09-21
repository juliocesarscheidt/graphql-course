<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Novo Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="Nome" v-model="user.name" />
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-text-field label="Idade" v-model.number="user.age" type="number" />
          <v-select
            label="Perfil"
            v-model="user.profileId"
            :items="profiles"
            item-value="id"
            item-text="name"
            attach
            chips
            deletable-chips
          />
          <v-btn class="ml-0 mt-3" @click="getProfiles"> Obter Perfis </v-btn>
          <v-btn color="primary" class="ml-0 mt-3" @click="novoUsuario">
            Novo Usuário
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
            <v-text-field label="Email" readonly v-model="dados.email" />
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
      profiles: [],
      dados: null,
      erros: null,
    };
  },
  computed: {
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    async novoUsuario() {
      try {
        const payload = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          age: parseInt(this.user.age, 10),
          profileId: parseInt(this.user.profileId, 10),
        };

        const result = await this.$api.mutate({
          mutation: gql`
            mutation (
              $name: String!
              $email: String!
              $password: String!
              $age: Int
              $profileId: Int
            ) {
              createUser(
                payload: {
                  name: $name
                  email: $email
                  password: $password
                  age: $age
                  profileId: $profileId
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
            }
          `,
          variables: payload,
        });

        this.dados = result.data.createUser;
        this.erros = null;

      } catch (err) {
        console.error(err);
        this.erros = err;
      }
    },
    async getProfiles() {
      try {
        const result = await this.$api.query({ query:
          gql`{ profiles { id name createdAt } }`
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
