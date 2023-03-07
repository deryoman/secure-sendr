import {boot} from "./utilities/boot";
import {copyToClipboard} from "./utilities/clipboard";
import {createShowUrl, getUrlPayload} from "./utilities/url";

const copyToClipBoardReady = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
</svg>
`

const copyToClipBoardSuccess = `
<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
   <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
   <path d="M9 14l2 2l4 -4"></path>
</svg>
`

const copyToClipBoardError = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
   <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
   <path d="M10 12l4 4m0 -4l-4 4"></path>
</svg>
`

enum CopyToClipboardStatus {
    READY = "copy-to-clipboard",
    ERROR = "copy-to-clipboard-error",
    SUCCESS = "copy-to-clipboard-success"
}

boot(async function () {
    const content = document.getElementById('content') as HTMLElement
    const urlPayload = getUrlPayload();

    if (urlPayload) {
        const button = content.querySelector('[data-template-link-button]') as HTMLButtonElement
        const input = content.querySelector('[data-template-link-input]') as HTMLInputElement

        input.value = createShowUrl(urlPayload).toString()
        button.innerHTML = copyToClipBoardReady

        const setCopyToClipBoardStatus = (status: CopyToClipboardStatus): void => {
            Object.values(CopyToClipboardStatus).forEach(value => {
                button.classList.remove(value)
            })

            switch (status) {
                case CopyToClipboardStatus.ERROR:
                    button.classList.add(CopyToClipboardStatus.ERROR.valueOf())
                    button.innerHTML = copyToClipBoardError
                    break
                case CopyToClipboardStatus.SUCCESS:
                    button.classList.add(CopyToClipboardStatus.SUCCESS.valueOf())
                    button.innerHTML = copyToClipBoardSuccess
                    break
                default:
                    button.innerHTML = copyToClipBoardReady
                    break
            }
        }

        button.addEventListener('click', (e) => {
            e.preventDefault()
            copyToClipboard(input.value)
                .then(() => {
                    setCopyToClipBoardStatus(CopyToClipboardStatus.SUCCESS)
                })
                .catch(() => {
                    setCopyToClipBoardStatus(CopyToClipboardStatus.ERROR)
                })

            setTimeout(() => {
                setCopyToClipBoardStatus(CopyToClipboardStatus.READY)
            }, 5000)
        })
    }

})