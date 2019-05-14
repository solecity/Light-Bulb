<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="nameLabel" label="Nome da Unidade Pedagógica:" label-for="inputName">
        <b-form-input
          id="inputName"
          v-model="form.name"
          type="text"
          required
          placeholder="Nome da Unidade Pedagógica"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="yearLabel" label="Ano:" label-for="inputYear">
        <b-form-input
          id="inputYear"
          v-model="form.year"
          type="number"
          required
          min="1"
          max="3"
          placeholder="Ano"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Adicionar</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <br>
    <div>
      <b-table
        striped
        hover
        :items="getCouseUnit()"
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
        name: "",
        year: 0
      },
      items: [
      ],
      units: [],
      show: true
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.tempCourseUnits = this.$store.state.courseUnits;
    this.tempCourses = this.$store.state.courses;
    //this.tempCourseUnit;
    /* for(let i=0; i<this.tempCourses.length; i++){
      this.tempCourseUnit.push(this.tempCourses[i].courseUnit);
    }*/
    console.log(this.tempCourseUnits);

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
      this.form.name = "";
      this.form.year = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    getCouseUnit(){
      let temp = [];
      console.log(this.tempCourseUnits);
      console.log(this.tempCourseUnits.length);

      for (let i = 0; i < this.tempCourseUnits.length; i++) {
        console.log("d: " + i);
        
        temp.push(
          {
            id: this.tempCourseUnits[i].id,
            name: this.tempCourseUnits[i].unit,
            year: this.tempCourseUnits[i].year
          }
        );
        console.log("c: " + temp);
      }
      return temp;
    },
    
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