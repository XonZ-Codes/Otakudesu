<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { ActionData, PageServerData } from './$types';
	import { enhance } from '$app/forms';

	const { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<!-- TODO: ErrorMessage -->
<!-- {#if form}
  
{/if} -->

<Card>
	<CardHeader>
		<CardTitle>Streaming list</CardTitle>
		<CardDescription>{data.title}</CardDescription>
	</CardHeader>
	<CardContent class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each data.linkStreamingAnime as links}
			<Card class="w-full">
				<CardHeader><CardTitle>{links.quality}</CardTitle></CardHeader>
				<CardContent class="space-y-2">
					{#each links.links as link}
						<form use:enhance action="?/getLinkStreaming" method="post">
							<input name="data" type="hidden" value={link.data} />
							<Button type="submit" class="w-full">{link.provider}</Button>
						</form>
					{/each}
				</CardContent>
			</Card>
		{/each}
	</CardContent>
</Card>
