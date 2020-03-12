<template>
  <div class="container">
    <h1>Lista de pessoas</h1>
    <hr />
    <div class="form-todo form-group">
      <p>
        Nome
        <input
          type="text"
          name="nome"
          id="name"
          placeholder="Ex.: Fulano de Tal Sicrano"
          class="form-control"
          v-model="name"
        />
      </p>
      <p>
        CPF
        <input
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Ex.: 000.000.000-00"
          class="form-control"
          v-model="cpf"
        />
      </p>
      <p>
        Data de nascimento
        <input
          type="date"
          name="dt_birth"
          id="name"
          placeholder="Data de nascimento"
          class="form-control"
          v-model="dt_birth"
        />
      </p>
      <p>
        Salário
        <input
          type="number"
          name="salary"
          min="0"
          step="any"
          id="name"
          placeholder="Ex.: R$ 500,00"
          class="form-control"
          v-model="salary"
        />
      </p>
      <button v-on:click.prevent="addPerson" type="submit" class="btn btn-primary">Adicionar pessoa</button>
      <button
        v-on:click.prevent="saveUpdate"
        type="submit"
        class="btn btn-primary"
        hidden="true"
      >Salvar alteração</button>
      <hr />
    </div>
    <div class="list-group">
      <!--- Não sei por que (pessoa,index) ao invés de (index, pessoa)-->
      <h3>LISTA</h3>
      <div class="list-group-item" v-for="(person, index) in allPeople" v-bind:key="index">
        <!--bind-key serve para ordenar-->
        <span class="pessoa_name">
          <b>Nome:</b>
          {{person.name}}
        </span>
        <br />
        <span class="pessoa_cpf">
          <b>CPF:</b>
          {{person.cpf}}
        </span>
        <br />

        <span class="pessoa_dt_birth">
          <b>Data de nascimento:</b>
          {{person.dt_birth}}
        </span>
        <br />
        <span class="pessoa_salary">
          <b>Salário:</b>
          R$ {{person.salary}}
        </span>
        <br />
        <p>
          <a href="#" title="Excluir" @click.prevent="removePerson(index)">Excluir</a>
          <a href="#" title="Editar" @click.prevent="updatePerson(index)">Editar</a>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >Launch demo modal</button>
        </p>
      </div>
    </div>
    <hr />

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TESTE-->
</template>

<script>
import { peopleRef } from "../firebase";
import { db } from "../firebase";
export default {
  data() {
    return {
      people: [], //array two data bind
      name: "",
      cpf: "",
      dt_birth: new Date(0),
      salary: 0.0
    };
  },

  methods: {
    checkForm() {
      if (this.name == "") {
        alert("Nome inválido");
        return false;
      } else if (this.cpf == "") {
        // TODO: Mask
        alert("CPF inválido");
        return false;
      } else if (this.dt_birth.toString() === new Date(0).toString()) {
        //pode ser melhorado
        alert("Data de nascimento inválida");
        return false;
      } else if (this.salary < 0) {
        //coloquei min no input, porem por segurança
        alert("Salário inválido");
        return false;
      } else {
        return true;
      }
    },
    listPeople() {
      peopleRef.on("value", snapshoot => {
        //console.log(snapshoot.val());
        this.people = snapshoot.val();
        //console.log(this.people);
        //return snapshoot.val();
      });
      return this.people;
    },
    addPerson() {
      if (this.checkForm()) {
        peopleRef.push({
          name: this.name,
          cpf: this.cpf,
          dt_birth: this.dt_birth,
          salary: this.salary
        });

        this.name = "";
        this.cpf = "";
        this.dt_birth = new Date(0);
        this.salary = 0.0;
        this.listPeople;
      }
    },

    removePerson(index) {
      db.database()
        .ref("people/" + index)
        .set(null);
      console.log("index = " + index + "- removed person");
    },
    updatePerson(index) {
      return index;
    }
  },
  computed: {
    allPeople() {
      this.listPeople();
      return this.people;
    }
  },
  watch: {}
};
</script>

<style>
</style>