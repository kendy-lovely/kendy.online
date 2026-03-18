<script lang="ts">
    type Author = {
        handle: string;
        displayName: string;
        pfp: string;
    }
    import linkifyHtml from "linkify-html";
    import dateFormat from "dateformat";
    import type {} from '@atcute/bluesky';
    let { data } = $props<{ data: any | null }>();
    const author: Author = $derived(data.author);
    const posts = $derived(() => {
        if (!data?.posts) return [];
        return data.posts.map((post: any) => {
            post.value.text = linkifyHtml(post.value.text, { defaultProtocol: "https", target: "_blank" })

            const imgs: any[] = post.value.embed?.images;
            if (!imgs) return post;
            const newPost = structuredClone(post);
            for (const img of imgs) {
                newPost.value.text += 
                    `<br>
                    <div style="margin:auto;width:50%;aspect-ratio: 1;background-image:url(https://blacksky.app/xrpc/com.atproto.sync.getBlob?did=did%3Aplc%3A67y2btce7men5zg4eryuquqf&cid=${img.image.ref.$link as string});background-repeat:no-repeat;background-position:center;background-size:cover;""></div>`
            }

            return newPost;
        })
    });
</script>

<style>
    .microblog {
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        gap:5px;
    }
    .microblogpost {
        display:flex;
        flex-direction:column;
        border:solid+2px;
        width:32%;
        min-height:150px;
        max-height:fit-content;
        text-align:center;
    }
    @media (max-width: 1080px) {
    .microblog {
        display:flex;
        flex-direction:column;
        gap:4px;
    }
    .microblogpost {
        width: 99%
    }
}
</style>

<h1>my microblog ^w^</h1>
<p>its tied to <a href="https://bsky.app/profile/{author.handle}">@{author.handle}</a> on bsky ! any posts tagged with "#microblog" goes here !!</p>
<div class="microblog">
    {#each posts() as post}
    <div class="microblogpost">
        <div style="display:flex;flex-direction:row;height:48px;">
            <div style="display:flex;align-items:center;justify-content:center;flex:0.6;overflow:hidden;">
                <a href="https://bsky.app/profile/{author.handle}"><img style="object-fit:cover;width:100%;" src="https://blacksky.app/xrpc/com.atproto.sync.getBlob?did=did%3Aplc%3A67y2btce7men5zg4eryuquqf&cid={author.pfp}" alt="@{author.handle}"></a>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;text-align:center;flex:1">
                <a href="https://bsky.app/profile/{author.handle}/post/{post.uri.split('/').at(-1)}">
                    <strong>
                        <p style="font-size:0.6em;margin:0px 0px">On {@html dateFormat(new Date(post.value.createdAt), "dddd,<br>mmmm dS, yyyy")},</p>{author.displayName} said...
                    </strong>
                </a>
            </div>
        </div>
        <div style="border:solid+0.5px"></div>
        <div style="width:95%;margin:auto;height:75%;text-align:left">
            <p style="margin-top:4px;font-size:0.95em">{@html post.value.text.replaceAll(/\s+#microblog/g, "").replaceAll("\n", "<br>")}</p>
        </div>
    </div>
    {/each}
</div>
