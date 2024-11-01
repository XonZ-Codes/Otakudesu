import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { baseUrl } from "$lib";
import { parseHTML } from "linkedom";

export const load: PageServerLoad = async ({ url, setHeaders }) => {

  setHeaders({
    "Cache-Control": `max-age: ${60 * 60 * 5}`
  })

  const query = url.searchParams.get("q")

  if (!query) return redirect(302, "/")
  const searchAnimeUrl = `${baseUrl}/?s=${query}&post_type=anime`
  const res = await fetch(searchAnimeUrl)
  const html = await res.text()
  const { document } = parseHTML(html)

  const searchResults: Array<{ title: string, slug: string, thumbnail: string | null }> = []
  const resultCards = document.querySelectorAll("ul.chivsrc > li")

  resultCards.forEach(card => {
    const thumbnail = card.querySelector<HTMLImageElement>("img")?.src ?? null
    const linkElement = card.querySelector<HTMLAnchorElement>("h2 > a")
    if (!linkElement) return
    const slug = linkElement.href.replace(`${baseUrl}/anime/`, "").trim()
    const title = linkElement.textContent!

    searchResults.push({ title, slug, thumbnail })
  })

  return {
    searchResults
  }
}
