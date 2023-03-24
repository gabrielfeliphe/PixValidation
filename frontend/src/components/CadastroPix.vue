<template>
    <v-app>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-app-bar app height="30">
              <v-toolbar-title>
                <img src="logo.png" alt="Logotipo" />
              </v-toolbar-title>
            </v-app-bar>
          </v-col>
        </v-row>
  
        <div class="header">
          <v-row align="center">
            <v-col cols="6">
              <h1 class="ml-3">Seus favorecidos</h1>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-text-field
                label="Pesquisar"
                solo
                dense
                append-icon="mdi-magnify"
                class="mr-3 search-input"
                style="max-width: 150px;"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
  
        <v-btn color="primary" @click="deleteSelected" class="mb-2">Excluir selecionados</v-btn>
  
        <v-data-table :headers="headers" :items="favorecidos" item-key="id" class="elevation-1" show-select>
          <template slot="item.status" slot-scope="{ item }">
            <v-chip :color="item.status ? 'green' : 'red'" dark>
              {{ item.status ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </template>
  
  <style>
  .header {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: "Favorecido", value: "favorecido" },
          { text: "CPF/CNPJ", value: "cpfCnpj" },
          { text: "Banco", value: "banco" },
          { text: "Agência", value: "agencia" },
          { text: "CC", value: "cc" },
          { text: "Status do favorecido", value: "status" },
        ],
        favorecidos: [
          // implementar chamada da API
        ],
      };
    },
    methods: {
      deleteSelected() {
        // implementar a logica para deletar os selecionados
      },
    },
  };
  </script>
  