import { baseUrl } from "$lib"
import { parseHTML } from "linkedom";

type GetStreamLink = {
  id: number;
  i: number;
  q: string,
  nonce: string;
}

export const getNonce = async () => {
  const res = await fetch(`${baseUrl}/wp-admin/admin-ajax.php`, {
    method: "POST",
    body: new URLSearchParams({ action: "aa1208d27f29ca340c92c66d1926f13f" }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    }
  })

  if (!res.ok) {
    return null
  }

  const { data } = await res.json()
  return data as string
}

export const getStreamUrl = async ({ i, id, q, nonce }: GetStreamLink) => {
  const res = await fetch(`${baseUrl}/wp-admin/admin-ajax.php`, {
    method: "POST",
    body: new URLSearchParams({
      action: "2a3505c93b0035d3f455df82bf976b84",
      q: q,
      i: i.toString(),
      id: id.toString(),
      nonce
    }).toString(),
    headers: {
      "Origin": baseUrl,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    }
  })

  const data = await res.json()
  const html = atob(data.data)
  const { document } = parseHTML(html)

  const src = document.querySelector("iframe")?.src

  if (!src) return null

  return src
}
