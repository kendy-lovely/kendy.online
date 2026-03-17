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

export async function load() {
    type BlogPost = {
        rkey: string;
        title: string;
        date: string;
    }
    const result = await fetchPosts();

    const postTitles: BlogPost[] = result
        .filter((p) => p.value.visibility == "public")
        .map((p) => { 
            let rkey = (p.uri as string).split('/').pop();
            rkey ||= "404"
            return {
                rkey: rkey,
                title: p.value.title as string,
                date: new Date(p.value.createdAt as string).toISOString().split('T')[0]
            }
        });
    if (!postTitles) return { posts: null };

	return { posts: postTitles };
}