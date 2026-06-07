import { Client, ok, simpleFetchHandler} from '@atcute/client';
import type {} from '@atcute/bluesky';
import type {} from '@atcute/atproto';
type Author = {
    handle: string;
    displayName: string;
    pfp: string;
}

async function fetchMicroBlog() {
    const rpc = new Client({ handler: simpleFetchHandler({ service: "https://blacksky.app"}) });
    const response = await rpc.get('com.atproto.repo.listRecords', {
        params: {
            repo: 'did:plc:67y2btce7men5zg4eryuquqf',
            collection: 'app.bsky.feed.post'
        }
    });
    const posts = response.ok ? response.data.records : [];
    return posts.filter((post: any) => /#microblog/g.test(post.value.text))
}

async function fetchAuthor() {
    const rpc = new Client({ handler: simpleFetchHandler({ service: "https://blacksky.app"}) });

    const self = await ok(rpc.get('com.atproto.repo.listRecords', {
        params: {
            repo: 'did:plc:67y2btce7men5zg4eryuquqf',
            collection: 'app.bsky.actor.profile'
        }
    }));
    const repo = await ok(rpc.get('com.atproto.repo.describeRepo', {
        params: {
            repo: 'did:plc:67y2btce7men5zg4eryuquqf'
        }
    }));

    const author: Author = {
        handle: repo.handle,
        displayName: self.records[0].value.displayName as string,
        pfp: (self.records[0].value.avatar as any).ref.$link as string,
    }
    return author
}

export const load = async () => {
    const posts = await fetchMicroBlog();
    const author: Author = await fetchAuthor();

    if (!posts || !author ) return { posts: null, author: null };

	return { posts: posts, author: author };
}