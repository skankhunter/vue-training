<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" heigth="300"/>
                    <v-card-text>
                        <h1 class="text--primary">
                            Title
                        </h1>
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
        data: () => ({

        })
    }
</script>

<style scoped>

</style>