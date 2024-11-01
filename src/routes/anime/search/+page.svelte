<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card';

	const { data }: { data: PageServerData } = $props();
	const searchResults = $derived(data.searchResults);
</script>

<h1 class="mb-5 text-2xl font-semibold md:text-4xl">Search results</h1>

<Card.Root>
	<Card.Header>
		<Card.Title>Found anime {`(${searchResults.length})`}</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-3">
		{#each searchResults as item}
			<Card.Root>
				<Card.Content class="pt-6">
					<a href="/anime/{item.slug}" class="flex items-center gap-5 transition hover:opacity-80">
						<img src={item.thumbnail} class="h-40 rounded shadow" alt={item.title} />
						<h2 class="textsm md:text-lg font-semibold">{item.title}</h2>
					</a>
				</Card.Content>
			</Card.Root>
		{/each}
	</Card.Content>
</Card.Root>
