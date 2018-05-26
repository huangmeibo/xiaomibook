require.config({
    baseUrl: '/js/',
    paths: {
        "jquery": "lib/jquery",
        "bscroll": "lib/bscroll",
        "swiper": "lib/swiper.min",
        "hand": "lib/handlebars",
        "index": "page/index",
        "text": "lib/text",
        "template": "common/template",
        "lazy": "lib/jquery.lazyload",
        "search": "page/search",
        "detail": "page/detail",
        "read": "page/read",
        "login": "page/login",
        "base64": "lib/jquery.base64"
    },
    shim: {
        "lazy": {
            exports: "lazy",
            deps: ['jquery']
        },
        "base64": {
            exports: "base64",
            deps: ['jquery']
        }
    }
})
document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px';