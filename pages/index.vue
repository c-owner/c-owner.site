<template>
	<div class="fixed top-0 left-0 w-full z-10 p-3 dark:text-white backdrop-filter backdrop-blur-sm flex flex-wrap">
		<div class="w-1/3">
			<!-- warning here! -->
			<a @click="menu" class="dark:text-white inline-block mt-1"><i data-feather="menu"></i></a>
			<!-- -->
		</div>
		<div class="w-1/3 text-center font-bold">
			<img src="https://nuxtjs.org/design-kit/colored-logo.svg" class="inline h-7 mr-1 -mt-2">
			<p class="inline text-2xl dark:(text-gray-200)">Nuxt<span class="text-green-400">3</span></p>
			<span class="inline ml-2 px-2 py-0.5 rounded bg-dark-300 text-xl">UI</span>
		</div>
		<div class="w-1/3 text-right">
			<a class="dark:text-white inline-block mt-1"><i data-feather="moon"></i></a>
		</div>
	</div>
</template>

<script setup>
const menu = () => {
	console.log('menu')
}
</script>
