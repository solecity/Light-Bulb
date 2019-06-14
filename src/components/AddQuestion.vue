<template>
  <b-container fluid>
    <div class="middle newQuestion">
      <b-row class="subrow">
        <h2>Nova Pergunta</h2>
      </b-row>

      <b-row class="subrow frmQuestion">
        <b-form id="frmQuestion">
          <b-form-group label="Título" label-for="inputTitle">
            <b-form-input id="inputTitle" v-model="form.title" type="text" placeholder="Pergunta" required></b-form-input>
          </b-form-group>
          <b-form-group label="Descrição" label-for="inputDescription">
            <b-form-textarea
              id="inputDescription"
              v-model="form.description"
              :rows="5"
              :max-rows="100"
              placeholder="Descrição"
              required
            ></b-form-textarea>
          </b-form-group>

          <div>
            <b-form-group id="input-group-4" label="Tags:" label-for="input-tags">
              <b-form-select 
                id="input-tags"
                v-model="form.tag"
                :options="getTags()"
                multiple="true"
              ></b-form-select>
            </b-form-group>
          </div>

          <div>
            <b-form-group id="input-group-4" label="Tags:" label-for="input-course">
              <b-form-select 
                id="input-course"
                v-model="form.course"
                :options="getCourses()"
              ></b-form-select>
            </b-form-group>
          </div>

          <div>
            <b-form-group id="input-group-4" label="Tags:" label-for="input-units">
              <b-form-select 
                id="input-units"
                v-model="form.unit"
                :options="getUnits()"
              ></b-form-select>
            </b-form-group>
          </div>

          <div id="img" class="form-group">
            <label for="inputPhoto">Imagens (Opcional)</label>
            <input type="url" class="form-control" id="inputPhoto" placeholder="Imagem">
          </div>

          <!--<div class="form-group">
            <label for="inputPhoto">Imagens (Opcional)</label>
            <input
              type="file"
              multiple
              accept="image/*, .pdf, .png, .jpg"
              class="form-control"
              id="inputPhoto"
            >
          </div>

          <div class="form-group">
            <label for="inputFiles">Ficheiros (Opcional)</label>
            <input type="file" multiple class="form-control" id="inputFiles">
          </div>

          TAGS ?????
          <div class="form-group">
            <label for="inputTags">Tags</label>
            <select id="inputTags" multiple="multiple" size="10">
              <option :value="tags.id">{{ tags.tag }}</option>
            </select>
          </div>

          COURSE ?????
          <div class="form-group">
            <label for="inputCourses">Curso</label>
            <select id="inputCourses" multiple="multiple" size="10">
              <option :value="courses.id">{{ courses.course }}</option>
            </select>
          </div>

          UNITS ?????
          <div class="form-group">
            <label for="inputUnits">Disciplinas</label>
            <select id="inputUnits" multiple="multiple" size="10">
              <option :value="courses.courseUnit.id">{{ courses.courseUnit.unit }}</option>
            </select>
          </div>-->
          <b-button @click="addQuestion()" class="btn" type="button">Publicar</b-button>
        </b-form>
      </b-row>
    </div>
  </b-container>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "addQuestion",
  data: function() {
    return {
      loggedUser: 0,
      form: {
        title: "",
        description: "",
        idTags: [],
        idCourse: 0,
        files: "",
        images: "",
        tag: [],
        course: "",
        unit: ""
      },
      tempQuestions: [],
      todaysDate: "",

      /********/
      tempLoggedId: 0
    };
  },
  watch: {
    // whenever question changes, this function will run
    questions: function(newQuestion, oldQuestion) {
      console.log("newQuestion");
      console.log(newQuestion);
      if (newQuestion.length > 0) {
        
      }
    }
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.todaysDate = this.$store.getters.getTodaysDate;
    this.tempTags = this.$store.state.tags;
    this.tempCourses = this.$store.state.courses;
    this.tempCourseUnits = this.$store.state.courseUnits;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );
  },  
  mounted(){    
    /*this.$store.dispatch("loadUsers");
    this.$store.dispatch("loadCourses");
    this.$store.dispatch("loadQuestions");
    this.$store.dispatch("loadAnswers");
    this.$store.dispatch("loadUnits");
    this.$store.dispatch("loadTags");*/
  },
  methods: {
    getTags() {
      let temp = [];
      console.log("ggggg:",this.tempTags);
      console.log(this.tempTags.length);

      for (let index = 0; index < this.tempTags.length; index++) {
        console.log("a: " + index);
        temp.push(this.tempTags[index].tag);
        console.log("b: " + temp);
      }
      return temp;
    },
    getCourses() {
      let temp = [];
      console.log(this.tempCourses);
      console.log(this.tempCourses.length);

      for (let index = 0; index < this.tempCourses.length; index++) {
        console.log("a: " + index);
        temp.push(this.tempCourses[index].course);
        console.log("b: " + temp);
      }
      return temp;
    },
    getUnits() {
      let temp = [];
      console.log(this.tempCourseUnits);
      console.log(this.tempCourseUnits.length);

      for (let index = 0; index < this.tempCourseUnits.length; index++) {
        console.log("a: " + index);
        temp.push(this.tempCourseUnits[index].unit);
        console.log("b: " + temp);
      }
      return temp;
    },
    checkQuestion(fields) {
      let error = "";

      if (fields.title == "" || fields.description == "") {
        error = "Os dados estão incompletos";
      }
      return error;
    },

    questionValidation() {
      let fields = {
        title: this.form.title,
        description: this.form.description
      };
      let valid = false;

      if (this.checkQuestion(fields) == "") {
        valid = true;
      } else {
        valid = false;
      }

      return {
        valid: valid,
        msg: this.checkQuestion(fields)
      };
    },

    addQuestion() {
      let tagsId = document.getElementById("input-tags").value
      console.log("tt:",tagsId)

      let newQuestion = {
        tags: [tagsId],
        images: [],
        //date: this.$store.getters.getTodaysDate,
        //view: 0,
        //upvotes: [],
        //downvotes: [],
        //locked: false,
        //followers: [],
        //_id: this.$store.getters.getQuestionLastId,
        title: this.form.title,
        description: this.form.description,
        user: this.tempLoggedId,
        course: "",
        unit: "",
        //answers: [],
        //__v: 0
      }

      let newQuestion2 = {
        id: this.$store.getters.getQuestionLastId,
        title: this.form.title,
        description: this.form.description,
        idTags: [],
        idCourse: 0,
        files: "",
        images: "",
        userId: this.tempLoggedId,
        date: this.$store.getters.getTodaysDate,
        view: 0,
        upvote: [],
        downvote: [],
        status: "unlocked",
        answers: []
      };

      if (this.questionValidation().valid) {
        this.addXP();
        this.checkMedals();
        this.$store.dispatch("set_question", newQuestion);
        //alert("Registo efetuado com sucesso");
      } else {
        alert(this.questionValidation().msg);
      }
    },

    addXP() {
      let xp = {
        amount: 5,
        user: this.tempLoggedId
      };
      this.$store.dispatch("edit_user_xp", xp);
    },

    checkMedals() {
      let temp = this.$store.getters.getQuestionsByUserId(this.tempLoggedId);

        console.log(temp.length);
      if (temp.length == 0) {
        let newMedal = {
          medal: 2,
          userId: this.tempLoggedId
        };

        console.log(newMedal);
        this.$store.dispatch("add_user_medals", newMedal);
      }
    }
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
    tags() {
      return this.$store.getters.tags;
    },
    ...mapState(["users", "courses", "questions", "answers", "courseUnits", "tags"])
  }
};
</script>


<style>
.newQuestion h2 {
  color: black;
}

.frmQuestion {
  margin: 50px 0px 0px 0px;
}

#frmQuestion {
  padding: 5px;
  width: 100%;
  text-align: left;
}

#frmQuestion .text {
  
  color: black;
}

#frmQuestion .btn {
  float: right;
  color: white;
}

#img {
  color: black;
}
</style>
