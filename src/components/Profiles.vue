<template>
    <v-container fluid>
        <v-layout xs12>
            <v-flex xs12 class="text-center pt-5" v-if="loading">
                <v-progress-circular
                        indeterminate
                        color="purple"/>
            </v-flex>
            <v-row dense xs12 sm6 offset-sm-3 v-else>
                <v-dialog v-model="dialog" max-width="500">
                    <template v-slot:activator="{ on }">
                        <v-card class="mx-auto mt-5"
                                max-width="434"
                                tile
                                v-on="on"
                                @click="currentProfile = profile"
                                v-for="profile of profiles"
                                :key="profile.name">
                            <app-card-profile :profile="profile"/>
                        </v-card>
                    </template>
                    <app-card-profile-modal :profile="currentProfile" :closeDialog="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Profiles",
        data: () => ({
            dialog: false,
            currentProfile: null
        }),
        created() {
            this.$store.dispatch('fetchProfiles')
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            profiles() {
                return this.$store.getters.profiles
            }
        },
        methods: {
            closeDialog() {
                this.dialog = false;
            }
        }
    }

</script>

<style scoped>

</style>
