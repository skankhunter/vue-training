<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm-3>
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
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Orders",
        data: () => ({
            orders: [
                {id: 'wer', name: 'Max', phone: '8-924-234-32-34', adId: '234', done: false}
            ]
        }),
        methods: {
            markDown(order) {
                order.done = true;
            }
        }
    }
</script>

<style scoped>

</style>