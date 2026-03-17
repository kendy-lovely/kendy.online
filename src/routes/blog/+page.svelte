<script lang="ts">  
    type BlogPost = {
        rkey: string;
        title: string;
        date: string;
    }
    const { data } = $props<{ data: { posts: BlogPost[] | null } }>();   
</script>

<h1>Hey this is the blog or something idk</h1>
{#each data.posts as post}
    <ul>
        <li><a href="/blog/{post.rkey}">[{post.date}] - {post.title}</a></li>
    </ul>
{/each}