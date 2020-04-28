// console.log("script linked!!");
(function () {
    Vue.component("first-component", {
        template: "#template", // id of script tag in html
        props: ["id"],
        mounted: function () {
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
                    self.item = response.data.shift();
                    self.comments = response.data[0];
                    console.log("***", self.comments);
                })
                .catch(function (err) {
                    console.log("error in POST /one-image: ", err);
                });
        },
        data: function () {
            return {
                item: {
                    url: "",
                    title: "",
                    description: "",
                    username: "",
                    comment: "",
                    next_id: "",
                    prev_id: "",
                },
                comments: [],
                username: "",
                comment: "",
                created_at: "",
            };
        },
        watch: {
            id: function () {
                //whenever our image id changes, this function will run
                // same thing as mounted function on component
                // axious, so it runs not only once but every single time
                // so retrieve NEW image info and comments as well
                console.log("WATCHER image ID changed");
                var self = this;
                console.log("in watcher!!! id", self.id);
                axios
                    .post("/one-image", {
                        id: this.id,
                    })
                    .then(function (response) {
                        console.log(
                            "response from WATCH /image",
                            response.data
                        );
                        console.log(
                            "this INSIDE axios in WATCH component",
                            self
                        );
                        self.item = response.data.shift();
                        console.log("in watcher!!! item", self.item);
                        document.querySelector(".component").style.visibility =
                            "visible";
                        self.comments = response.data[0];
                        console.log("comments in watcher", self.comments);
                        if (self.item == null) {
                            document.querySelector(
                                ".component"
                            ).style.visibility = "hidden";
                            console.log("NULL");
                        }
                    })
                    .catch(function (err) {
                        console.log("error in WATCH /one-image: ", err);
                    });
            },
        },
        methods: {
            closeModal: function () {
                console.log("I am emitting from the component...(child)");
                this.$emit("closemuffin");
            },
            displayComment: function (e) {
                e.preventDefault();
                console.log("***speak your truth!!");
                var self = this;
                var realComment = {
                    username: this.username,
                    comment: this.comment,
                    image_id: this.id,
                };
                // console.log("****am I the comment?", realComment);
                axios.post("/comment", realComment).then(function (response) {
                    console.log(
                        "response data [0] POST /comment: ",
                        response.data[0]
                    );
                    console.log("all the comments", self.comments);
                    self.comments.push(response.data[0]);
                });
            },
        },
    });
    new Vue({
        // el - represents which element in our html will have access tp our Vue code
        el: "#main",
        data: {
            // this line of code makes modal pop  open automatically when page intially loads
            // this gives us a link sharing functionality
            selectedImage: location.hash.slice(1),
            // selectedImage: null, // anything truthy, also can be a number e.g. 10 or
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            moreImg: true,
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
            window.addEventListener("hashchange", function () {
                console.log("hash change has fired");
                console.log("***location.hash***", location.hash);
                self.selectedImage = location.hash.slice(1);
                console.log(
                    "self.selectedImage in Vue mounted window",
                    self.selectedImage
                );
            });
        }, // mounted ends
        methods: {
            closeMe: function () {
                console.log("I am the parent, I will now close the modal...");
                this.selectedImage = null;
                location.hash = "";
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
            showMore: function (e) {
                console.log("showMore running");
                e.preventDefault();
                console.log("this.images.length", this.images.length);
                console.log("this.images", this.images);
                var visibleId = this.images.length - 1;
                console.log("***", this.images[visibleId]);
                var bottomItem = this.images[visibleId];
                var bottomItemObject = { id: bottomItem.id };
                console.log("**bottomItemObject**", bottomItemObject);
                var self = this;
                axios
                    .post("/more", bottomItemObject)
                    .then(function (result) {
                        // console.log("**result of AXIOS", result);

                        if (bottomItemObject.id == 1) {
                            console.log("**id**", bottomItemObject.id);
                            this.document.getElementById(
                                "more"
                            ).style.visibility = "hidden";
                        }
                        self.images.push(...result.data);
                    })
                    .catch(function (err) {
                        console.log("error in POST /more: ", err);
                    });
            },
        },
        // END OF METHODS
    });
    // END OF VUE
})();
