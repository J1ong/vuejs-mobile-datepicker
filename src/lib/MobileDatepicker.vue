<template>
  <div id="mobile-datepicker" v-show="showPickerModel" @click.self="handleCancel">
    <div class="mdp_container">
      <!-- 组件头部开始 -->
      <div class="mdp_header">
        <div
          class="mdp_current_year"
          :class="{'active':changeContentFlag}"
          @click="showYearPicker()"
        >{{this.currentYear}}年</div><br/>
        <div
          class="mdp_current_date"
          :class="{'active':!changeContentFlag}"
          @click="showDatePicker()"
        >{{this.currentMonth+1}}月{{this.currentDay}}日周{{this.week}}</div>
      </div>
      <!-- 组件头部结束 -->
      <!-- 组件主体内容开始 -->
      <div class="mdp_content">
        <!-- 组件日期主体内容开始 -->
        <div class="mdp_date_content" v-show="!changeContentFlag">
          <div class="mdp_switch_month">
            <span
              class="mdp_left mdp_arrow"
              :class="{'mdp_arrow_hide':this.startDate-new Date(this.year,this.month,1)>=0}"
              @click="preMonth"
            ></span>
            <span class="mdp_current_month">{{this.year}}年{{this.month+1}}月</span>
            <span
              class="mdp_right mdp_arrow"
              :class="{'mdp_arrow_hide':this.endDate-new Date(this.year,this.month+1,1)<=0}"
              @click="nextMonth"
            ></span>
          </div>
          <div class="mdp_weeks">
            <span class="mdp_week" :class="{'mark':markWeekend&&(index==0||index==6)}" v-for="(item,index) in weeks" :key="index">{{item}}</span>
          </div>
          <div class="mdp_pick_day">
            <span
              class="mdp_day"
              :class="{'active':(item==currentDay&&month==currentMonth)&&!dayIsDisable(item),'mdp_day_disable':dayIsDisable(item),'mark': markWeekend&&dayIsWeekend(index)}"
              v-for="(item,index) in days"
              :key="index"
              @click="handleClickDay(item)"
            >{{item?item:' '}}</span>
          </div>
        </div>
        <!-- 组件年份主体内容结束 -->
        <div class="mdp_year_content" v-show="changeContentFlag">
          <ul ref="mdp_year_list">
            <li
              v-for="(item,index) in years"
              :key="index"
              :class="{'active':item==currentYear}"
              @click="handleClickYear(item)"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <!-- 组件主体内容结束 -->
      <!-- 组件操作按钮开始 -->
      <div class="mdp_operate_button">
        <button class="mdp_cancel_button mdp_button" @click="handleCancel">取消</button>
        <button class="mdp_sure_button mdp_button" @click="handleConfirm">确认</button>
      </div>
      <!-- 组件操作按钮结束 -->
    </div>
  </div>
</template>
 
<script>
export default {
  name: "MobileDatepicker",
  props: {
    showPickerModel: { //控制显隐
      type: Boolean,
      default: false
    },
    defaultDate: {  //默认选中日期
      type: Date,
      default: () => {
        return new Date();
      }
    },
    startDate: {  //可选范围开始日期
      type: Date,
      default: () => {
        return new Date("1900-1-1");
      }
    },
    endDate: {  //可选范围结束日期
      type: Date,
      default: () => {
        return new Date();
      }
    },
    disableDate: { //禁用日期函数
      type: Function
    },
    markWeekend: { //标记周末
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.showPickerModel && this.defaultDate) {  //保证刷新，数据不丢失
      this.initDate(this.defaultDate); //初始化日期
    }
  },
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],  //周几数组
      days: [],  //某年某月的日期数组，如[0,0,1,2,3,4,....,31]
      years: [],  //可选范围的年份数组，如[1991,1992,...,2019]
      monthLastDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],  //某年对应月份最大天数
      year: null,  
      currentYear: null,  
      month: null, 
      currentMonth: null,  
      day: null,  
      currentDay: null,  
      week: null, 
      changeContentFlag: false  //切换主体内容显示为日期或年份
    };
  },
  watch: {
    showPickerModel(newVal, oldVal) { //监测showPickerModel的变动
      if (newVal) {
        //showPickerModel由false变为true
        if (
          this.defaultDate >= this.startDate &&
          this.defaultDate <= this.endDate
        ) {
          //默认时间在起止时间之内
          this.initDate(this.defaultDate); //初始化
        } else {
          this.$emit("cancel"); //触发取消事件
        }
      }
    }
  },
  methods: {
    handleCancel() {
      //处理取消点击
      this.changeContentFlag = false; //关闭年份选择面板
      this.$emit("cancel"); //触发取消事件
    },
    handleConfirm() {
      //处理确认点击
      this.changeContentFlag = false; //关闭年份选择面板
      this.$emit(
        "confirm",
        this.currentYear + "-" + (this.currentMonth + 1) + "-" + this.currentDay
      ); //触发确认事件，参数为选择的日期，如2019-7-7
    },
    initDate(defaultDate) {
      //初始化日期
      this.currentYear = this.year = defaultDate.getFullYear(); //年
      this.currentMonth = this.month = defaultDate.getMonth(); //月
      this.currentDay = this.day = defaultDate.getDate(); //日
      this.week = this.weeks[defaultDate.getDay()]; //周
      this.years = [];
      for (
        let i = 0;
        i <= this.endDate.getFullYear() - this.startDate.getFullYear();
        i++
      ) {
        this.years.push(Number(this.startDate.getFullYear()) + i); //初始化年份列表
      }
      this.updateDate(this.year, this.month); //根据年月更新日期
    },
    updateDate(year, month) {
      //根据年月更新日期
      this.monthLastDay[1] = 28; //平年
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        //闰年
        this.monthLastDay[1] = 29; //2月有29天
      }
      let firstDay = new Date(year, month, 1).getDay(); //根据年月获取第一天是周几
      this.days = [];
      for (let i = 0; i < firstDay; i++) {
        this.days.push(0); //往第一天前面补0，如第一天周二，则需前面补2个0
      }
      for (let j = 1; j <= this.monthLastDay[month]; j++) {
        this.days.push(j); //补完0后，根据该月最大的天数，从累加，如1,2,3...
      }
    },
    preMonth() {
      //上一个月
      if (this.month == 0) {
        //如果当前月为第一个月，年份减一，月份置十二
        this.year = this.year - 1;
        this.month = 11;
      } else {
        this.month--;
      }
      this.updateDate(this.year, this.month); //根据年月更新日期
    },
    nextMonth() {
      //下一个月
      if (this.month == 11) {
        //如果当前月为最后一个月，年份加一，月份置一
        this.year = this.year + 1;
        this.month = 0;
      } else {
        this.month++;
      }
      this.updateDate(this.year, this.month); //根据年月更新日期
    },
    handleClickDay(item) {
      //处理日期点击事件
      if (
        this.startDate > new Date(this.year, this.month, item) ||
        this.endDate < new Date(this.year, this.month, item) ||
        item == 0
      ) {
        return; //不在指定范围的，属于禁用的日期不做点击处理
      }
      if (
        typeof this.disableDate == "function" &&
        this.disableDate(this.year + "-" + (this.month + 1) + "-" + item)
      ) {
        ////禁用函数存在，符合禁用规则
        return;
      }
      this.currentYear = this.year; //更新到当前点击日期
      this.currentMonth = this.month;
      this.currentDay = this.day = item;
      let date = new Date(this.currentYear, this.currentMonth, this.currentDay);
      this.week = this.weeks[date.getDay()]; //获取更新日期周
    },
    handleClickYear(item) {
      //处理年份点击事件
      if (new Date(item, this.month, this.day) < this.startDate) {
        //超出最小可选日期，置为最小日期
        this.year = this.currentYear = this.startDate.getFullYear();
        this.month = this.currentMonth = this.startDate.getMonth();
        this.day = this.currentDay = this.startDate.getDate();
        this.week = this.weeks[this.startDate.getDay()];
      } else if (new Date(item, this.month, this.day) > this.endDate) {
        //超出最大可选日期，置为最大日期
        this.year = this.currentYear = this.endDate.getFullYear();
        this.month = this.currentMonth = this.endDate.getMonth();
        this.day = this.currentDay = this.endDate.getDate();
        this.week = this.weeks[this.endDate.getDay()];
      } else {
        //更新到当前点击日期
        if (
          typeof this.disableDate == "function" &&
          this.disableDate(
            item + "-" + (this.currentMonth + 1) + "-" + this.day
          )
        ) {
          //禁用函数存在，符合禁用规则
          this.year = item; //更新切换面板年月
          this.updateDate(this.year, this.month); //根据年月更新日期
          this.changeContentFlag = false; //关闭年份选择面板
          return;
        }
        if (
          !((item % 4 == 0 && item % 100 != 0) || item % 400 == 0) &&
          this.currentMonth == 1 &&
          this.currentDay == 29
        ) {
          //从闰年2月29日到平年
          this.year = item; //更新切换面板年月
          this.updateDate(this.year, this.month); //根据年月更新日期
          this.changeContentFlag = false; //关闭年份选择面板
          return;
        }
        this.year = this.currentYear = item;
        this.month = this.currentMonth;
        this.day = this.currentDay; //更新切换面板年月日
        let date = new Date(this.year, this.month, this.day);
        this.week = this.weeks[date.getDay()];
      }
      this.updateDate(this.year, this.month); //根据年月更新日期
      this.changeContentFlag = false; //关闭年份选择面板
    },
    showDatePicker() {
      //显示选择日期面板
      if (this.changeContentFlag) {
        this.changeContentFlag = false;
      }
    },
    showYearPicker() {
      //显示选择年份面板
      if (!this.changeContentFlag) {
        this.changeContentFlag = true;
        let scrollYearListY; //年份列表Y轴上滚动距离
        this.$nextTick(() => {
          //使用nextTick为了保证dom元素都已经渲染完毕
          scrollYearListY =
            (this.currentYear - this.startDate.getFullYear() - 2) *
            this.$refs.mdp_year_list.firstElementChild.offsetHeight;
          scrollYearListY = scrollYearListY < 0 ? 0 : scrollYearListY;
          this.$refs.mdp_year_list.scrollTop = scrollYearListY;
        });
      }
    },
    dayIsDisable(item) {
      //禁用日期，返回true为禁用
      if (item == 0) {
        return false;
      }
      if (
        this.startDate -
          new Date(this.year + "-" + (this.month + 1) + "-" + item) >
          0 ||
        new Date(this.year + "-" + (this.month + 1) + "-" + item) -
          this.endDate >
          0
      ) {
        //日期不在起止日期范围禁用
        return true;
      } else if (this.disableDate && typeof this.disableDate == "function") {
        //禁用函数存在，符合函数规则，禁用
        if (this.disableDate(this.year + "-" + (this.month + 1) + "-" + item))
          return true;
      }
      return false;
    },
    dayIsWeekend(index) {
      if(index%7==0||index%7==6){
        return true;
      }
      return false;
    }
  }
};
</script>
 
<style>
@media (min-width: 240px) {
  html {
    font-size: 32px;
  }
}
@media (min-width: 320px) {
  html {
    font-size: 42.66667px;
  }
}
@media (min-width: 360px) {
  html {
    font-size: 48px;
  }
}
@media (min-width: 375px) {
  html {
    font-size: 50px;
  }
}
@media (min-width: 384px) {
  html {
    font-size: 51.2px;
  }
}
@media (min-width: 411px) {
  html {
    font-size: 54.8px;
  }
}
@media (min-width: 414px) {
  html {
    font-size: 55.2px;
  }
}
@media (min-width: 424px) {
  html {
    font-size: 56.53333px;
  }
}
@media (min-width: 480px) {
  html {
    font-size: 64px;
  }
}
@media (min-width: 540px) {
  html {
    font-size: 72px;
  }
}
@media (min-width: 640px) {
  html {
    font-size: 85.33333px;
  }
}
@media (min-width: 720px) {
  html {
    font-size: 96px;
  }
}
@media (min-width: 750px) {
  html {
    font-size: 100px;
  }
}
@media (min-width: 768px) {
  html {
    font-size: 102.4px;
  }
}
@media (min-width: 800px) {
  html {
    font-size: 106.66667px;
  }
}
@media (min-width: 980px) {
  html {
    font-size: 130.66667px;
  }
}
@media (min-width: 1024px) {
  html {
    font-size: 136.53333px;
  }
}
@media (min-width: 1080px) {
  html {
    font-size: 144px;
  }
}
@media (min-width: 1152px) {
  html {
    font-size: 153.6px;
  }
}
@media (min-width: 1366px) {
  html {
    font-size: 182.13333px;
  }
}
@media (min-width: 1440px) {
  html {
    font-size: 192px;
  }
}
@media (min-width: 2160px) {
  html {
    font-size: 288px;
  }
}
* {
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
#mobile-datepicker {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdp_container {
  width: 80%;
  height: 10rem;
  background-color: #fff;
}
.mdp_header {
  height: 2rem;
  background-color: #dd2727;
  box-sizing: border-box;
  color: #eee;
  padding: 0.4rem 0.6rem;
  font-size: 0
}
.mdp_current_year {
  font-size: 0.3125rem;
  display: inline-block
}
.mdp_current_date {
  font-size: 0.6125rem;
  display: inline-block
}
.mdp_current_year.active,
.mdp_current_date.active {
  color: #fff;
}
.mdp_content {
  width: 100%;
  height: 6.8rem;
  background: #fff;
}
.mdp_date_content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 0.6rem 0.4rem;
}
.mdp_switch_month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  font-weight: 500;
  font-size: 0.3125rem;
}
.mdp_arrow {
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  border-top: 0.04rem solid #000;
  border-left: 0.04rem solid #000;
}
.mdp_left {
  transform: rotate(-45deg);
}
.mdp_right {
  transform: rotate(135deg);
}
.mdp_arrow_hide {
  visibility: hidden;
}
.mdp_weeks {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  color: #888;
}
.mdp_week {
  width: 14.2%;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdp_week.mark {
  color: #dd2727
}
.mdp_pick_day {
  font-size: 0.24rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.mdp_day {
  width: 14.2%;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdp_day.mdp_day_disable {
  background-color: #f5f7fa;
  cursor: not-allowed;
  color: #c0c4cc !important;
}
.mdp_day.mark {
  color: #dd2727
}
.mdp_day.active {
  width: 14.2%;
  background-color: #dd2727;
  border-radius: 50%;
  color: #fff;
}
.mdp_year_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.02rem solid #eee;
}
.mdp_year_content ul {
  width: 100%;
  height: 100%;
  overflow: scroll;
  font-size: 0.3125rem;
}
.mdp_year_content ul li {
  padding: 0.4rem 0;
  height: 1rem;
  text-align: center;
  box-sizing: border-box;
}
.mdp_year_content ul li.active {
  font-size: 0.465rem;
  color: #dd2727;
}
.mdp_operate_button {
  margin: 0 0.6rem;
  height: 1.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.mdp_button {
  border: none;
  outline: none;
  color: #dd2727;
  background-color: #fff;
  font-weight: 500;
  font-size: 0.275rem;
}
.mdp_cancel_button {
  margin-right: 0.6rem;
}
</style>