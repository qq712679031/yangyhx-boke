import {defaultTheme} from '@vuepress/theme-default'

const navConfig = require("./configs/navConfig")

export default {
    // 站点配置
    lang: 'zh-CN',
    title: '大数据知识点集锦',
    description:'闻道有先后，术业有专攻',
    plugins:['autobar'],
    theme: defaultTheme({
        // 在这里进行配置
        navbar: navConfig
    }),
}