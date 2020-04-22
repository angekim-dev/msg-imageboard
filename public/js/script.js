// console.log("script linked!!");

(function () {
    new Vue({
        // el - represents which element in our html will have access tp our Vue code
        el: "#main",
        data: {
            name: "msg",
            seen: true,
            images: [],
        }, // data ends
        mounted: function () {
            // console.log("my vue has MOUNTED!");

            // console.log("this OUTSIDE axios", this);
            var self = this;
            axios.get("/images").then(function (response) {
                // console.log("response from /cities", response.data);
                // console.log("this INSIDE axios", self);
                self.images = response.data;
            });
        }, // mounted ends
        // methods: {
        //     myFunction: function () {
        //         console.log("myFunction is running!");
        //     },
        // },
    });
})();
