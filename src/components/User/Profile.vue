<template>
    <v-container>
        <v-layout >
            <v-flex xs6  class="text-center pt-5">
                <h1 class="text--secondary mb-3">Profile</h1>
                <v-text-field
                        label="Name"
                        name="name"
                        type="text"
                        :disabled="viewMode"
                        :rules="[]"
                        v-model="name"/>
                <v-text-field
                        label="My stack"
                        name="stack"
                        placeholder="For separation use ,"
                        type="text"
                        :disabled="viewMode"
                        :rules="[]"
                        v-model="stack"/>
                <v-textarea
                    label="About me"
                    name="about"
                    type="text"
                    :disabled="viewMode"
                    :rules="[]"
                    v-model="about"/>
            </v-flex>
            <v-flex xs6 class="pt-5 text-right">
                <img :src="imgSrc" class="profile__avatar" v-if="imgSrc"/>
            </v-flex>
        </v-layout>
        <v-layout class="mb-3">
            <v-flex xs12>
                <v-btn color="blue-grey"
                       class="ma-2 white--text"
                       :disabled="viewMode"
                       @click="triggerUpload">
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <input ref="fileInput"
                       type="file"
                       style="display: none"
                       accept="image/*"
                       @change="onFileChange">
            </v-flex>

        </v-layout>
        <v-layout >

        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-spacer/>
                <v-btn class="light-blue darken-3 white--text ma-2"
                       text
                       :loading="loading"
                       @click="viewMode = !viewMode">
                    Edit
                </v-btn>
                <v-btn class="success ma-2"
                       :loading="loading"
                       @click="updateProfile"
                       :disabled="!image || loading">
                    Save
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Profile",
        data () {
            return {
                name: this.$store.getters.user.name || '',
                about: this.$store.getters.user.about || '',
                stack: this.$store.getters.user.stack || '',
                viewMode: true,
                image: null,
                imgSrc: this.$store.getters.user.imgSrc || ''
        }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            updateProfile() {
                if (this.image) {
                    const profile = {
                        name: this.name,
                        about: this.about,
                        stack: this.stack,
                        image: this.image,
                    };

                    this.$store.dispatch('updateProfile', profile)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(() => {
                        })
                }
            },
            triggerUpload() {
                this.$refs.fileInput.click()
            },
            onFileChange(event) {
                const img = event.target.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                    this.imgSrc = reader.result
                };
                reader.readAsDataURL(img);

                this.image = img
            }
        }
    }
</script>

<style scoped>
    .profile__avatar {
        max-height: 200px;
        border-radius: 10%;
        box-shadow: -2px 6px 26px -8px rgba(0,0,0,0.75);
    }
</style>
