import MicroAppView from './MicroAppView'

export function install (Vue) {
  Vue.component(MicroAppView.name, MicroAppView)
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default MicroAppView
