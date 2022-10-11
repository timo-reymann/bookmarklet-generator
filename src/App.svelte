<script lang="ts">
    import Editor from "./lib/Editor.svelte";
    import BookmarkletCode from "./lib/BookmarkletCode.svelte";
    import ForkMeCorner from "./lib/ForkMeCorner.svelte";

    const getWindowURL = () => new URL(window.location)

    const updateCode = (code: string) => {
        const url = getWindowURL()
        url.searchParams.set("code", btoa(code))
        history.replaceState(null, "", url.toString())
    }

    const getCodeFromURL = () => {
        const url = getWindowURL()

        if(!url.searchParams.has("code")) {
            return "// Replace with your code \n\nalert('Hello World')\n";
        }

        return atob(url.searchParams.get("code"))
    }

    let value = getCodeFromURL()

    $: {
        updateCode(value)
    }
</script>
<header>
    <h1>Bookmarklet Generator</h1>
</header>
<main>
    <div class="editor-wrapper">
        <Editor bind:value={value}></Editor>
    </div>
    <BookmarkletCode bind:code={value}></BookmarkletCode>
    <ForkMeCorner></ForkMeCorner>
</main>

<style>
    header {
        background: var(--secondary);
        color: white;
        padding: 10px;
        text-align: center;
        font-size: 2rem;
    }

    main {
        height: auto;
        width: 90%;
        margin: 1rem auto auto;
    }

    .editor-wrapper {
        height: 300px;
    }
</style>
