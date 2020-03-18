<template>
    <v-card>
        <v-card-title class="headline">{{profile.name}}</v-card-title>
        <v-card-text>{{profile.about}}</v-card-text>
        <v-card-text></v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="closeDialog">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="closeDialog">Agree</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CardProfileModal",
        props: ['profile', 'closeDialog']
    }
</script>

<style scoped>

</style>
