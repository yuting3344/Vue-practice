import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles.css'; // 引入生成的 Tailwind CSS 文件
import YouBike from './components/YouBike.vue';

createApp(App).component('YouBike', YouBike).mount('#app');
