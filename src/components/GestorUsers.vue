<template>
  <b-container fluid>
    <div class="middle catalog">
      <b-row class="subrow">
        <h2>Gestor de Utilizadores</h2>
      </b-row>
        <div>
            <b-table striped hover :items="items" :fields="fields" :bordered="bordered" :outlined="outlined"></b-table>
        </div>
    </div>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "gestor",
  data: function() {
    return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );
  },
  methods: {
    
  },
  computed: {
    
  }
};
</script>


<style>
.courseList {
  margin-top: 30px;
}
.course {
  margin: 5px 0px !important;
  border-bottom: 2px solid #ffd150;
}

.course p {
  padding-top: auto;
  font-size: 16px;
}

#courseTitle {
  background-color: white;
  border-radius: 5px;
  padding: 5px 15px;
  margin-top: 10px;
}

#courseTitle h5 {
  color: black;
}

#signInUnit p {
  margin-top: 20px;
}

#signInBtn {
  margin-bottom: 10px;
}
</style>
