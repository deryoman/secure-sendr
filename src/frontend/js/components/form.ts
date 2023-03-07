const formTemplate = `
<form name="data" data-template-data-form>
    <textarea name="payload" rows="8"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
          placeholder="Paste your sensitive data here..." required></textarea>
    <div class="flex flex-row-reverse mt-2">
        <button class="bg-green-600 hover:bg-green-700 font-bold text-white py-2 px-4 rounded"
                type="submit">Create link
        </button>
    </div>
</form>
`

export class Form {
    private readonly root: HTMLElement
    private readonly submitCallback: (payload: string | null, e: SubmitEvent) => void;
    private readonly form: HTMLFormElement
    private readonly payloadTextArea: HTMLTextAreaElement

    constructor(root: HTMLElement, submitCallback: (payload: string | null, e: SubmitEvent) => void) {
        this.root = root
        this.submitCallback = submitCallback;
        this.root.innerHTML = formTemplate

        this.form = root.querySelector('[data-template-data-form]') as HTMLFormElement
        this.payloadTextArea = this.form.querySelector('textarea[name="payload"]') as HTMLTextAreaElement

        this.addEventListener()
    }

    private addEventListener() {
        this.form.addEventListener('submit', (e) => {
            this.submitCallback(this.payloadTextArea.value, e)
        })
    }
}