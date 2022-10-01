import * as monaco from 'monaco-editor';

declare var XTagElement: any;

export class ArkeosMonacoEditor extends XTagElement  {
    static version = "2022.1001.951"
    public host: HTMLElement;

    public editor: monaco.editor.IStandaloneCodeEditor;

    public promise = new Promise<void>((resolve) => resolve());
    private resizeObserver = new ResizeObserver(entries => entries.forEach((entry) => this.resize(entry)));

    private _options = {
        language: 'text',
        value: '',
        automaticLayout: true,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        theme: 'vs-dark'
    };

    //Attributes
    private _language: string;
    set 'language::attr'(val: string) {
        this._language = val || 'text';
        if(this.editor) {
            monaco.editor.setModelLanguage(this.editor.getModel(), this._language);
        } 
    }

    get 'language::attr'(): string {
        return this.editor.getModel().getLanguageId();
    }

    set 'options::attr'(val: monaco.editor.IEditorOptions & monaco.editor.IGlobalEditorOptions) {
        if(typeof(val) === "string") {
            val = JSON.parse(val);
        }

        this._options = val as unknown as any;

        this.editor?.updateOptions(val);
    }

    get 'options::attr'(): monaco.editor.IEditorOptions & monaco.editor.IGlobalEditorOptions {
        return this.editor.getOptions() as monaco.editor.IEditorOptions;
    }

    '::template'() {
        return `<div style="width: 100%; height: 100%; display: block; overflow: none;"></div>` 
    }

    constructor() {
        super();

        this.host = this as unknown as HTMLElement;
        this.host.setAttribute("style", "width: 100%; height: 100%; overflow: none;")

        this._options.language = this._language;
        this._options.value = this.host.querySelector('pre')?.textContent || this.host.textContent || '';

        this.render().then(() => {
            this.editor = monaco.editor.create(this.host.firstElementChild as HTMLElement, this._options);            
        }).then(() => this.language = this._language);

        this.resizeObserver.observe(this.host);
    }

    resize(e: ResizeObserverEntry) {
        this.editor.layout();
    }
}