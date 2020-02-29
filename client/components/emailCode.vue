<template>
  <!-- 发送邮件通用组件，功能：发送邮箱验证码、验证用户填的验证码是否正确 -->
  <div class="emailCode">
    <h1>输入邮箱验证码</h1>
    <p>
      我们已给邮箱
      <span class="email">{{email}}</span>发送了一个6位数验证码。
    </p>
    <ul class="number">
      <template v-for="key in Object.keys(code)">
        <li :key="key">
          <input
            type="tel"
            class="text"
            :ref="key"
            v-model="code[key]"
            :class="{'fill':code[key]!=''}"
            maxlength="1"
          />
        </li>
      </template>
    </ul>
    <p class="left" :class="{resend:time==0}" @click="reSend">
      重新发送
      <span v-show="time!=0">({{time}}s)</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    // 邮箱
    email: {
      type: String,
      default: ""
    },
    // 是否可以发送验证码，如果为true，则发送验证码
    canSend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: 60, // 验证码倒计时默认60s
      code: {
        //验证码
        firstNum: "", //验证码第一个数
        secondNum: "", //验证码第二个数
        thirdNum: "", //验证码第三个数
        fourthNum: "", //验证码第四个数
        fiveNum: "", //验证码第五个数
        sixNum: "" //验证码第六个数
      }
    };
  },
  computed: {
    //用户填写的验证码
    validcode() {
      return `${this.code.firstNum}${this.code.secondNum}${this.code.thirdNum}${this.code.fourthNum}${this.code.fiveNum}${this.code.sixNum}`;
    }
  },
  created() {
    this.canSend && this.sendMessage();
  },
  methods: {
    //发送验证码到用户的邮箱
    async sendMessage() {
      this.clearCode(); // 先清空所填的验证码
      this.startInterval(); // 开始计时
      this.$nextTick(() => {
        // 第一个数字框聚焦
        this.$refs.firstNum[0].focus();
      });
      // 请求后台，发送验证码
      const { code, message } = await this.$http.post("/user/sendEmail", {
        email: this.email
      });
      if (code == 0) {
        this.$message.success(message);
      } else {
        this.$message.error(message);
      }
    },
    //开始计时
    startInterval() {
      this.time = 60;
      const interval = setInterval(() => {
        this.time--;
        if (this.time == 0 || this.showPage == 1) {
          clearInterval(interval);
        }
      }, 1000);
    },
    //超时再次发送验证码到用户的手机
    reSend() {
      this.time == 0 && this.sendMessage(); // 发送验证码到用户的邮箱
    },
    //清空所填的验证码
    clearCode() {
      Object.keys(this.code).map(key => {
        this.code[key] = "";
      });
    },
    //验证用户填写的验证码
    async validate() {
      const { code, message } = await this.$http.post("/user/checkValidCode", {
        email: this.email,
        validcode: this.validcode
      });
      if (code == 0) {
        this.$message.success(message);
        this.$emit("finish");
      } else {
        this.$message.error(message);
      }
    }
  },
  watch: {
    "code.firstNum": function(val) {
      val != "" && this.$refs.secondNum[0].focus();
    },
    "code.secondNum": function(val) {
      val != "" && this.$refs.thirdNum[0].focus();
    },
    "code.thirdNum": function(val) {
      val != "" && this.$refs.fourthNum[0].focus();
    },
    "code.fourthNum": function(val) {
      val != "" && this.$refs.fiveNum[0].focus();
    },
    "code.fiveNum": function(val) {
      val != "" && this.$refs.sixNum[0].focus();
    },
    "code.sixNum": function(val) {
      val != "" && this.validate();
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
.emailCode {
  h1 {
    font-size: 1.8rem;
  }
  p {
    margin-top: 2rem;
    width: 96%;
    color: #666;
    letter-spacing: 1px;
    line-height: 1.5rem;
    span.email {
      color: orange;
    }
    &.left {
      color: #ccc;
    }
    &.resend {
      color: #1e90ff;
      cursor: pointer;
    }
  }
  ul {
    margin: 1rem 0;
    li {
      background: #eee;
      width: 2.5rem;
      margin-right: 1.2rem;
      float: left;
      input {
        width: 100%;
        text-align: center;
        border-bottom: 2px solid #ccc;
        &.fill {
          border-bottom: 2px solid #666;
        }
      }
    }
  }
}
</style>