<template>
  <nav id="rightbar">
    <ul class="list-unstyled components">
      <li>
        <p>TAGS</p>
      </li>
    </ul>

    <h6>Top utilizadores</h6>
    <table class="table">
      <tbody>
        <tr v-for="(user, index) in topUsers" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <img :src="user.profilePic" id="profilePic" alt="logo.png" height="40">
            {{ user.name }}
          </td>
          <td>{{ user.reputation }}</td>
        </tr>
      </tbody>
    </table>
  </nav>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "rightbar",
  data: function() {
    return {
      loggedUser: 0,
      tempUsers: [],
      topUsers: [],

      /********/
      tempLoggedId: 0
    };
  },
  created() {
    this.loggedUser = this.$store.state.loggedUser;
    this.tempUsers = this.getUsers;

    /********/
    this.tempLoggedId = parseInt(
      JSON.parse(localStorage.getItem("loggedUser"))
    );
    
    this.showTopUsers();
  },
  methods: {
    showTopUsers() {
      let questions = this.getQuestions;
      let tempArray = []

      this.tempUsers.forEach(user => {
        let reputation = 0;
        questions.forEach(question => {
          if (question.userId === user.id) {
            reputation += question.upvote.length;
            reputation -= question.downvote.length;          
            user.reputation = reputation;
            if(user.reputation >= 0) {
              tempArray.push(user);
            }
          }
        });
      });

      this.topUsers = [...new Set(tempArray)];
      this.topUsers.sort(this.sortByReputation);
    },

    sortByReputation(a, b) {
      if (a.reputation < b.reputation) return 1;
      if (a.reputation > b.reputation) return -1;
      else return 0;
    }
  },
  computed: {
    ...mapGetters(["getUsers", "getQuestions", "getTopUsers"])
  }
};
</script>


<style>
#rightbar {
  overflow: hidden;
  padding: 0px 40px;
  color: white;
  font-size: 13px;
}

#rightbar ul {
  padding-top: 50px;
}

#rightbar li {
  border-bottom: 1px solid #ffd050ad;
}

#rightbar h6 {
  margin-top: 50px;
}

#rightbar img {
  border-radius: 50%;
}

#rightbar .table tbody {
  border-top: none;
  border-bottom: 1px solid #ffd050ad !important;
  text-align: left;
  font-size: 16px;
}
</style>
