<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-center pt-5" v-if="loading">
                <v-progress-circular
                        indeterminate
                        color="purple"/>
            </v-flex>
            <v-flex xs12 sm6 offset-sm-3 v-else-if="!loading && orders.length !== 0">
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list
                        subheader
                        two-line
                        flat>
                    <v-list-item v-for="order of orders"
                                 :key="order.id">
                        <v-list-item-action>
                            <v-checkbox @change="markDown(order)"
                                        :input-value="order.done"
                                        color="indigo"/>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{order.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn class="primary"
                                   :to="'/ad/' + order.adId">
                                Open
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-flex>
            <v-flex xs12 class="text-center pt-5" v-else>
                <h1 class="text--secondary">You have no orders</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Orders",
        data: () => ({}),
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            orders() {
                return this.$store.getters.orders
            }
        },
        created() {
            this.$store.dispatch('fetchOrders')
        },
        methods: {
            markDown(order) {
                this.$store.dispatch('markOderDone', order.id)
                    .then(() => {
                        order.done = true
                    })
                    .catch(() => {})
            }
        }
    }
</script>

<style scoped>

</style>
