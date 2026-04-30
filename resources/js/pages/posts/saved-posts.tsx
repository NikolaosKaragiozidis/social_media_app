import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Post } from "@/types";
import PostCard from "@/components/post-card";

interface SavedPostsProps {
    posts: {
        data: Post[];
        links: any[];
    };
}

export default function SavedPosts({ posts }: SavedPostsProps) {
    return (
        <AppLayout>
            <Head title="My Saved Posts" />

            <div className="max-w-2xl mx-auto py-8 space-y-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Saved Posts</h1>
                    <p className="text-muted-foreground">
                        Your personal collection of bookmarked content.
                    </p>
                </div>

                {posts.data.length > 0 ? (
                    <div className="space-y-6">
                        {posts.data.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50/50">
                        <h3 className="text-lg font-medium text-gray-900">No saved posts yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            When you save a post, it will appear here for easy access.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
