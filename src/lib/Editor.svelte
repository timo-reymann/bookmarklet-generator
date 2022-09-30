<script lang="ts">
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

    import 'monaco-editor/esm/vs/editor/editor.all.js';
    import {editor} from "monaco-editor/esm/vs/editor/editor.api"

    import "monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/inlineCompletionsModel"
    import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';

    import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';

    import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';

    import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js';
    import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js';
    import "monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens"
    import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js';
    import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js';
    import 'monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/documentSymbols';

    import 'monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js';
    import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

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
