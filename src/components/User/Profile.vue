<template>
    <v-container>
        <v-layout xs12 class="text-center pt-5" v-if="loading">
            <v-progress-circular indeterminate
                                 color="purple" />
        </v-layout>
        <template v-else>
            <v-layout>
                <v-flex xs6 class="text-center pt-5">
                    <h1 class="text--secondary mb-3">Profile</h1>
                    <v-text-field label="Name"
                                  name="name"
                                  type="text"
                                  :disabled="viewMode"
                                  :rules="[]"
                                  v-model="name"/>
                    <v-text-field label="Stack"
                                  name="stack"
                                  placeholder="For separation use ,"
                                  type="text"
                                  :disabled="viewMode"
                                  :rules="[]"
                                  v-model="stack"/>
                    <v-select v-model="team"
                              :items="teams"
                              :disabled="viewMode"
                              :append-icon="'mdi-plus'"
                              label="Team"/>
                    <v-select v-model="position"
                              :items="positions"
                              multiple
                              :disabled="viewMode"
                              :append-icon="'mdi-plus'"
                              label="Position"/>
                    <v-textarea label="About me"
                                name="about"
                                type="text"
                                :disabled="viewMode"
                                :rules="[]"
                                v-model="about"/>
                    <v-menu v-model="dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="140"
                            :disabled="viewMode"
                            transition="scale-transition"
                            offset-y
                            min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="startDate"
                                    :disabled="viewMode"
                                    label="I'm with Smartbics since"
                                    prepend-icon="mdi-calendar-range"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate"
                                       :first-day-of-week="1"
                                       :disabled="viewMode"
                                       @input="dateMenu = false"/>
                    </v-menu>
                </v-flex>
                <v-flex xs6>

                </v-flex>
                <v-flex xs6 class="pt-5 text-right">
                    <img :src="imgSrc" class="profile__avatar"/>
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
                           :disabled="viewMode || loading">
                        Save
                    </v-btn>
                </v-flex>
            </v-layout>
        </template>

    </v-container>
</template>

<script>
    import {positions, teams} from "../../constants"
    export default {
        name: "Profile",
        data() {
            return {
                name: this.$store.getters.user.name || '',
                about: this.$store.getters.user.about || '',
                stack: this.$store.getters.user.stack || '',
                team: this.$store.getters.user.team || '',
                position: this.$store.getters.user.position || '',
                startDate: this.$store.getters.user.startDate || new Date().toISOString().substr(0, 10),
                dateMenu: false,
                viewMode: true,
                image: null,
                imgSrc: this.$store.getters.user.imgSrc || 'assets/avatar.png'
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            teams() {
                return teams
            },
            positions() {
                return positions
            }
        },
        methods: {
            updateProfile() {
                const profile = {
                    name: this.name,
                    about: this.about,
                    stack: this.stack,
                    team: this.team,
                    position: this.position,
                    startDate: this.startDate,
                    image: this.image,
                };

                this.$store.dispatch('updateProfile', profile)
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(() => {})
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
        max-height: 250px;
        border-radius: 10%;
        box-shadow: -2px 6px 26px -8px rgba(0, 0, 0, 0.75);
    }
</style>
