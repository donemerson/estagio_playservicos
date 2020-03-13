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
        <span v-if="person.edit" class="pessoa_name">
          Nome
          <input
            type="text"
            name="nome"
            id="name"
            placeholder="Ex.: Fulano de Tal Sicrano"
            class="form-control"
            v-model="person.name"
            style="padding:0px"
          />
        </span>
        <span v-else class="pessoa_name">
          <b>Nome:</b>
          {{person.name}}
        </span>

        <br />
        <span v-if="person.edit" class="pessoa_cpf">
          CPF
          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Ex.: 000.000.000-00"
            class="form-control"
            v-model="person.cpf"
          />
        </span>
        <span v-else class="pessoa_cpf">
          <b>CPF:</b>
          {{person.cpf}}
        </span>

        <br />

        <span v-if="person.edit" class="pessoa_dt_birth">
          Data de nascimento
          <input
            type="date"
            name="dt_birth"
            id="name"
            placeholder="Data de nascimento"
            class="form-control"
            v-model="person.dt_birth"
          />
        </span>
        <span v-else class="pessoa_dt_birth">
          <b>Data de nascimento:</b>
          {{person.dt_birth}}
        </span>

        <br />

        <span v-if="person.edit" class="pessoa_salary">
          Salário
          <input
            type="number"
            name="salary"
            min="0"
            step="any"
            id="name"
            placeholder="Ex.: R$ 500,00"
            class="form-control"
            v-model="person.salary"
          />
        </span>
        <span v-else class="pessoa_salary">
          <b>Salário:</b>
          R$ {{person.salary}}
        </span>

        <br />

        <div v-if="person.edit">
          <button
            type="button"
            class="btn btn-primary"
            style="padding: 0px; margin: 5px"
            v-on:click.prevent="updatePerson(person, index)"
          >Salvar alteração</button>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color:red; padding: 0px; border-color:red; margin: 5px"
            v-on:click.prevent="cancelEdit(index)"
          >Cancelar</button>
        </div>

        <div v-else>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color:red; padding: 0px; border-color:red; margin: 5px"
            v-on:click.prevent="removePerson(index)"
          >Excluir</button>

          <button
            type="button"
            class="btn btn-primary"
            style="padding: 0px; margin: 5px"
            v-on:click.prevent="setEdit(index)"
          >Editar</button>
        </div>
      </div>
    </div>
    <hr />

    <!-- Modal -->
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
    checkForm(p) {
      if (p.name == "") {
        alert("Nome inválido");
        return false;
      } else if (p.cpf == "") {
        // TODO: Mask
        alert("CPF inválido");
        return false;
      } else if (p.dt_birth.toString() === new Date(0).toString()) {
        //pode ser melhorado
        alert("Data de nascimento inválida");
        return false;
      } else if (p.salary < 0) {
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
      var newP = {
        name: this.name,
        cpf: this.cpf,
        dt_birth: this.dt_birth,
        salary: this.salary,
        edit: false
      };
      if (this.checkForm(newP)) {
        peopleRef.push({ newP });

        this.name = "";
        this.cpf = "";
        this.dt_birth = new Date(0);
        this.salary = 0.0;
      }
    },

    removePerson(index) {
      db.database()
        .ref("people/" + index)
        .set(null);
    },
    updatePerson(person, index) {
      var newP = {
        edit: false,
        name: person.name,
        dt_birth: person.dt_birth,
        salary: person.salary,
        cpf: person.cpf
      };
      if (this.checkForm(newP)) {
        db.database()
          .ref("people/" + index)
          .update(newP);
      }
    },
    setEdit(index) {
      db.database()
        .ref("people/" + index)
        .update({ edit: true });
    },
    cancelEdit(index) {
      db.database()
        .ref("people/" + index)
        .update({ edit: false });
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