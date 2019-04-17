<template>
  <div>
    <b-table :items="setItems" :fields="fields" striped>
      <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          Editar Utilizador
        </b-button>
      </template>

      <template slot="remove_user" slot-scope="row">
        <b-button size="sm" @click="row.removeUser" class="mr-2">
          Remover Utilizador
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
            <b-col>{{ row.item.id }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "gestor",
  data: function() {
    return {
        fields: ['id', 'name', 'email', 'show_details', 'remove_user'],
        items: [
          
        ]
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.tempUsers = this.$store.state.users;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );
  },
  methods: {
    setItems(){
      console.log(this.tempUsers.length)
      for (let i = 0; i < this.tempUsers.length; i++) {
        let temp = {
          isActive: true,
          id: this.tempUsers[i].id,
          name: this.tempUsers[i].name,
          email: this.tempUsers[i].email
        }
        items.push(temp);
        console.log("ooo")
      }
      console.log(items)
      return items
    }
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
