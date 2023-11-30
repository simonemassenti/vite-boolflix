<script>
import { store } from '../store';
export default {
        data() {
            return{
                store
            }
        }
    }
</script>

<template>


    <button @click="$emit('search')">Cerca</button>
</template>

<style scoped>
</style>