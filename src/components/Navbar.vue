<template>
  <nav class="navbar">
    <h1>
      <router-link to="/" class="home-link">Logo</router-link>
    </h1>
    <ul class="nav-list">
      <li>
        <router-link class="nav-link" to="/recipes">All recipes</router-link>
      </li>
      <li v-if="$route.path == '/' && !isLoggedIn" class="nav-btns" @click="showLogDiv">
        Login
      </li>
      <li v-if="$route.path == '/' && !isLoggedIn" class="nav-btns" @click="showRegisterDiv">
        Register
      </li>
      <li v-if="isLoggedIn">
        <router-link class="nav-link" to="/profile">
          Profile
        </router-link>
      </li>
      <li v-if="isLoggedIn">
        <a class="nav-link" to="/logout" @click.prevent="logoutUser()">
          Logout
        </a>
      </li>
    </ul>
    <div class="menu-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-menu-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#607D8B"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions(['showLoginForm', 'showRegisterForm', 'logout', 'getProfile']),
    showLogDiv() {
      this.showLoginForm()
    },
    showRegisterDiv() {
      this.showRegisterForm()
    },
    logoutUser() {
      this.logout();
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $primary-color;

  h1 {
    font-size: 1.8rem;
    margin-left: 20px;

    .home-link {
      color: $bg-color;
      text-decoration: none;
    }

    .router-link-exact-active {
      color: $secondary-color;
    }
  }

  .nav-list {
    display: flex;
    list-style-type: none;

    li {
      margin: 0px 20px;

      .nav-link {
        color: $bg-color;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 12px;
        transition: 0.3s ease-out all;

        &:hover {
          background-color: $secondary-color;
        }
      }

      .router-link-exact-active {
        color: $secondary-color;
      }
    }

    .nav-btns {
      color: $bg-color;
      border-radius: 12px;
      cursor: pointer;
      transition: 0.3s ease-out all;

      &:hover {
        color: $secondary-color;
      }
    }
  }

  .menu-btn {
    display: none;
  }
}

@media (max-width: 600px) {
  .navbar {
    .menu-btn {
      display: block;
    }
  }
}
</style>
