<script lang="ts">
	import type { PageServerData } from './$types';
	import { Root as CardRoot, Title, Content, Header } from '$lib/components/ui/card';
	import Card from '$lib/components/ui/card/card.svelte';

	const { data }: { data: PageServerData } = $props();

	const detailsAnime = $derived(data.detailsAnime);
</script>

	<h1 class="mb-5 max-w-lg text-2xl md:text-3xl font-semibold">Stream anime sub indo</h1>

	<div class="flex gap-5 flex-col md:flex-row">
		<CardRoot>
			<Content class="pt-6">
				<img
					class="mx-auto max-h-80 h-full w-auto rounded object-cover"
					src={detailsAnime.thumbnail}
					alt={detailsAnime.title}
				/>
			</Content>
		</CardRoot>

		<CardRoot class="grow">
			<Header>
				<Title>{detailsAnime.title}</Title>
			</Header>

			<Content>
				<CardRoot>
					<Content class="pt-6">
						<ul class="space-y-3">
							{#each detailsAnime.episodeList as item}
								{@const label = item.label.match(/Episode (\d+)/g)![0]}
								<li>
									<a class="hover:bg-muted rounded p-2 flex justify-between" href="/anime/episode/{item.slug}">
										<span>
											{label}
										</span>
										<span>
											{item.date}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					</Content>
				</CardRoot>
			</Content>
		</CardRoot>
	</div>
