<template>
    <div>
        <p>Put Content Here</p>
    </div>
</template>

<script>
    export default {
        name: "default",
        props: {},
        data() {
            return {
                message: 'Here is a Message for the Default Components',
            };
        },
        methods: {
            fetchSomething() {
                axios
                    .get('/api/design/attribute?paginate=false')
                    .then(response => {
                        // console.log(response.data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        computed: {
            reversedMessage: function () {
                return this.message.split('').reverse().join('')
            }
        },
        watch: {
            message: function (reset){
            }
        },
        mounted: function () {},
        created: function () {},
    }
</script>

<style scoped>

</style>