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
          v-model="form.name"
          type="text"
          required
          placeholder="Nome do Curso"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Unidades Pedagógicas:" label-for="input-3">
        <b-form-select id="input-3" v-model="form.unit" :options="setUnits()" required multiple="true"></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Adicionar</b-button>
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
        name: "",
        unit: ""
      },
      items: [
        { id: 40, nome: "Dickerson", block: `<i class="fas fa-lock"></i>` },
        { id: 21, nome: "Larsen", block: '<i class="fas fa-lock"></i>' },
        { id: 89, nome: "Geneva", block: '<i class="fas fa-lock"></i>' },
        { id: 38, nome: "Jami", block: '<i class="fas fa-lock"></i>' }
      ],
      units: [
        
      ],
      show: true
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.tempCourses = this.$store.state.courses;
    //this.tempCourseUnit;
   /* for(let i=0; i<this.tempCourses.length; i++){
      this.tempCourseUnit.push(this.tempCourses[i].courseUnit);
    }*/
    console.log(this.tempCourseUnit)

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
      this.form.unit = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },setUnits

    (){
      let tempCourseUnit = [];
      for(let i=0; i<this.tempCourses.length; i++){
        tempCourseUnit.push(this.tempCourses[i].courseUnit)
      }
      console.log(tempCourseUnit)
     // console.log(this.tempCourses.length)
      for (let i = 0; i < tempCourseUnit.length; i++) {
          let temp = tempCourseUnit[i].unit
          console.log("oooo")
       // units.push(temp);
        return temp
      }
     // console.log(units)
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