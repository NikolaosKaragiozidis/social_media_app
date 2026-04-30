import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { InfiniteScroll } from "@inertiajs/react";
import PostCard from "@/components/post-card";

interface PostsIndexProps {
    posts: { data: Post[] };
}

export default function PostsIndex({ posts }: PostsIndexProps)
{
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                {posts.data.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No posts were found.</p>
                    </div>
                ) : (
                    <div>
                        <InfiniteScroll data="posts">
                            {posts.data.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </InfiniteScroll>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
