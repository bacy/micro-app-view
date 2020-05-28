# micro-app-view
```
微前端组件库的Vue实现，可以使用类似iframe的方式加载子应用
```
## 安装
```
yarn add micro-app-view
or
npm install micro-app-view
```

### 使用
```vue
import MicroAppView from 'micro-app-view'
Vue.use(MicroAppView)
```
```vue
<micro-app-view name="app1" path="/app1" :query="{ id:1 }" />
```

### 子应用修改
main.js
```vue
let app
export async function bootstrap() {
  console.log('vue app1 bootstrap')
}
export async function mount(props) {
  console.log('app1 mount', props)
  app = new Vue({
    render: (h) => h(App),
    props: props,
    router,
    store
  }).$mount(`#app1)
}
export async function unmount() {
  console.log('app1 unmount', app)
  app.$destroy()
  app = null
}
```

vue.config.js
```js
const packageName = 'app1'
config.output.library = packageName
config.output.libraryTarget = 'umd'
config.output.jsonpFunction = `webpackJsonp_${packageName}`
```

