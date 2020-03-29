<template>
    <v-card>
        <v-card-title class="headline">{{profile.name}}</v-card-title>
        <div class="card-profile__wrapper">
            <div>
                <v-card-text>
                    <v-icon left>mdi-information-outline</v-icon>
                    <span class="card-profile__subtitle">About:</span>
                    <p class="card-profile__text">{{profile.about}}</p>
                </v-card-text>
                <v-card-text>
                    <v-icon left>mdi-stack-overflow</v-icon>
                    <span class="card-profile__subtitle">Stack:</span>
                    <p class="card-profile__text">{{profile.stack}}</p>
                </v-card-text>
                <v-card-text>
                    <v-icon left>mdi-microsoft-teams</v-icon>
                    <span class="card-profile__subtitle">Team:</span>
                    <p class="card-profile__text">{{profile.team}}</p>
                </v-card-text>
                <v-card-text>
                    <v-icon left>mdi-death-star</v-icon>
                    <span class="card-profile__subtitle">Position:</span>
                    <p class="card-profile__text">{{position}}</p>
                </v-card-text>
                <v-card-text>
                    <v-icon left>mdi-timer-sand-full</v-icon>
                    <span class="card-profile__subtitle">I'm in Smartbics:</span>
                    <p class="card-profile__text">{{diffDays}} {{diffDays > 1 ? 'days' : 'day'}}</p>
                </v-card-text>
            </div>
            <div class="card-profile__img-wrapper">
                    <v-img class="card-profile__img"
                           :src="avatar"
                           contain
                           position="right"/>
            </div>
        </div>

        <v-card-actions>
            <v-spacer/>
            <v-btn color="green darken-1" text @click="closeDialog">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CardProfileModal",
        props: ['profile', 'closeDialog'],
        computed: {
            avatar() {
                return this.profile.imgSrc ? this.profile.imgSrc : '/assets/avatar.png'
            },
            position() {
                return this.profile.position.join(', ')
            },
            diffDays() {
                const startDate = new Date(this.profile.startDate);
                const dateNow = new Date();

                return parseInt((dateNow - startDate) / (1000 * 60 * 60 * 24), 10);
            }
        }
    }
</script>

<style scoped>
    .card-profile__wrapper {
        display: flex;
        justify-content: center;
        padding: 0 10px;
    }

    .card-profile__img {
        padding: 0 20px;
        max-width: 200px;
    }

    .card-profile__subtitle {
        font-size: 16px;
        color: black;
        font-weight: 500;
    }

    .card-profile__text::first-letter {
       margin-left: 32px;
    }
</style>
