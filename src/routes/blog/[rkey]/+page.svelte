<script lang="ts">
    import { marked } from 'marked';

    let res: string = $state("");
    let props = $props<{ data: { post: any | null } }>();
    const post = props.data.post;

    if (!post) {
        res = "<h2>no post found ... 404 or something ...</h2>"
    } else {
        const renderer = new marked.Renderer();
        renderer.image = function({ href, title, text }) {
            return `<img src="${href}" alt="${text}" title="${title || ''}"><br>`;
        }
        marked.use({ renderer });
        const title = marked.parse("# " + post.value.title as string, { async: false });
        const body = marked.parse(post.value.content as string, { async: false });
        res = (title + body).replaceAll("puffball.us-east.host.bsky.network", "blacksky.app")
    }
</script>

{@html res}