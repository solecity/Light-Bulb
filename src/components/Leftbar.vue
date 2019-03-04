<template>
  <nav id="leftbar">
    <ul class="list-unstyled components">
      <li>
        <router-link :to="{ name: 'home' }" :class="{ 'nav-link': true }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'courses' }" :class="{ 'nav-link': true }">Unidades Pedagógicas</router-link>
        <ul id="signInUnits">
          <li v-for="unit in userUnits" :key="unit.id">{{ unit.name }}</li>
        </ul>
      </li>
    </ul>
  </nav>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "courses",
  data: function() {
    return {
      loggedUser: 0,
      tempIds: [],

      /********/
      tempLoggedId: 0
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
    ...mapGetters(["getUsers", "getCourses", "getUnitsByUserId", "getUnitByCourseId"]),

    userUnits() {
      this.tempIds = this.getUnitsByUserId(this.tempLoggedId);
      let tempUserUnits = []

      for (let i = 0; i < this.tempIds.length; i++) {
        let tempUnit = {
          id: this.tempIds[i].unitId,
          name: this.getUnitByCourseId(this.tempIds[i].courseId, this.tempIds[i].unitId),
          courseId: this.tempIds[i].courseId
        }
        tempUserUnits.push(tempUnit);
      }
      return tempUserUnits
    }
  }
};
</script>


<style>
#leftbar {
  height: 700px;
  overflow: hidden;
  padding-right: 20px;
}

#leftbar ul {
  padding-top: 50px;
}

#leftbar li {
  border-bottom: 0.5px solid #ffd050ad;
}

#leftbar a {
  text-align: left;
  text-decoration: none;
  color: white;
}

#signInUnits {
  padding-top: 0px !important;
  text-align: left;
  font-size: 14px;
}

#signInUnits li {
  color: white;
}
</style>
