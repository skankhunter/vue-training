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
                               class="ma-2 white--text">
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img src="" height="100px"/>
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
                               @click="createAd"
                               :disabled="!valid">
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
            valid: false
        }),
        methods: {
            createAd() {
                if (this.$refs.form.validate()) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png'
                    };

                    this.$store.dispatch('createAd', ad)
                }
            }
        }
    }
</script>

<style scoped>

</style>
