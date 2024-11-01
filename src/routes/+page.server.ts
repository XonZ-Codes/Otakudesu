import type { PageServerLoad } from "./$types";
import { parseHTML } from "linkedom";
import type { AnimeCard } from "$lib/types";
import { baseUrl } from "$lib";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {

  setHeaders({
    "Cache-Control": `max-age: ${60 * 60 * 5}`
  })

  const onGoingUrl = `${baseUrl}/ongoing-anime`
  const res = await fetch(onGoingUrl)
  const html = await res.text()

  const { document } = parseHTML(html)

  let listAnime: Array<AnimeCard> = []
  const cards = document.querySelectorAll("div.venz > ul > li > div.detpost")
  cards.forEach(card => {
    const title = card.querySelector("h2.jdlflm")?.textContent ?? null
    if (!title) return

    const thumbnail = card.querySelector<HTMLImageElement>("div.thumbz > img")?.src ?? null
    if (!thumbnail) return

    const slug = card.querySelector<HTMLAnchorElement>("div.thumb > a")?.href ?? null
    if (!slug) return

    listAnime.push({
      id: crypto.randomUUID(),
      title: title.trim(),
      thumbnail,
      slug: slug.replace(baseUrl, "").replace("/", "").trim()
    })
  })

  return {
    listAnime
  }
}
