export const prerender = true
import type { RequestHandler } from "./$types";
import { Client, simpleFetchHandler } from '@atcute/client';
import { Feed } from 'feed'; 
import { marked } from 'marked';
import { encode } from 'html-entities';
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


export const GET: RequestHandler = async () => {
    let result = await fetchPosts();
    let lastUpdated: Date = new Date();
    const lastPost = result.at(0);
    if (lastPost) {
        lastUpdated = new Date(lastPost.value.createdAt as string);
    }
    result = result.filter((p) => p.value.visibility == "public")
    const feed = new Feed({
        title: "kendyrss !!",
        description: "this is the kendy's rss feed ,, feed ... yummy",
        link: "https://kendy.nekoweb.org/",
        language: "en",
        updated: lastUpdated,
    });

    result.reverse();
    result.forEach((post) => {
        const index = result.indexOf(post);
        feed.addItem({
            title: post.value.title as string,
            link: `https://kendy.nekoweb.org/blog/${(post.uri as string).split('/').pop()}`,
            id: `post no. ${index + 1}`,
            description: "another kendy post",
            content: encode(marked.parse(post.value.content as string, { async: false })),
            date: new Date(post.value.createdAt as string)
        });
    });

    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    };

    return new Response(feed.rss2(), { headers });
}