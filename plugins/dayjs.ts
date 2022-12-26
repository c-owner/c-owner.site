import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { defineNuxtPlugin } from "#app";
import 'dayjs/locale/ko'

export default defineNuxtPlugin((nuxtApp) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.extend(relativeTime)
    dayjs.locale('ko')
    nuxtApp.provide('dayjs', dayjs)
})
declare module '#app' {
    interface NuxtApp {
        $dayjs: dayjs.Dayjs
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
    }
}
