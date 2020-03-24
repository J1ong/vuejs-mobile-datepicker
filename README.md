# Vue Component Plugin

> A Vue component plugin to vuejs-mobile-datepicker 

## View

在线演示地址 [demo](https://1g703.csb.app/) (请用浏览器上切换到手机调试模式或在手机上体验)

<img src="https://img-blog.csdnimg.cn/20200323174318448.gif">

## Build Setup

``` bash
# install
npm install vuejs-mobile-datepicker --save

```
``` javascript
// use
import DatePicker from 'vuejs-mobile-datepicker';
<template>
  <div id="app"> 
    <p @click="showDatePicker=true">点我打开</p>
    <date-picker
      language="en"
      :show-picker-model="showDatePicker"
      :mark-weekend="isMark"
      :start-date="new Date('1968-10-20')"
      :end-date="new Date('2020-12-31')"
      :disable-date="disableDate"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </div>
</template>
export default {
  // ...
  components: {
    DatePicker
  },
  data(){
    return{
      isMark:true,
      showDatePicker:false,
      selectedDate:'',
    }
  },
  methods:{
    handleCancel() {
      this.showDatePicker = false;
    },
    handleConfirm(item) {
      this.selectedDate = item;
      this.showDatePicker = false;
    },
    disableDate(item) {
      if (
        new Date(item) - new Date("2019-8-10") >= 0 &&
        new Date("2019-8-20") - new Date(item) >= 0
      ) {
        return true;
      }
      return false;
    },
  }
  // ...
}
```

## Property

|  名称   | 描述  |  类型   | 默认值  | 选项 |
|  ----  | ----  |  ----  | ----  | ---- |
| show-picker-model  | 控制选择器显示或隐藏 | Boolean  | false | true &#124; false
| mark-weekend  |  是否标记周末  |  Boolean  | false | true &#124; false
| language  |  语言  |  String  | "zh" | "zh" &#124; "en"
| default-date  | 默认选中日期 | Date  | new Date() | ---
| start-date  | 选择器最小可选日期 | Date  | new Date('1900-1-1') | ---
| end-date  | 选择器最大可选日期 | Date  | new Date() | ---
| disable-date  | 设置禁用日期,函数参数为需禁用日期如（'2018-8-8'），要求返回Boolean值，为true禁用日期 | Function  | --- | ---

## Method

|  名称   | 描述  |  回调   | 
|  ----  | ----  |  ----  | 
| cancel  | 取消按钮触发事件 | --- |
| confirm  | 确认按钮触发事件，回调参数为选中日期如（"2018-8-8"） | ---  | 

## More

想了解更多关于该组件的源码，请移步到 [我的博客](https://blog.csdn.net/weixin_41382187/article/details/98037808)

Github地址：[https://github.com/J1ong/vuejs-mobile-datepicker](https://github.com/J1ong/vuejs-mobile-datepicker)
