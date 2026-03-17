import { Client, simpleFetchHandler } from '@atcute/client';
import type {} from '@atcute/bluesky';
import type {} from '@atcute/atproto';

async function fetchPosts() {
    const rpc = new Client({ handler: simpleFetchHandler({ service: 'https://blacksky.app' }) });
    const response = await rpc.get('com.atproto.repo.listRecords', {
        params: {
            repo: 'did:plc:67y2btce7men5zg4eryuquqf',
            collection: 'com.whtwnd.blog.entry'
        }
    });

    return response.ok ? response.data.records : [];
}

export async function entries() {
    const posts = await fetchPosts();
    return posts.map(post => { 
        let rkey = (post.uri as string).split("/").pop();
        if (!rkey || post.value.visibility == "author") rkey = "404";
        return {
            rkey: rkey
        }
    });
}

export async function load({ params }) {
    const result = await fetchPosts();
    const post = result.find((p) => (p.uri as string).split('/').pop() == params.rkey && p.value.visibility != "author")
    if (!post) return { post: null };

	return { post };
}