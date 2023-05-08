import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// resolve: {
	// 	dedupe: ['@fullcalendar/common']
	// },
	// optimizeDeps: {
	// 	include: ['@fullcalendar/common']
	// }
	server:{
		proxy: {	//	스벨트가 스프링 서버에 접근하도록 포트 연동
			'/api': {	//	api 호출에 대해서 서버에서 처리하도록 설정
				target: 'http://localhost:8080/',
				changeOrigin: true
			}
		},
		port:8000,
		strictPort:false,
	},
});
