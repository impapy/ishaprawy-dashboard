import { useState } from "react"

const useDownload = (
  urls: string[],
): { status: "idle" | "downloading" | "downloaded"; download: () => Promise<void> } => {
  const [status, setStatus] = useState<"idle" | "downloading" | "downloaded">("idle")

  const download = async () => {
    setStatus("downloading")
    for await (const url of urls) {
      const blob = await fetch(url).then((res) => {
        return res.blob()
      })

      const fr = new FileReader()

      fr.onloadend = () => {
        const anchor = document.createElement("a")
        anchor.setAttribute("href", fr.result as string)
        anchor.setAttribute("download", Date.now() + "")
        anchor.click()
      }

      fr.readAsDataURL(blob)
    }

    setStatus("downloaded")
  }

  return {
    status,
    download,
  }
}

export default useDownload
