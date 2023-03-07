const resultTemplate = `
    <textarea data-template-result-textarea name="payload" rows="12"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
          readonly></textarea>
`

export class Result {
    private readonly root: HTMLElement
    private readonly textArea: HTMLTextAreaElement

    private data: string = ''

    constructor(root: HTMLElement) {
        this.root = root
        this.root.innerHTML = resultTemplate

        this.textArea = root.querySelector('[data-template-result-textarea]') as HTMLTextAreaElement
    }

    setResult(data: string) {
        this.data = data
        this.render()
    }

    private render() {
        this.textArea.value = this.data
    }
}