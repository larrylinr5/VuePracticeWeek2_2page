import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js";

const app = createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",

            products: [],
            tempProduct: {},
        };
    },
    methods: {
        checkAdmin() {
            axios
                .post(`${this.url}/api/user/check`)
                // 成功的結果
                .then((res) => {
                    if (res.data.success) this.getProducts();
                })
                // 失敗的結果
                .catch((error) => {
                    alert(error.data.message);
                    window.location = "index.html";
                });
        },
        //取得後臺產品列表
        getProducts() {
            axios
                .get(`${this.url}/api/${this.path}/admin/products`)
                // 成功的結果
                .then((res) => {
                    if (res.data.success) {
                        this.products = res.data.products;
                    }
                })
                // 失敗的結果
                .catch((error) => {
                    console.dir("error>>>", error);
                });
        },
        checkDetail(product) {
            this.tempProduct = product;
        },
    },
    created() {
        //存放token 只需要設定一次
        const tempToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)larryToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        //axios預設headers
        axios.defaults.headers.common["Authorization"] = tempToken;

        this.checkAdmin()
    },
});

app.mount("#app");
