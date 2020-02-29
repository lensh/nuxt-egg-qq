<template>
  <!-- 消息 -->
  <div class="wrapper">
    <ul>
      <li class="message" v-for="item in dataList">
        <img :src="item.face" />
        <div class="info">
          <p class="from">
            {{item.from_user}}
            <span>{{item.time}}</span>
          </p>
          <p class="message">{{item.message}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "message",
  data() {
    return {
      dataList: []
    };
  },
  created() {}
};
</script>

<style scoped lang="scss" type="text/css">
ul {
  cursor: pointer;
  width: 100%;
  background: #fff;
}
ul li {
  border-bottom: 1px solid #eee;
  height: 60px;
  line-height: 60px;
  padding: 4px 10px;
  font-size: 0;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    vertical-align: middle;
  }
  .info {
    font-size: 16px;
    line-height: 24px;
    display: block;
    position: relative;
    width: 100%;
    left: 18px;
    p.from {
      span {
        color: #666;
        float: right;
        font-size: 13px;
        position: absolute;
        right: 30px;
      }
    }
    p.message {
      color: #666;
      width: 64%;
      font-size: 14px;
      overflow: hidden; /*内容超出后隐藏*/
      text-overflow: ellipsis; /*当文本溢出时显示省略标记(...)*/
      white-space: nowrap; /*文本不换行*/
      word-break: keep-all;
      span {
        border-radius: 50%;
        width: 22px;
        height: 22px;
        position: absolute;
        background: red;
        color: white;
        right: 30px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
ul li:first-child {
  height: 42px;
  line-height: 42px;
  border: none;
  margin-top: 2px;
}
</style>
