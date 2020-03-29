<template>
    <div v-if="!isUserLoggedIn">
        <v-container fluid>
        <div class="wrapper">
            <h2 class="header__text">Please, login or register</h2>
            <v-btn text color="primary" to="/login">Login</v-btn>
            <v-btn text color="error" to="/registration">Register</v-btn>
        </div>
    </v-container>
    </div>

    <div class="wrapper" v-else>
        <h2 class="header__text">Welcome on board!</h2>
    </div>
</template>

<script>
    export default {
        name: "HomeS",
        data: () => ({}),
        computed: {
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 10%;
    }

    .header__text {
        text-align: center;
    }
</style>
