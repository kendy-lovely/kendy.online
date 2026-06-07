<script lang="ts">
    import { marked } from 'marked';   
    marked.use({ renderer: {
        ...new marked.Renderer(), 
        image: ({ href, title, text }) => `<img src="${href}" alt="${text}" title="${title || ''}"><br>`
    }});

    let props = $props<{ data: { post: any | null } }>();
    const post = props.data.post;

    const res = !post ? 
        "<h2>post not found ... 404 or something ...</h2>" :
        marked
        .parse("# " + post.value.title + "\n" + post.value.content, { async: false })
        .replaceAll("puffball.us-east.host.bsky.network", "blacksky.app")
</script>

{@html res}