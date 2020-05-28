<template>
  <div>
    <div v-html="appContent" v-loading="loading" style="height: 100%"/>
  </div>
</template>

<script>
import { importEntry } from 'import-html-entry'

const loadMap = {}

export default {
  name: 'MicroAppView',
  props: {
    name: String,
    path: String,
    query: Object
  },
  data() {
    return {
      loading: false,
      appContent: ''
    }
  },
  watch: {
    query: {
      handler() {
        this.mountApp()
      },
      deep: true
    }
  },
  mounted() {
    this.mountApp()
  },
  destroyed() {
    this.unmountApp()
  },
  methods: {
    async mountApp() {
      const appData = loadMap[this.name]
      if (!appData) {
        const time = new Date().getTime()
        this.loading = true
        const rt = await importEntry(this.path)
        console.log('import', new Date().getTime() - time)
        window.IS_WINING_MICRO_APP = true
        this.appContent = rt.template
        const app = await rt.execScripts()
        console.log('exec', new Date().getTime() - time)
        let { mount, unmount } = app
        if (!mount || !unmount) {
          mount = window[this.name].mount
          unmount = window[this.name].unmount
        }
        this._props.context = this
        await mount(this._props)
        console.log('mount', new Date().getTime() - time)
        loadMap[this.name] = {
          template: this.appContent,
          mount,
          unmount
        }
        this.loading = false
      } else {
        const { mount, unmount, template } = appData
        this.appContent = template
        if (mount && unmount) {
          this.$nextTick(async() => {
            this._props.context = this
            await mount(this._props)
          })
        }
      }
    },
    async unmountApp() {
      const { unmount } = loadMap[this.name]
      if (unmount) {
        await unmount()
      }
    }
  }
}
</script>
