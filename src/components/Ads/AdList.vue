<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm-3>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card class="elevation-10 mb-4"
                        v-for="card of myAds"
                        :key="card.id">
                    <v-layout>
                        <v-flex xs4>
                            <v-img :src="card.imgSrc" height="160"/>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{card.title}}</h2>
                                <p>{{card.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn class="info"
                                       :to="'/ad/' + card.id">
                                    Open
                                </v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AdList",
        data: () => ({
        }),
        computed: {
            myAds() {
                return this.$store.getters.myAds
            }
        }
    }
</script>

<style scoped>

</style>
