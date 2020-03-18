<template>
    <v-img class="profiles__team-img"
           contain
           position="right"
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
</template>

<script>
    export default {
        name: "CardProfile",
        props: ['profile'],
        data: () => ({}),
        methods: {
            team(team) {
                switch (team) {
                    case 'RSoft':
                        return '/assets/rsoft.png';
                    case 'Omniva':
                        return '/assets/omniva.png';
                    case 'Tallink':
                        return '/assets/tallink.jpg';

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
