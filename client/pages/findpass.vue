<template>
  <div class="wrapper">
    <div class="top" @click="goback">返回</div>
    <div class="main">
      <!-- 第一页,填写邮箱 -->
      <div class="first" v-show="showPage==1">
        <h1>输入要找回密码的邮箱</h1>
        <div class="email">
          <input type="text" class="text" v-model="email" ref="email" />
          <img src="~assets/images/fhz.png" @click="email=''" v-show="isShowEmailX" />
          <input
            type="button"
            class="btn"
            value="下一步"
            @click="showSecondPage"
            :class="{enable:isEnable}"
            :disabled="!isEnable"
          />
        </div>
      </div>

      <!-- 第二页,填写邮箱验证码 -->
      <template v-if="showPage==2">
        <emailCode :email="email" :canSend="canSend" @finish="showThirdPage"></emailCode>
      </template>

      <!-- 第三页,修改密码 -->
      <div class="third" v-show="showPage==3">
        <h1>修改密码</h1>
        <div class="password">
          <input type="password" class="text" v-model="password" ref="password" placeholder="新密码" />
          <img src="~assets/images/fhz.png" @click="password=''" v-show="isShowPwdX" />
          <input type="button" class="btn enable" value="确认修改" @click="findpass" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "../tool/util";
import emailCode from "~/components/emailCode";
export default {
  name: "findpass",
  data() {
    return {
      email: "", //用户填的邮箱
      password: "", // 用户的密码
      showPage: 1, //默认显示第一页
      canSend: false // 是否可以发送验证码
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  computed: {
    //是否显示邮箱里的X图标
    isShowEmailX() {
      return this.email !== "";
    },
    //邮箱是否合法,对应下一步是否可以点击
    isEnable() {
      return Util.checkEmail(this.email);
    },
    // 是否显示密码里的X图标
    isShowPwdX() {
      return this.password !== "";
    }
  },
  methods: {
    // 返回
    goback() {
      this.showPage == 1 ? this.$router.back() : this.showPage--;
    },
    // 展示第二页
    async showSecondPage() {
      if (this.isEnable) {
        // 请求后台找回密码接口
        const { code, message } = await this.$http.post("/user/checkemail", {
          email: this.email
        });
        if (code == 0) {
          this.showPage = 2; //展示第二页
          this.canSend = true; // 可以发送验证码
        } else {
          this.$message.error(message);
        }
      }
    },
    // 展示第三页
    showThirdPage() {
      this.showPage = 3; // 切换到第三页
      this.canSend = false; // 不可以发送验证码
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 注册
    async findpass() {
      // 请求后台找回密码接口
      const { code, message } = await this.$http.post("/user/findpass", {
        email: this.email,
        password: Util.encrypt(this.password)
      });
      if (code == 0) {
        this.$message.success(message);
        this.$router.push("/login");
      } else {
        this.$message.error(message);
      }
    }
  },
  components: {
    emailCode
  }
};
</script>

<style scoped lang="scss" type="text/css">
.top {
  background: url("../assets/images/fas.png") no-repeat left center;
  width: 100%;
  line-height: 4rem;
  margin: 2.2rem 1.2rem;
  color: #666;
  text-indent: 1.5em;
  cursor: pointer;
}
.main {
  margin: 2rem 1rem;
  h1 {
    font-size: 1.8rem;
  }
}
.first,
.third {
  p {
    margin-top: 2rem;
    span {
      color: #1e90ff;
      cursor: pointer;
    }
  }

  .email,
  .password {
    input.text {
      font-size: 1.3rem;
      width: 92%;
      margin-top: 1.5rem;
      box-sizing: content-box;
    }
    img {
      width: 1.3rem;
      position: relative;
      right: 1rem;
    }
  }
  input.btn {
    margin-top: 3rem;
    width: 95%;
    line-height: 32px;
    background: #ccc;
    color: white;
    cursor: not-allowed;
    &.enable {
      background: #1e90ff;
      cursor: pointer;
    }
  }
}
</style>