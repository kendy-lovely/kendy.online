import { Client, ok, simpleFetchHandler} from '@atcute/client';
import type {} from '@atcute/bluesky';
import type {} from '@atcute/atproto';
type Author = {
    handle: string;
    displayName: string;
    pfp: string;
}

const rpc = 
    new Client({ handler: simpleFetchHandler({ service: "https://blacksky.app" }) });

const fetchMicroBlog = 
    async () => rpc
        .get('com.atproto.repo.listRecords', {
                params: {
                    repo: 'did:plc:67y2btce7men5zg4eryuquqf',
                    collection: 'app.bsky.feed.post'
                }})
        .then(res => 
            res.ok ? 
                ok(res).records.filter((post: any) => /#microblog/g.test(post.value.text)) : 
                Promise.reject(new Error("unable to fetch microblog")))

const fetchAuthor = async (): Promise<Author> => 
    (({ self, repo }) => 
        !self || !repo ? 
            Promise.reject(new Error("unable to fetch author")) :
            {
                handle: repo.handle,
                displayName: self.records[0].value.displayName as string,
                pfp: (self.records[0].value.avatar as any).ref.$link as string,
            })
//  where 
    ({  
        self: await ok(rpc.get('com.atproto.repo.listRecords', { params: {
                repo: 'did:plc:67y2btce7men5zg4eryuquqf',
                collection: 'app.bsky.actor.profile'
            }}))
            .catch(_ => undefined),
        repo: await ok(rpc.get('com.atproto.repo.describeRepo', { params: { 
                repo: 'did:plc:67y2btce7men5zg4eryuquqf' 
            }}))
            .catch(_ => undefined)
    })

export const load = async () => 
    (({ posts, author }) =>
        (!posts || !author ) ?
            { posts: null, author: null } :
            { posts, author })
//  where
    ({
        posts: await fetchMicroBlog().catch(_ => undefined), 
        author: await fetchAuthor().catch(_ => undefined)
    })
