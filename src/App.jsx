import { useState } from 'react'
import './App.css'

function App() {

    const [url, setUrl] = useState("")
    const [shortenedUrl, setShortenedUrl] = useState("")
    const [zeroWidthUrl, setZeroWidthUrl] = useState("")

    const shorten = async () => {
        const response = await fetch('/short', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        const data = await response.json()
        setShortenedUrl(`${window.location.href}${data.shortUrl}`)
        setZeroWidthUrl(`${window.location.href}${data.zeroWidthUrl}`)
    }

    return (
        <>
            <div id={"App"}>
                <span id={"Title"}>SİKTİRT.ME</span>
                <span id={"SubTitle"}>Hızlı, Güvenli, Kısa.</span>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    shorten()
                }}>
                    <input id={"URLInput"} type={"url"} value={url} onChange={(e) => {
                        setUrl(e.target.value)
                    }} placeholder={"https://sikerler.online"}
                    />
                    <button id={"ShortenButton"} type={"submit"}>Kısalt</button>
                </form>
                {shortenedUrl.length > 0 ? <span id={"ShortenedURLCopy"} onTouchStart={() => {
                    navigator.clipboard.writeText(shortenedUrl)
                }} onClick={() => {
                    navigator.clipboard.writeText(shortenedUrl)
                }}>Kısa linki kopyalamak için tıkla: {shortenedUrl}</span> : null}
                
                {zeroWidthUrl.length > 0 ? <span id={"ShortenedURLCopy"} onTouchStart={() => {
                    navigator.clipboard.writeText(zeroWidthUrl)
                }} onClick={() => {
                    navigator.clipboard.writeText(zeroWidthUrl)
                }}>Sıfır uzunluk linki kopyalamak için tıkla: {zeroWidthUrl}</span> : null}
            </div>

        </>
    )
}

export default App
