# Vue Component Plugin

> A Vue component plugin to vuejs-mobile-datepicker 

## View

在线演示地址 [demo](https://1g703.csb.app/)(请用浏览器上切换到手机调试模式或在手机上体验)

<img src="https://img-blog.csdnimg.cn/2019080110422253.gif" width="50%">

## Build Setup

``` bash
# install
npm install vuejs-mobile-datepicker --save

```
``` javascript
// use
import DatePicker from 'vuejs-mobile-datepicker';

export default {
  // ...
  components: {
    DatePicker
  }
  // ...
}
```

## Property

|  名称   | 描述  |  类型   | 默认值  |
|  ----  | ----  |  ----  | ----  |
| show-picker-model  | 控制选择器显隐 | Boolean  | false |
| mark-weekend  |  标记周末日期  |  Boolean  | false |
| default-date  | 默认选中日期 | Date  | new Date() |
| start-date  | 可选范围开始日期 | Date  | new Date('1900-1-1') |
| end-date  | 可选范围结束日期 | Date  | new Date() |
| disable-date  | 禁用日期,参数为某日期，如（'2018-8-8'），<br>函数返回Boolean值，为true禁用 | Function  | --- |

## Method

|  名称   | 描述  |  回调   | 
|  ----  | ----  |  ----  | 
| cancel  | 取消按钮触发事件 | --- |
| confirm  | 确认按钮触发事件，回调参数为选中日期如（'2018-8-8'） | ---  | 

## More

想了解更多关于该组件插件的源码，请移步到[我的博客](https://blog.csdn.net/weixin_41382187/article/details/98037808)
