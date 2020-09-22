<template>
  <div class="home">
    <div class="welcome-text">
      <h1>Welcome!</h1>
    </div>
    <Carousel class="carousel-comp" @next="next" @prev="prev">
      <CarouselSlide
        class="carousel-slide-comp"
        v-for="(slide, index) in slides"
        :key="slide"
        :index="index"
        :visibleSlide="visibleSlide"
        :direction="direction"
      >
        <img class="slide-img" :src="slide" />
      </CarouselSlide>
    </Carousel>
    <div class="about-div">
      <div class="about-text">
        <h1>About us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          blanditiis saepe fuga ducimus reprehenderit nihil quidem architecto
          corrupti hic aut. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Sunt placeat nulla tempora, ad fuga rem quos necessitatibus a
          quam culpa tenetur praesentium iure voluptatem architecto atque
          inventore voluptas sed aliquam?
        </p>
      </div>
    </div>
    <div class="login" v-if="showLogin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-x"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#00263b"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        @click="hideLogDiv"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <form @submit.prevent="loginUser()">
        <h1>Login</h1>
        <input type="email" name="loginEmail" placeholder="Enter your email" v-model="loginEmail"/>
        <input type="password" name="loginPass" placeholder="Enter your password" v-model="loginPass"/>
        <input type="submit" value="Login" />
      </form>
    </div>
    <div class="register" v-if="showRegister">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-x"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#00263b"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        @click="hideRegisterDiv"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <form @submit.prevent="registerUser()">
        <h1>Register</h1>
        <input type="text" name="regName" placeholder="Enter your name" v-model="regName">
        <input type="email" name="regEmail" placeholder="Enter your email" v-model="regEmail"/>
        <input type="password" name="regPass" placeholder="Enter your password" v-model="regPass"/>
        <input type="submit" value="Register" />
      </form>
    </div>
    <div :class="{overlay: showLogin || showRegister}"></div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Carousel from '@/components/Carousel';
import CarouselSlide from '@/components/CarouselSlide';

export default {
  name: 'Home',
  data() {
    return {
      slides: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
        'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg',
        'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg',
      ],
      visibleSlide: 0,
      direction: 'left',
      regName: '',
      regEmail: '',
      regPass: '',
      loginEmail: '',
      loginPass: ''
    };
  },
  computed: {
    ...mapGetters(['showLogin', 'showRegister']),
    slidesLen() {
      return this.slides.length;
    },
  },
  methods: {
    ...mapActions(['hideLoginForm', 'hideRegisterForm', 'register', 'login']),
    registerUser() {
      const newUser = {
        name: this.regName,
        email: this.regEmail,
        password: this.regPass
      };

      this.register(newUser)
        .then(res => {
          if(res.data.success) {
            this.$router.push('/');
          }
        });
      this.hideRegisterForm();
    },
    loginUser() {
      const user = {
        email: this.loginEmail,
        password: this.loginPass
      };

      this.login(user)
      .then(res => {
        if(res.data.success) {
          this.$router.push('/profile');
        }
      }).catch(err => {
        console.log(err)
      });

      this.hideLoginForm();
    },
    hideLogDiv() {
      this.hideLoginForm();
    },
    hideRegisterDiv() {
      this.hideRegisterForm();
    },
    next() {
      if (this.visibleSlide >= this.slidesLen - 1) {
        this.visibleSlide = 0;
      } else {
        this.visibleSlide++;
      }
      this.direction = 'left';
    },
    prev() {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slidesLen - 1;
      } else {
        this.visibleSlide--;
      }
      this.direction = 'right';
    },
    updateSlide() {
      setInterval(() => {
        this.visibleSlide++;
        if (this.visibleSlide >= this.slidesLen) {
          this.visibleSlide = 0;
        }
      }, 5000);
    }
  },
  components: {
    Carousel,
    CarouselSlide,
  },
  mounted() {
    this.updateSlide();
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: auto;
  .welcome-text {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
      font-size: 5rem;
      color: $primary-color;
      text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
    }
  }

  .carousel-comp {
    width: 100%;
    height: 100vh;

    .carousel-slide-comp {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .about-div {
    width: 100%;
    height: 100vh;
    background-color: $third-color;

    .about-text {
      box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.5);
      width: 70%;
      padding: 40px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $bg-color;

      h1 {
        text-align: center;
      }
    }
  }

  .login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: $primary-color;
    width: 50%;
    height: 50vh;
    animation: scalingForm 0.5s linear;
    border-radius: 24px;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      h1 {
        font-size: 3rem;
      }

      input {
        width: 60%;
        padding: 10px 15px;
        border: none;
        font-size: 1.2rem;
        border-radius: 12px;
      }

      input[type="submit"] {
        background-color: $secondary-color;
        color: $bg-color;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out all;

        &:hover {
          background-color: $third-color;
        }
      }
    }

    svg {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }

  .register {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: $primary-color;
    width: 50%;
    height: 50vh;
    border-radius: 24px;
    animation: scalingForm 0.5s linear;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      h1 {
        font-size: 3rem;
      }

      input {
        width: 60%;
        padding: 10px 15px;
        border: none;
        font-size: 1.2rem;
        border-radius: 12px;
      }

      input[type="submit"] {
        background-color: $secondary-color;
        color: $bg-color;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out all;

        &:hover {
          background-color: $third-color;
        }
      }
    }

    svg {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  @keyframes scalingForm {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
