// console.log("script linked!!");

(function () {
    new Vue({
        // el - represents which element in our html will have access tp our Vue code
        el: "#main",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
        }, // data ends
        mounted: function () {
            // console.log("my vue has MOUNTED!");

            // console.log("this OUTSIDE axios", this);
            var self = this;
            axios
                .get("/images")
                .then(function (response) {
                    // console.log("response from /cities", response.data);
                    // console.log("this INSIDE axios", self);
                    self.images = response.data;
                })
                .catch(function (err) {
                    console.log("error in GET /images: ", err);
                });
        }, // mounted ends
        methods: {
            handleClick: function (e) {
                e.preventDefault();
                console.log("data properties: ", this);

                var formData = new FormData();
                //use it because there is a file, normally would create an object
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.file);
                // if console.log formData, the result will be an empty object, but iz is still right

                axios
                    .post("/upload", formData)
                    .then(function (resp) {
                        console.log("resp from POST /upload: ", resp);
                        self.images.push(resp.data);
                    })
                    .catch(function (err) {
                        console.log("error in POST /upload: ", err);
                    });
            },

            handleChange: function (e) {
                console.log("handleChange is running");
                console.log("file: ", e.target.files[0]);
                this.file = e.target.files[0];
            },
        },
    });
})();
