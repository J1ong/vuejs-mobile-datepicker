import MobileDatePicker from './MobileDatePicker.vue'
MobileDatePicker.install = function(Vue) {
    Vue.component('MobileDatePicker', MobileDatePicker)
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(MobileDatePicker)
}
export default MobileDatePicker
