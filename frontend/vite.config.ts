import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'
import { VitePWA } from 'vite-plugin-pwa'

// import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({ typescript: true }),
		// https://react-svgr.com/docs/rollup-plugin/
		svgr(),
		// ViteSvgSpriteWrapper({
		// 	// sprite 이미지 만들 입력 폴더
		// 	icons: './src/assets/svgs/*.svg',s
		// 	// sprite 이미지 출력 폴더
		// 	outputDir: 'public/icons',
		// 	// 옵션 : https://bit.ly/3EuIYDR
		// 	sprite: {},
		// }),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt'], // 추가적인 자산 파일들
			manifest: {
				name: 'Fastravel',
				short_name: 'Fastravel',
				description: '초패스트 여행계획',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			src: '/src',
		},
	},
	server: {
		https: {
			key: fs.readFileSync('D:/localhost-key.pem'),
			cert: fs.readFileSync('D:/localhost.pem'),
		},
	},
})
