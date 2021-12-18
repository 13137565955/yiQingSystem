module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                views: '@/views',
                network: '@/network'
            }
        }
    },
    devServer: {
        port: 80
    },
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
}