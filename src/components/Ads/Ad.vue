<template>
    <v-container>
        <v-layout>
            <v-flex xs12 md9 sm6>
                <v-card v-if="!loading">
                    <v-img :src="ad.imgSrc" heigth="300"/>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <app-edit-ad-modal :ad="ad" v-if="isOwner"/>
                        <app-buy-modal :ad="ad"/>
                    </v-card-actions>
                </v-card>
                <div v-else class="text-center pt-5">
                    <v-progress-circular
                            indeterminate
                            color="purple"/>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from './EditAdModal'

    export default {
        name: "Ad",
        components: {
            appEditAdModal: EditAdModal
        },
        props: ['id'],
        data: () => ({}),
        computed: {
            ad() {
                const id = this.id;

                return this.$store.getters.adById(id)
            },
            loading () {
                return this.$store.getters.loading
            },
            isOwner () {
                return this.ad.ownerId === this.$store.getters.user.id
            }
        }
    }
</script>

<style scoped>

</style>
