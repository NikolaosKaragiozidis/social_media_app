import { Post } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Bookmark } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import PostActionsDropdown from "@/components/post-actions-dropdown";
import savePost from "@/actions/App/Http/Controllers/PostToggleSave";
import React from "react";

interface PostCardProps {
    post: Post;
    can?: {
        update: boolean;
        delete: boolean;
    };
}

export default function PostCard({ post, can }: PostCardProps) {

    const handleToggleSave = (e: React.MouseEvent) => {
        e.preventDefault();

        router.post(savePost(post.id), {}, { preserveScroll: true });
    };

    return (
        <Card className="rounded-none border-b-0">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle>
                            <Link href={`/posts/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </CardTitle>

                        <CardDescription>
                            By {post.user?.name} on {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={handleToggleSave}>
                            <Bookmark
                                className={`h-4 w-4 ${post.is_saved ? 'fill-current text-primary' : 'text-gray-500'}`}
                            />
                        </Button>

                        {can && (
                            <PostActionsDropdown
                                postId={post.id}
                                canUpdate={can.update}
                                canDelete={can.delete}
                            />
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-gray-700">
                    {post.body.substring(0, 200)}
                    {post.body.length > 200 && "..."}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Heart size={16} className="text-gray-400" />
                    <span>{post.likes_count ?? 0} likes</span>
                </div>
            </CardContent>
        </Card>
    );
}
