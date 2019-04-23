<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="nameLabel"
        label="Nome do Curso:"
        label-for="inputName"
      >
        <b-form-input
          id="inputName"
          v-model="form.email"
          type="text"
          required
          placeholder="Nome do Curso"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select id="input-3" v-model="form.food" :options="foods" required></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <br>
    <div>
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"
        :bordered="bordered"
        :outlined="outlined"
      ></b-table>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "gestor",
  data: function() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      items: [
        { id: 40, username: "Dickerson", block: `<i class="fas fa-lock"></i>` },
        { id: 21, username: "Larsen", block: '<i class="fas fa-lock"></i>' },
        { id: 89, username: "Geneva", block: '<i class="fas fa-lock"></i>' },
        { id: 38, username: "Jami", block: '<i class="fas fa-lock"></i>' }
      ],
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true
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
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  computed: {}
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