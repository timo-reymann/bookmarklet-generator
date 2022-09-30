<script lang="ts">
    import 'monaco-editor/esm/vs/editor/editor.all.js';

    import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
    import "monaco-editor/esm/vs/language/typescript/tsMode"
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    import {editor} from "monaco-editor/esm/vs/editor/editor.api"
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

    import {onMount} from 'svelte';

    let divEl: HTMLDivElement = null;

    export let value = ''

    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker()
                }
                return new editorWorker()
            }
        };


        let monacoEditor = editor.create(divEl, {
            value,
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            wordWrap: 'wordWrapColumn',
            wordWrapColumn: 150,
            wrappingIndent: 'indent',
            fontSize: 16,
            quickSuggestions: true
        });

        monacoEditor.getModel().onDidChangeContent(e => value = monacoEditor.getValue())

        return () => {
            monacoEditor.dispose();
        };
    });
</script>

<style>
    div {
        height: 100%;
        width: 100%;
    }
</style>

<div bind:this={divEl}/>
