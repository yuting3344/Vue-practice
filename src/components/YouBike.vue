
<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <main class="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl flex flex-col max-h-screen m-16">
            <div class="text-center mb-6">
            <img src="@/assets/pic/bike.jpg" alt="Bike Illustration" class="w-64 mx-auto mb-4">
            <h1 class="text-3xl font-bold mb-2">YouBike 即時資訊查詢</h1>
            <p class="text-gray-600">
                資料來源：
                <a class="text-gray-400" href="https://data.gov.tw/dataset/137993" target="_blank"
                >政府資料開放平台</a
                >
            </p>
            </div>
            <!-- 表單 -->
            <form id="searchForm" @submit.prevent="handleSubmit">
            <div class="flex items-center space-x-4">
                <!-- 輸入框 -->
                <input
                v-model.trim="query"
                type="text"
                class="flex-grow p-3 border border-gray-300 rounded-lg text-xl"
                id="searchKeyword"
                placeholder="輸入關鍵字搜尋路名，例如：八德路"
                />
                <button type="submit" class="bg-yellow-400 text-white p-3 rounded-lg text-xl hover:bg-yellow-600">
                搜尋
                </button>
            </div>
            </form>
    
            <ul class="siteList space-y-4 overflow-scroll">
            <!-- 搜尋結果 -->
                <li v-for="site in filteredSites" :key="site.id" class="list-group-item fs-5">
                    <i class="fa-solid fa-bicycle"></i>
                    {{ site.sna.replace("YouBike2.0_", "") }} ({{ site.available_rent_bikes }})<br />
                    <small class="text-muted">{{ site.ar }}</small>
                </li>
            </ul>
        </main>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    
    const query = ref('');
    const sites = ref([]);
    const filteredSites = ref([]);
    
    const handleSubmit = () => {
        if (query.value.trim() !== '') {
        const api = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';
    
        fetch(api)
            .then(response => response.json())
            .then(data => {
            sites.value = data;
            filteredSites.value = sites.value.filter(site => site.ar.includes(query.value.trim()));
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        }
    };
</script>

<style scoped>

</style>

