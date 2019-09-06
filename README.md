# Vue Component Plugin

> A Vue component plugin to vuejs-mobile-datepicker 
## View

<img src="https://img-blog.csdnimg.cn/2019080110422253.gif" width="50%">

## Build Setup

``` bash
# install
npm install vuejs-mobile-datepicker --save

```
``` javascript
// use
import Datepicker from 'vuejs-mobile-datepicker';

export default {
  // ...
  components: {
    Datepicker
  }
  // ...
}
```

## Property

|  名称   | 描述  |  类型   | 默认值  |
|  ----  | ----  |  ----  | ----  |
| show-pick-model  | 控制日期选择器显示隐藏 | Boolean  | false |
| default-date  | 默认选择日期 | Date  | new Date() |
| start-date  | 日期选择器可选最小日期 | Date  | new Date('1900-1-1') |
| end-date  | 日期选择器可选最大日期 | Date  | new Date() |
| disable-date  | 设置禁用日期,函数参数为当前日期如（'2018-8-8'），要求返回Boolean类型的值，为true禁用 | Function  | --- |

## Method

|  名称   | 描述  |  回调   | 
|  ----  | ----  |  ----  | ----  |
| cancel  | 点击取消按钮触发 | ---  | 
| confirm  | 点击确认按钮触发，回调参数为选中日期如（'2018-8-8'） | ---  | 

## More

想了解更多关于该组件插件的源码，请移步到我的博客https://blog.csdn.net/weixin_41382187/article/details/98037808
