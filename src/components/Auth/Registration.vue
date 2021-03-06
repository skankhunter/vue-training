<template>
    <v-container
            class="fill-height"
            fluid>
        <v-row
                align="center"
                justify="center">
            <v-col cols="12"
                   sm="8"
                   md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary"
                               dark
                               flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form"
                                v-model="valid"
                                lazy-validation>
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    :rules="emailRules"
                                    v-model="email"/>
                            <v-text-field
                                    label="Full name"
                                    name="name"
                                    prepend-icon="mdi-baby-face"
                                    type="text"
                                    :rules="nameRules"
                                    v-model="name"/>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :counter="6"
                                    :rules="passwordRules"
                                    v-model="password"/>

                            <v-text-field
                                    id="confirm-password"
                                    label="Confirm password"
                                    name="confirm-password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :counter="6"
                                    :rules="confirmPasswordRules"
                                    v-model="confirmPassword"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary"
                               @click="onSubmit()"
                               :loading="loading"
                               :disabled="!valid || loading">
                            Create
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Registration",
        data: () => ({
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            valid: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name is too long',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password should be 6 or more chars',
            ],
        }),
        computed: {
            emailRules() {
                const rules = [];
                const domain = this.email.split('@')[1];

                if (!this.email) {
                    const rule = v => !!v || 'E-mail is required';
                    rules.push(rule)
                }

                if (!/.+@.+\..+/.test(this.email)) {
                    const rule = 'E-mail must be valid';
                    rules.push(rule)
                }

                if (domain !== 'smartbics.com') {
                    const rule = 'E-mail should have @smartbics.com domain';
                    rules.push(rule)
                }

                return rules
            },
            confirmPasswordRules() {
                const rules = [];

                if (!this.confirmPassword) {
                    const rule = v => !!v || 'Field is required';
                    rules.push(rule)
                }

                if (this.confirmPassword) {
                    const rule = v => v === this.password || 'Passwords should be equal';
                    rules.push(rule)
                }

                return rules
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            onSubmit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password,
                        name: this.name
                    };

                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(() => {})
                }
            }
        }
    }
</script>

<style scoped>

</style>
