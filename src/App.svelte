<script lang="ts">
	import { seedDexie, fetchTodosFromDexie } from './dexie';
	import { seedTriplit, fetchTodosFromTriplit } from './triplit';
</script>

<main>
	<div>
		Dexie
		<button on:click={seedDexie}>Seed Dexie</button>
		<button on:click={fetchTodosFromDexie}>Fetch Todos from Dexie</button>
	</div>
	<div>
		Triplit
		<button on:click={seedTriplit}>Seed Triplit</button>
		<button on:click={fetchTodosFromTriplit}>Fetch Todos from Triplit</button>
	</div>
</main>

<style>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
		color: #888;
	}
</style>
