<template>
  <b-container fluid>
    <div class="catalog">
      <b-row class="subrow">
        <h2>Explorar Perguntas</h2>
      </b-row>

      <!--BUTTONS -->
      <b-row class="subrow row1">
        <!-- FILTER -->
        <b-col id="filter" md="6" class="d-flex filter">
          <b-button :pressed.sync="topClicked" id="topQuestions" class="btn text">Destaques</b-button>
          <b-button :pressed.sync="lockedClicked" id="lockedQuestions" class="btn">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </b-button>
          <b-button :pressed.sync="unlockedClicked" id="unlockedQuestions" class="btn">
            <i class="fa fa-unlock" aria-hidden="true"></i>
          </b-button>
        </b-col>

        <!-- NEW QUESTION -->
        <b-col id="newQuestion" md="6" class="d-flex flex-row-reverse align-self-end">
          <router-link :to="{ name: 'newQuestion' }">
            <b-button class="btn text">Nova Pergunta</b-button>
          </router-link>
        </b-col>
      </b-row>

      <!-- QUESTIONS -->
      <b-row class="subrow">
        <b-col md="12" v-for="question in showQuestions" :key="question.id" class="question">
          <b-row>
            <b-col md="1" class="questionDetails">
              <b-button id="followBtn" @click="follow(question.id)">
                <i class="fa fa-heart" :style="checkUserFollower(getFollowersByQuestionId(question.id)) ? 'color: rgb(255, 111, 135) !important;' : ''" style="color: white !important;"></i>
              </b-button>
            </b-col>
            <b-col>
              <router-link :to="{ name: 'question', params: { id: question.id } }">
                <b-row>
                  <b-col md="8" class="text-left questionDetails">
                    <h5>{{ question.title }}</h5>
                  </b-col>
                  <b-col md="3" class="text-left questionDetails">
                    <i class="fa fa-long-arrow-alt-up"></i>
                    <p>&nbsp;{{ question.upvote.length }}</p>
                    <i class="fa fa-long-arrow-alt-down"></i>
                    <p>&nbsp;{{ question.downvote.length }}</p>
                    <i class="fa fa-eye"></i>
                    <p>&nbsp;{{ question.view }}</p>
                  </b-col>
                  <b-col md="1" class="text-left questionDetails">
                    <i v-if="question.status === 'locked'" class="fa fa-lock" aria-hidden="true"></i>
                    <i v-else class="fa fa-unlock" aria-hidden="true"></i>
                  </b-col>
                </b-row>
              </router-link>
            </b-col>
          </b-row>
          <!--<b-row>
            <b-col
              md="12"
              v-for="course in courses"
              :key="course.id"
              class="text-left questionCourse"
            >
              <router-link :to="{ name: '', params: { } }">
                <p v-if="question.idCourse === course.id">{{ course.course }}</p>
              </router-link>
            </b-col>
          </b-row>
          <b-row class="orange">
            <b-col md="12" v-for="tag in tags" :key="tag.id" class="text-left yellow">
              <router-link :to="{ name: '', params: { } }">
                <p v-if="question.idTags === tag.id">{{ tag.tag }}</p>
              </router-link>
            </b-col>
          </b-row>-->
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "catalog",
  data: function() {
    return {
      loggedUser: 0,
      tempCourses: [],
      tempQuestions: [],
      sortedQuestions: [],
      tempStatus: [],
      tempUnlocked: [],
      topClicked: false,
      lockedClicked: false,
      unlockedClicked: false,
      questionStatus: "",

      /********/
      tempLoggedId: 0,
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    //this.tempsortedQuestionsCourses = this.$store.getters.checkCourseLabel;
    this.tempQuestions = this.getQuestions;
    this.sortedQuestions = this.tempQuestions;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );
  },
  methods: {
    follow(questionId) {
      let newFollower = {
        user: this.tempLoggedId,
        question: questionId
      };
      console.log(newFollower)
      this.$store.dispatch("edit_question_follower", newFollower);
    },
    checkUserFollower(followers) {
      for (let i = 0; i < followers; i++) {
        if (this.tempLoggedId == followers[i]) {
          return true;
        } else {
          return false;
        }        
      }
    }
  },
  computed: {
    ...mapGetters([
      "getQuestions",
      "getTags",
      "getCourses",
      "getQuestionsByStatus",
      "getFollowersByQuestionId"
    ]),
    showQuestions() {
      if (this.lockedClicked) {
        this.unlockedClicked = false;
        this.questionStatus = "locked";
      } else if (this.unlockedClicked) {
        this.lockedClicked = false;
        this.questionStatus = "unlocked";
      } else {
        this.questionStatus = "";
      }
      console.log("this.questionStatus   " + this.questionStatus);
      console.log("this.lockedClicked   " + this.lockedClicked);
      console.log("this.unlockedClicked   " + this.unlockedClicked);

      if (this.topClicked && this.questionStatus == "") {
        this.sortedQuestions = [...this.sortedQuestions].sort(
          orderQuestionsByAnswers
        );
      } else if (this.topClicked && this.questionStatus != "") {
        this.tempStatus = this.getQuestionsByStatus(this.questionStatus);
        this.sortedQuestions = [...this.tempStatus].sort(
          orderQuestionsByAnswers
        );
      } else if (this.lockedClicked || this.unlockedClicked) {
        this.tempStatus = this.getQuestionsByStatus(this.questionStatus);
        this.sortedQuestions = [...this.tempStatus].sort(
          orderQuestionsByAnswers
        );
      } else {
        this.tempStatus = [];
        this.sortedQuestions = this.tempQuestions;
      }

      return this.sortedQuestions;

      /*
      console.log(this.tempStatus)
        if (this.questionStatus = "locked")
          this.sortedQuestions =  [...this.tempStatus].sort(orderQuestionsByAnswers);
        }        
        else if (this.unlockedClicked) {
          this.sortedQuestions =  [...this.tempStatus].sort(orderQuestionsByAnswers);
        }
      }      
      else if (this.lockedClicked || this.unlockedClicked) {
        this.sortedQuestions =  [...this.tempStatus].sort(orderQuestionsByAnswers);
      }      
      else {
        this.sortedQuestions =  this.tempQuestions;
      }

        /*if (!this.lockedClicked || !this.unlockedClicked) {
          if (this.lockedClicked) {
            this.tempStatus = this.getQuestionsByStatus("locked");
            this.sortedQuestions = this.tempStatus;
            this.unlockedClicked = false;
          } else if (this.unlockedClicked) {
            this.lockedClicked = false;
            this.tempStatus = this.getQuestionsByStatus("unlocked");
            this.sortedQuestions = this.tempStatus;
          }
        }*/
    }
  }
};

function orderQuestionsByAnswers(a, b) {
  if (a.answers.length < b.answers.length) return 1;
  else if (a.answers.length > b.answers.length) return -1;
  else return 0;
}
</script>



<style>
.catalog h2, .catalog h5, .catalog p, .catalog .fa {
  color: white;
}

.catalog p {
  display: inline-block;
  margin-right: 6px;
}

.row1 {
  margin-bottom: 25px;
}

.fa-long-arrow-alt-up {
  color: rgb(29, 175, 102) !important;
}

.fa-long-arrow-alt-down {
  color: rgb(187, 5, 5) !important;
}

.fa-heart:hover {
  color: rgb(255, 111, 135) !important;
}

#filter,
#newQuestion {
  margin: 0px;
}

.filter {
  padding: 5px 0px;
  margin-right: 15px;
}

#filter .btn {
  padding: 5px 0px;
  margin: 50px 15px 0px 0px;
}

#filter .text {
  padding: 5px;
}

#filter i {
  padding: 0px 10px;
  color: white;
}

#newQuestion b-button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.questionCourse {
  font-size: 12px;
  padding-left: 50px !important;
}

.question {
  margin: 5px 0px !important;
  border-bottom: 0.5px solid grey;
}

.questionDetails {
  padding: 0px;
}

#followBtn {
  background-color: transparent;
  margin: 0px;
  padding-top: 0px;
}
</style>
