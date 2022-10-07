import { ArkeosMonacoEditor } from "./components/arkeos-monaco-editor.xtag";
export { ArkeosMonacoEditor } from "./components/arkeos-monaco-editor.xtag";

declare var xtag: any;

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

function registerComponent(webComponent: string, newComponent: any) {
    let component: any = customElements.get(webComponent);
    if(component) {
        if(component.version < newComponent.version) {
            xtag.create(webComponent, newComponent);
        }
    } else {
        xtag.create(webComponent, newComponent);
    }   
}

registerComponent('arkeos-monaco-editor', ArkeosMonacoEditor);
