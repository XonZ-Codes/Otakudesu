import { baseUrl } from "$lib";
import { parseHTML } from "linkedom";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, params, setHeaders }) => {

  setHeaders({
    "Cache-Control": `max-age: ${60 * 60 * 5}`
  })

  const { slug } = params
  const animeDetailsUrl = `${baseUrl}/anime/${slug}`

  try {
    const res = await fetch(animeDetailsUrl)
    const html = await res.text()
    const { document } = parseHTML(html)

    const title = document.querySelector("div.jdlrx > h1")?.textContent

    if (!title) {
      throw new Error("Not found")
    }

    const thumbnail = document.querySelector<HTMLImageElement>("div.fotoanime > img")!.src

    const episodeListElement = document.querySelectorAll("div.episodelist > ul > li")
    const episodeList: Array<{ label: string, slug: string, date: string }> = []

    episodeListElement.forEach(list => {
      const firstElement = list.firstChild?.firstChild as HTMLAnchorElement
      const lastElement = list.lastChild
      const link = firstElement.href
      const date = lastElement?.textContent
      if (!link.includes(`${baseUrl}/episode`) || !date) return

      episodeList.push({
        label: firstElement?.textContent ?? "",
        slug: link.replace(`${baseUrl}/episode/`, ""),
        date
      })
    })

    return {
      detailsAnime: {
        title,
        thumbnail,
        episodeList
      }
    }

  } catch (_) {
    return error(404)
  }

}
