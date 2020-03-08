<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm-3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form ref="form"
                        v-model="valid"
                        class="mb-3"
                        validation>
                    <v-text-field
                            label="Ad title"
                            name="title"
                            type="text"
                            required
                            :rules="[v => !!v || 'Title is requred']"
                            v-model="title"
                    />

                    <v-textarea
                            label="Description"
                            name="description"
                            type="text"
                            :rules="[v => !!v || 'Description is requred']"
                            v-model="description"
                    />
                </v-form>
                <v-layout row class="mb-3">
                    <v-flex xs12>
                        <v-btn color="blue-grey"
                               class="ma-2 white--text"
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
                <v-layout row>
                    <v-flex xs12>
                        <img :src="imgSrc" height="100px" v-if="imgSrc"/>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch v-model="promo"
                                  label="Add to promo?"/>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer/>
                        <v-btn class="success"
                               :loading="loading"
                               @click="createAd"
                               :disabled="!valid || !image || loading">
                            Create ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "NewAd",
        data: () => ({
            title: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imgSrc: ''
        }),
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate() && this.image) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    };

                    this.$store.dispatch('createAd', ad)
                        .then(() => {
                            this.$router.push('/list')
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

</style>
