import {copyToClipboard} from "../utilities/clipboard";

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

const linkTemplate = `
<div class="relative">
    <span class="absolute inset-y-0 right-0 flex items-center border-l-2">
        <button type="button" data-template-link-button class="p-1 focus:outline-none focus:shadow-outline">
            ${copyToClipBoardReady}
        </button>
    </span>
    <input type="url" data-template-link-input
           class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 py-2 pr-10"
           placeholder="An error occurred"  autocomplete="off" readonly>
</div>
`

enum CopyToClipboardStatus {
    READY = "copy-to-clipboard",
    ERROR = "copy-to-clipboard-error",
    SUCCESS = "copy-to-clipboard-success"
}

export class Link {
    private readonly root: HTMLElement
    private readonly button: HTMLButtonElement
    private readonly input: HTMLInputElement

    private url: URL = new URL("http://localhost")
    private copyToClipBoardStatus: CopyToClipboardStatus = CopyToClipboardStatus.READY

    constructor(root: HTMLElement) {
        this.root = root
        this.root.innerHTML = linkTemplate

        this.button = root.querySelector('[data-template-link-button]') as HTMLButtonElement
        this.input = root.querySelector('[data-template-link-input]') as HTMLInputElement

        this.registerCopyToClipBoard()
    }

    setURL(url: URL) {
        this.url = url
        this.render()
    }

    setCopyToClipBoardStatus(status: CopyToClipboardStatus) {
        this.copyToClipBoardStatus = status
        this.render()
    }

    private render() {
        this.input.value = this.url.toString()

        Object.values(CopyToClipboardStatus).forEach(value => {
            this.button.classList.remove(value)
        })

        switch (this.copyToClipBoardStatus) {
            case CopyToClipboardStatus.ERROR:
                this.button.classList.add(CopyToClipboardStatus.ERROR.valueOf())
                this.button.innerHTML = copyToClipBoardError
                break
            case CopyToClipboardStatus.SUCCESS:
                this.button.classList.add(CopyToClipboardStatus.SUCCESS.valueOf())
                this.button.innerHTML = copyToClipBoardSuccess
                break
            default:
                this.button.innerHTML = copyToClipBoardReady
                break
        }

        setTimeout(() => {
            this.setCopyToClipBoardStatus(CopyToClipboardStatus.READY)
        }, 5000)
    }

    private registerCopyToClipBoard() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            copyToClipboard(this.input.value)
                .then(() => {
                    this.setCopyToClipBoardStatus(CopyToClipboardStatus.SUCCESS)
                })
                .catch(() => {
                    this.setCopyToClipBoardStatus(CopyToClipboardStatus.ERROR)
                })
        })
    }
}