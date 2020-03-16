<template>
    <v-container fluid>
        <v-layout xs12>
            <v-flex xs12 class="text-center pt-5" v-if="loading">
                <v-progress-circular
                        indeterminate
                        color="purple"/>
            </v-flex>
            <v-row dense xs12 sm6 offset-sm-3 v-else>
                <v-card class="mx-auto mt-5"
                        max-width="434"
                        tile
                        v-for="profile of profiles"
                        :key="profile.name">
                    <v-img class="profiles__team-img"
                           contain
                           :src="team(profile.team)">
                        <v-row align="end"
                               class="fill-height">
                            <v-col align-self="start"
                                   class="pa-0"
                                   cols="12">
                                <v-avatar class="profile"
                                          color="grey"
                                          size="164"
                                          tile>
                                    <v-img :src="profile.imgSrc" />
                                </v-avatar>
                            </v-col>
                            <v-col class="py-0">
                                <v-list-item color="rgba(0, 0, 0, .4)"
                                             dark>
                                    <v-list-item-content>
                                        <v-list-item-title class="title">{{profile.name}}</v-list-item-title>
                                        <v-list-item-subtitle class="profiles__position">{{profile.position.join(', ')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-img>
                </v-card>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Profiles",
        data: () => ({}),
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
            team(team) {
                switch (team) {
                    case 'RSoft':
                        return '/assets/rsoft.png';
                    default:
                        return '/assets/tallink.jpg'
                }
            }
        }
    }

</script>

<style scoped>
    .profiles__team-img {
        height: 100%;
        max-height: 250px;
        min-width: 400px;
    }

    .title {
        color: black;
    }

    .profiles__position {
        color: black !important;
    }
</style>
