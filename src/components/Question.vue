<template>
  <b-container fluid>
    <div class="middle questionPage">
      <!-- QUESTION TITLE -->
      <b-row class="subrow questionInfo">
        <h2>{{ question.title }}</h2>
        <div id="lock" v-if="question.userId == tempLoggedId">
          <div v-if="question.status == 'unlocked'">
            <b-button class="btn">
              <i @click="edit_question_status(question.id)" class="fa fa-unlock" aria-hidden="true"></i>
            </b-button>
          </div>
          <div v-if="question.status == 'locked'">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </div>
        </div>
      </b-row>

      <!-- DIVISION BAR -->
      <b-row id="divisionBarQuestion" class="yellow"></b-row>

      <!-- QUESTION INFO -->
      <b-row class="subrow rowsInfo">
        <b-col md="12">
          <!-- QUESTION VOTES -->
          <b-row>
            <b-col md="1" class="votes">
              <b-row class="voteBtn">
                <b-button class="upBtn" @click="upvote(question.id)">
                  <i
                    class="fa fa-angle-up fa-lg"
                    :style="checkVote(question.upvote) ? 'color: rgb(29, 175, 102) !important;' : 'color: rgb(177, 177, 177) !important;'"
                  ></i>
                </b-button>
                <p>{{ question.upvote.length }}</p>
              </b-row>
              <b-row class="voteBtn">
                <b-button class="downBtn" @click="downvote(question.id)">
                  <i
                    class="fa fa-angle-down fa-lg"
                    :style="checkVote(question.downvote) ? 'color: rgb(187, 5, 5) !important;' : 'color: rgb(177, 177, 177) !important;'"
                  ></i>
                </b-button>
                <p>{{ question.downvote.length }}</p>
              </b-row>
              <b-row class="followBtn">
                <b-button class="likeBtn">
                  <i class="fa fa-heart fa-lg"></i>
                </b-button>
              </b-row>
            </b-col>

            <b-col md="11">
              <!-- QUESTION CONTENT -->
              <b-row class="content">
                <p>{{ question.description }}</p>
              </b-row>
              <b-row class="d-flex flex-row-reverse">
                <!-- USER DATA -->
                <b-col md="4" class="userData">
                  <!--<b-row>
                  <b-col md="12">
                    <p>XXXX horas</p>
                  </b-col>
                  </b-row>-->
                  <b-row>
                    <b-col md="4" class="mt-3">
                      <img :src="questionUser.profilePic" alt="pic.png">
                    </b-col>
                    <b-col md="8" class="mt-2">
                      <p>{{ questionUser.name }}</p>
                      <p>Lvl {{ getLevelById(questionUser.gameElements.level).id }} - {{ getLevelById(this.questionUser.gameElements.level).label }}</p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- ANSWERS AMOUNT -->
      <b-row id="answersTab" class="subrow rowsInfo">
        <h5>{{answers.length}} Respostas</h5>
      </b-row>

      <!-- DIVISION BAR -->
      <b-row
        id="divisionBarQuestion"
        class="yellow"
        :style="answers.length == 0 ? 'margin: 200px;' : ''"
      ></b-row>

      <!-- ANSWERS LIST -->
      <b-row v-for="answer in answers" :key="answer.id" class="subrow rowsInfo">
        <b-col md="12">
          <!-- ANSWER VOTES -->
          <b-row>
            <b-col md="1" class="votes">
              <b-row class="voteBtn">
                <b-button class="upBtn">
                  <i class="fa fa-angle-up fa-lg"></i>
                </b-button>
                <p>{{answer.upvote}}</p>
              </b-row>
              <b-row class="voteBtn">
                <b-button class="downBtn">
                  <i class="fa fa-angle-down fa-lg"></i>
                </b-button>
                <p>{{answer.downvote}}</p>
              </b-row>
            </b-col>

            <b-col md="11">
              <!-- ANSWER CONTENT -->
              <b-row class="content">
                <p>{{ answer.answer }}</p>
              </b-row>
              <b-row class="d-flex flex-row-reverse">
                <!-- USER DATA -->
                <b-col md="4" class="userData">
                  <!--<b-row>
                  <b-col md="12">
                    <p>XXXX horas</p>
                  </b-col>
                  </b-row>-->
                  <b-row>
                    <b-col md="4" class="mt-3">
                      <img :src="getUserById(answer.userId).profilePic" alt="pic.png">
                    </b-col>
                    <b-col md="8" class="mt-2">
                      <p>{{ getUserById(answer.userId).name }}</p>
                      <p>Lvl {{ getLevelById(getUserById(answer.userId).gameElements.level).id }} - {{ getLevelById(getUserById(answer.userId).gameElements.level).label }}</p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <div v-if="question.status == 'unlocked'">
        <!-- NEW ANSWER -->
        <b-row class="subrow rowsInfo">
          <h5>A tua resposta</h5>
        </b-row>

        <!-- DIVISION BAR -->
        <b-row id="divisionBarQuestion" class="yellow"></b-row>

        <!-- WRITE NEW ANSWER -->
        <b-row id="newAnswer" class="subrow rowsInfo">
          <b-col md="12">
            <b-form id="frmAnswer">
              <b-form-group>
                <b-form-textarea
                  id="inputAnswer"
                  v-model="form.newAnswer"
                  :rows="3"
                  :max-rows="100"
                  required
                ></b-form-textarea>
              </b-form-group>

              <b-button @click="addAnswer()" class="btn" type="button">Publicar</b-button>
            </b-form>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "question",
  data: function() {
    return {
      loggedUser: 0,
      question: {},
      questionUser: {},
      answers: [],
      form: {
        newAnswer: ""
      },
      tempQuestionId: 0,

      /********/
      tempLoggedId: 0
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.tempQuestionId = this.$route.params.id;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );

    this.answers = this.getAnswersByQuestionId(this.tempQuestionId);
    this.question = this.getQuestionById(this.tempQuestionId);
    this.questionUser = this.getUserById(this.question.userId);
  },
  methods: {
    ...mapActions(["edit_question_status"]),
    upvote(question) {
      let tempParams = {
        question: question,
        user: this.tempLoggedId
      };
      if (!this.checkVote(this.question.upvote)) {
        this.$store.dispatch("edit_question_upvote", tempParams);
      }
    },
    downvote(question) {
      let tempParams = {
        question: question,
        user: this.tempLoggedId
      };
      if (!this.checkVote(this.question.downvote)) {
        this.$store.dispatch("edit_question_downvote", tempParams);
      }
    },
    checkVote(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == this.tempLoggedId) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkAnswer(field) {
      let error = "";
      if (field) {
        error = "Os dados estão incompletos";
      }
      return error;
    },
    answerValidation() {
      let valid = false;
      if (!this.checkAnswer(this.form.newAnswer) == "") {
        valid = true;
      } else {
        valid = false;
      }
      return {
        valid: valid,
        msg: this.checkAnswer(this.form.newAnswer)
      };
    },
    addAnswer() {
      let newAnswer = {
        id: this.getAnswerLastId(this.tempQuestionId),
        userId: this.loggedUser,
        date: this.$store.getters.getTodaysDate,
        answer: this.form.newAnswer,
        upvote: 0,
        downvote: 0
      };
      let tempParams = {
        newAnswer: newAnswer,
        questionId: this.tempQuestionId
      };

      if (this.answerValidation().valid) {
        this.$store.dispatch("set_answer", tempParams);
        alert("Registo efetuado com sucesso");
      } else {
        alert(this.answerValidation().msg);
      }
    }
  },
  computed: {
    ...mapGetters([
      "getQuestions",
      "getUsers",
      "getCourses",
      "getQuestionById",
      "getUserById",
      "getAnswersByQuestionId",
      "getLevelById"
    ])
  }
};
</script>


<style>
.questionPage h2,
.questionPage h5,
.questionPage p,
.questionPage .fa {
  color: white;
}

.rowsInfo {
  padding: 20px !important;
}

.upBtn,
.downBtn,
.likeBtn {
  background-color: transparent;
  color: rgb(177, 177, 177) !important;
}

.upBtn:hover {
  background-color: transparent;
  color: rgb(29, 175, 102) !important;
}

.downBtn:hover {
  background-color: transparent;
  color: rgb(187, 5, 5) !important;
}

.likeBtn:hover {
  background-color: transparent;
  color: rgb(255, 174, 0) !important;
}

.voteBtn .btn,
.voteBtn p,
.followBtn .btn,
.followBtn p {
  padding: 0px 5px;
  margin: 2px 0px;
  text-align: center;
  display: inline-block;
}

.votes {
  padding: 5px 15px;
}

.content {
  text-align: left !important;
  padding: 15px;
  background-color: white;
  border-radius: 5px;
}

.content p {
  color: black;
}

.userData {
  background-color: #ffd150;
  margin: 15px 0px 0px 0px;
  padding-bottom: 15px;
  font-size: 13px;
  border-radius: 5px;
}

.userData p {
  float: right;
  margin: 10px 0px 0px 0px;
  color: black;
}

.userData img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  padding: 0px;
  margin: 0px;
}

#answersTab h5 {
  margin-bottom: 0px;
}

#newAnswer .form-control {
  border: 1px solid grey !important;
}

#newAnswer .btn {
  float: right;
}

#lock {
  margin: 35px 0px 0px 15px;
}

#lock .btn {
  margin: 0px;
  padding: 0px;
  background-color: transparent;
}
</style>
