import { Client, simpleFetchHandler } from '@atcute/client';
import type {} from '@atcute/bluesky';
import type {} from '@atcute/atproto';

const rpc = 
    new Client({ handler: simpleFetchHandler({ service: 'https://blacksky.app' }) });

const fetchPosts = 
    async () => rpc
        .get('com.atproto.repo.listRecords', {
            params: {
                repo: 'did:plc:67y2btce7men5zg4eryuquqf',
                collection: 'com.whtwnd.blog.entry'
            }})
        .then(res => res.ok ? res.data.records : []);

export const entries = 
    async () => fetchPosts()
        .then(posts => 
            posts.map(post => 
                (rkey => 
                    !rkey || post.value.visibility == "author" ?
                        { rkey: "404" } :
                        { rkey })
                (post.uri.split("/").pop())));

export const load = 
    async ({ params }) => fetchPosts()
    .then(posts => 
        (post =>
            post ? 
                { post } : 
                { post: null })
        (posts.find(p => 
            p.uri.split('/').pop() == params.rkey && p.value.visibility != "author")));