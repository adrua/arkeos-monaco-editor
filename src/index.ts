import { ArkeosMonacoEditor } from "./components/arkeos-monaco-editor.xtag";
export { ArkeosMonacoEditor } from "./components/arkeos-monaco-editor.xtag";

declare var xtag: any;

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
