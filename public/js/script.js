// console.log("script linked!!");

(function () {
    Vue.component("first-component", {
        template: "#template", // id of script tag in html
        props: ["postTitle", "id"],
        mounted: function () {
            // hello from first-component in index.html
            console.log("postTitle: ", this.postTitle);
            //id of image
            console.log("id in mounted of my component", this.id);
            // AXIOS
            // we can now make a request to server sending the id,
            // and asking for all the information about that id
            var self = this;

            axios
                .post("/one-image", { id: this.id })
                .then(function (response) {
                    console.log("response from /image", response.data);
                    console.log("this INSIDE axios in component", self);
                    self.image = response.data.shift();
                })
                .catch(function (err) {
                    console.log("error in POST /one-image: ", err);
                });
        },
        data: function () {
            return {
                // name: "Pete",
                // count: 0,
                image: {
                    url: "",
                    title: "",
                    description: "",
                },
            };
        },
        methods: {
            closeModal: function () {
                console.log("I am emitting from the component...(child)");
                this.$emit("closemuffin");
            },
        },
    });

    new Vue({
        // el - represents which element in our html will have access tp our Vue code
        el: "#main",
        data: {
            selectedImages: null, // anything truthy, also can be a number e.g. 10 or
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            // fruits: [
            //     {
            //         title: "🥝",
            //         id: 1,
            //     },
            //     {
            //         title: "🍓",
            //         id: 2,
            //     },
            //     {
            //         title: "🍋",
            //         id: 3,
            //     },
            // ],
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
            closeMe: function () {
                console.log("I am the parent, I will now close the modal...");
                this.selectedImages = null;
            },

            handleClick: function (e) {
                e.preventDefault();
                console.log("data properties: ", this);
                var self = this;
                var formData = new FormData();
                //use it because there is a file, normally would create an object
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.file);
                // if console.log formData, the result will be an empty object, but it is still right

                axios
                    .post("/upload", formData)
                    .then(function (resp) {
                        // console.log("resp from POST /upload: ", resp.data);
                        // console.log("***", self.images);
                        self.images.unshift(resp.data);
                    })
                    .catch(function (err) {
                        console.log("error in POST /upload: ", err);
                    });
            },

            handleChange: function (e) {
                // console.log("handleChange is running");
                // console.log("file: ", e.target.files[0]);
                this.file = e.target.files[0];
            },
        },
        // END OF METHODS
    });
    // END OF VUE
})();
