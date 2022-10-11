<script lang="ts">
    export let code = ""

    $: {
        (() => updatePrefixedCode())(code)
    }

    let prefixedCode = ""
    const updatePrefixedCode = () => {
        const wrapped = `(function() {
            ${code}
        })()`
        prefixedCode = `javascript:${encodeURI(wrapped)}`
    }

    const execute = () => eval(code)
    const copyToClipboard = () => navigator.clipboard.writeText(prefixedCode)
    const addBookmark = () => {
        alert("1. Right click and copy link address\n" +
            "2. Create bookmark with URL")
    }
</script>
<style>
    pre {
        width: 100%;
        background: var(--light-background);
        padding: 10px;
        overflow: auto;
    }

    .actions {
        display: flex;
        width: 100%;
        gap: 10px;
    }

    .actions > button,
    .actions > .button {
        flex: 1;
    }

    .button,
    button {
        text-align: center;
        text-decoration: none;
        display: inline-block;
        background: var(--primary);
        border: none;
        padding: 10px;
        cursor: pointer;
        transition: all .1s;
        color: var(--foreground-dark-background);
        font-weight: 500;
    }

    button:hover,
    .button:hover {
        background: var(--primary-hover)
    }

    pre {
        font-size: 15px;
    }

    @media (prefers-color-scheme: dark) {
        pre {
            background: #444c56;
        }
    }
</style>

<div class="wrapper">
    <pre><code>{prefixedCode}</code></pre>
    <div class="actions">
        <button on:click={execute}>▶ Execute</button>
        <button on:click={copyToClipboard}>📋 Copy to clipboard</button>
        <a class="button" on:click={addBookmark} href={prefixedCode}>💾 Save</a>
    </div>
</div>
