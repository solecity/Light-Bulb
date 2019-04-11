<template>
  <b-container fluid>
    <div class="middle catalog">
      <b-row class="subrow">
        <h2>Unidades Pedagógicas</h2>
      </b-row>

      <!-- COURSES -->
      <b-row class="subrow courseList">
        <b-col md="12" class="course">
          <b-row>
            <b-col md="12" id="courseTitle" class="text-left">
              <h5>fffffg</h5>
            </b-col>
          </b-row>

          <b-row v-for="unit in course.courseUnit" :key="unit.id">
            <b-col md="8" id="signInUnit" class="text-left">
              <p>fffff</p>
            </b-col>
            <b-col md="2" id="signInBtn">
              <b-button class="btn" type="button">Inscrever</b-button>
            </b-col>
            <b-col md="1" id="infoBtn">
              <b-button class="btn" type="button">
                <i class="fas fa-info-circle"></i>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "gestor",
  data: function() {
    return {

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
