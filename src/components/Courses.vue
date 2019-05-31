<template>
  <b-container fluid>
    <div class="middle catalog">
      <b-row class="subrow">
        <h2>Unidades Pedagógicas</h2>
      </b-row>

      <!-- COURSES -->
      <b-row class="subrow courseList">
        <b-col md="12" v-for="course in getCourses" :key="course.id" class="course">
          <b-row>
            <b-col md="12" id="courseTitle" class="text-left">
              <h5>{{ course.course }}</h5>
            </b-col>
          </b-row>

          <b-row v-for="unit in getUnitsByCourseId(course.id)" :key="unit.id">
            <b-col md="8" id="signInUnit" class="text-left">
              <p>{{ unit.unit }}</p>
            </b-col>
            <b-col md="2" id="signInBtn">
              <b-button @click="signIn(course.id, unit.id)" class="btn" type="button">Inscrever</b-button>
            </b-col>
            <b-col md="1" id="infoBtn">
              <b-button v-b-modal.modal-1 class="btn" type="button">
                <i class="fas fa-info-circle"></i>
              </b-button>
            </b-col>            
            <div v-for="courseUnit in course.courseUnit" :key="courseUnit">
              <b-modal id="modal-1" title="Info" v-if="courseUnit == unit.id">
                <p class="my-4">{{unit.unit}}</p>
                <br>
                <p class="my-4">{{unit.year}}º Ano</p>
              </b-modal>
            </div>

          </b-row>
        </b-col>
      </b-row>


    </div>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "courses",
  data: function() {
    return {
      courses: [],
      units: []
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );

    this.courses = this.checkCourseLabel;
    //this.units = this.checkCourseUnitLabel;
  },
  methods: {
    unitValidation(newUnit) {
      let valid = false;
      if (this.checkUserUnitsById(newUnit) == "") {
        valid = true;
      } else {
        valid = false;
      }
      return {
        valid: valid,
        msg: this.checkUserUnitsById(newUnit)
      };
    },
    signIn(courseId, unitId) {
      let newUnit = {
        unitId: unitId,
        courseId: courseId,
        userId: this.tempLoggedId
      };

      if (this.unitValidation(newUnit).valid) {
        this.$store.dispatch("set_new_unit", newUnit);
        alert("Registo efetuado com sucesso");
        console.log(this.users);
      } else {
        alert(this.unitValidation(newUnit).msg);
      }
    }
  },
  computed: {
    ...mapGetters([
      "getUsers",
      "getCourses",
      "getUnitsByCourseId",
      "checkUserUnitsById",
      "checkCourseLabel"
    ])
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
  color: black;
}

#signInBtn {
  margin-bottom: 10px;
}
</style>
