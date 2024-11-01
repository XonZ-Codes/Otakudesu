<script lang="ts">
	import type { AnimeCard } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { Search } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';

	const { data }: { data: { listAnime: Array<AnimeCard> } } = $props();

	let activeInput = $state(false);
	let searchValue = $state('');

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		goto(`/anime/search?q=${searchValue.split(' ').join('+')}`);
	};
</script>

<div class="flex items-star justify-between">
	<h1 class="mb-5 text-3xl font-bold">Welcome to Animeinz</h1>
	<Button onclick={() => (activeInput = !activeInput)}><Search class="mr-2 size-4" />Search</Button>
</div>
{#if activeInput}
	<form onsubmit={handleSubmit} class="flex gap-3">
		<Input placeholder="Enter anime title here.." bind:value={searchValue} class="mb-5" />
	</form>
{/if}

<h2 class="mb-2 text-lg font-normal">Latest release on-going anime</h2>
<div class="grid grid-cols-2 gap-5 gap-y-10 md:grid-cols-4">
	{#each data.listAnime as anime}
		<a href={anime.slug} class="flex flex-col gap-1 transition hover:opacity-80">
			<img
				class="max-h-80 min-h-60 w-full rounded object-cover shadow"
				src={anime.thumbnail}
				alt={anime.title}
			/>
			<p class="line-clamp-2">{anime.title}</p>
		</a>
	{/each}
</div>
