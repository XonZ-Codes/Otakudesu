import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { baseUrl } from "$lib";
import { parseHTML } from "linkedom";
import { getNonce, getStreamUrl } from "$lib/otakudesu";

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
  setHeaders({
    "Cache-Control": `max-age: ${60 * 60 * 5}`
  })

  const { slug } = params
  if (!slug) return error(404)

  const episodeAnimeUrl = `${baseUrl}/episode/${slug}`
  const res = await fetch(episodeAnimeUrl)
  const html = await res.text()

  const { document } = parseHTML(html)

  const resolutionCards = document.querySelectorAll("div.mirrorstream > ul")
  const resolutionResults: Array<{ quality: string, links: Array<{ provider: string, data: string }> }> = []


  for (const card of resolutionCards) {
    const resolutionText = card.className.slice(1)
    const linksElement = card.querySelectorAll<HTMLAnchorElement>("li > a")
    const linksContent: Array<{ provider: string, data: string }> = []

    for (const link of linksElement) {
      const data = link.dataset.content
      const provider = link.textContent
      if (!data || !provider) return
      linksContent.push({ provider, data })
    }

    resolutionResults.push({ quality: resolutionText, links: linksContent })
  }
  const title = document.querySelector("h1.posttl")?.textContent ?? "Unknown"

  return {
    title,
    linkStreamingAnime: resolutionResults
  }
}

export const actions: Actions = {
  getLinkStreaming: async ({ request }) => {
    const formData = await request.formData()
    const data = formData.get("data")
    if (!data) return fail(400)

    const nonce = await getNonce()
    if (!nonce) {
      return fail(400)
    }

    const decodedData = JSON.parse(atob(data as string)) as { id: number, i: number, q: string }

    const result = await getStreamUrl({
      id: decodedData.id,
      i: decodedData.i,
      q: decodedData.q,
      nonce
    })

    if (!result) return { success: false }

    return redirect(302, result)
  }
}


