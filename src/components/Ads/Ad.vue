<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img :src="ad.imgSrc" heigth="300"/>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn class="warning" depressed>Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Ad",
        props: ['id'],
        data: () => ({
        }),
        computed: {
            ad() {
                const id = this.id;

                return this.$store.getters.adById(id)
            }
        }
    }
</script>

<style scoped>

</style>
