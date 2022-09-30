<script lang="ts">
    import type monaco from 'monaco-editor';
    import {onMount} from 'svelte';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    let divEl: HTMLDivElement = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;

    export let value = ''

    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new tsWorker();
            }
        };

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(divEl, {
            value,
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            wordWrap: 'wordWrapColumn',
            wordWrapColumn: 150,
            wrappingIndent: 'indent',
            fontSize: 16
        });

        editor.getModel().onDidChangeContent(e => value = editor.getValue())

        return () => {
            editor.dispose();
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
