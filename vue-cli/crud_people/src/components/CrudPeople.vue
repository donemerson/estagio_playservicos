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
      <div
        hidden="empty"
        class="list-group-item"
        v-for="(pessoa, index) of allPeople"
        v-bind:key="index"
      >
        <!--bind-key serve para ordenar-->
        <span class="pessoa_name">
          <b>Nome:</b>
          {{pessoa.name}}
        </span>
        <br />
        <span class="pessoa_cpf">
          <b>CPF:</b>
          {{pessoa.cpf}}
        </span>
        <br />
        <span class="pessoa_dt_birth">
          <b>Data de nascimento:</b>
          {{pessoa.dt_birth}}
        </span>
        <br />
        <span class="pessoa_salary">
          <b>Salário:</b>
          R$ {{pessoa.salary}}
        </span>
        <br />
        <div>
          <p>
            <a href="#" title="Excluir" @click.prevent="removePerson()">Excluir</a>
            <a href="#" title="Editar" @click.prevent="updatePerson()">Editar</a>
          </p>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      empty: true,
      people: [{}],
      name: "",
      cpf: "",
      dt_birth: new Date(0),
      salary: 0.0
    };
  },
  computed: {
    allPeople() {
      return this.people;
    }
  },
  watch: {
    //monitora os atributo do date(){}
    people: function() {
      if (people.lenght == 0) {
        empty = true;
      } else {
        empty = false;
      }
    }
  },
  methods: {
    addPerson() {
      if (this.checkForm()) {
        var p = {
          name: this.name,
          cpf: this.cpf,
          dt_birth: this.dt_birth,
          salary: this.salary
        };
        this.people.push(p);
      } else {
        alert("Complete corretamente todos os campos do formulário");
      }

      this.name = "";
      this.cpf = "";
      this.dt_birth = new Date(0);
      this.salary = 0.0;
    },
    checkForm() {
      if (this.name == "") {
        return false;
      } else if (this.dt_birth.toString() === new Date(0).toString()) {
        //pode ser melhorado
        return false;
      } else if (this.salary < 0) {
        //coloquei min no input, porem por segurança
        return false;
      } else if (this.cpf == "") {
        //add mask in future
        return false;
      } else if (this.alreadyCPF(this.cpf)) {
        return false;
      } else {
        return true;
      }
    },
    alreadyCPF() {
      return false;
    },
    removePerson() {
      console.log("remove person");
    },
    updatePerson() {
      console.log("update person");
    }
  }
};
</script>

<style>
</style>