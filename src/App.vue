<template>
    <v-app>
        <v-navigation-drawer app temporary
                             v-model="drawer">
            <v-list>
                <v-list-item
                        v-for="link in links"
                        :key="link.title"
                        @click="()=>{}"
                        :to="link.url">
                    <v-list-item-icon>
                        <v-icon>mdi-{{link.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"/>
                    </v-list-item-content>

                </v-list-item>
                <v-list-item v-if="isUserLoggedIn"
                             @click="onLogout">
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="'Logout'"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>

        <v-card flat>
            <v-toolbar dark color="primary">
                <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link to="/" tag="span" class="pointer">Keker</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn v-for="link in links"
                           :key="link.title"
                           :to="link.url"
                           text>
                        <v-icon left>mdi-{{link.icon}}</v-icon>
                        {{link.title}}
                    </v-btn>
                    <v-btn text
                           v-if="isUserLoggedIn"
                           @click="onLogout">
                        <v-icon left>mdi-logout-variant</v-icon>
                        Logout
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </v-card>

        <!-- Sizes your content based upon application components -->
        <v-content>
            <router-view></router-view>
        </v-content>
        <template v-if="error">
            <v-snackbar color="error"
                        @input="closeError"
                        :multi-line="true"
                        :value="true"
                        :timeout="5000">
                {{error}}
                <v-btn dark text
                       @click="closeError">
                    Close
                </v-btn>
            </v-snackbar>
        </template>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},

        data: () => ({
            drawer: false
        }),
        computed: {
            error() {
                return this.$store.getters.error
            },
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            },
            links() {
                if (this.isUserLoggedIn) {
                    return [
                        {title: 'Orders', icon: 'bookmark-multiple', url: '/orders'},
                        {title: 'New ad', icon: 'note-text', url: '/new'},
                        {title: 'My ads', icon: 'clipboard-list-outline', url: '/list'},
                        {title: 'Profile', icon: 'account-circle-outline', url: '/profile'}
                    ];
                }

                return [
                    {title: 'Login', icon: 'login', url: '/login'},
                    {title: 'Registration', icon: 'face', url: '/registration'}
                ]
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            onLogout() {
                this.$store.dispatch('logoutUser');
                this.$router.push('/')
            }
        }
    };
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
