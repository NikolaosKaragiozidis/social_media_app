import AppLayout from "@/layouts/app-layout";
import {Post, Comment, PostLikesData} from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import {Deferred, InfiniteScroll, router, usePage, usePoll} from "@inertiajs/react";
import {useEffect, useRef} from "react";
import {toast} from "sonner";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";

interface PostsShowProps {
    post: Post;
    comments: {
        data: Comment[];
    };
    likes: PostLikesData;
    comments_count?: number;
}

export default function PostsShow({ post, comments, likes, comments_count }: PostsShowProps)
{
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentCountRef = useRef(comments_count ?? 0);
    const imCommentAuthor = useRef(false);
    const { url } = usePage();

    const scrollToComments = () =>
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    usePoll(3000, {
        only: ["comments_count", "likes"],
    });

    useEffect(() => {
        const newCommentCount = comments_count ?? 0;

        if (newCommentCount > commentCountRef.current) {
            if (commentCountRef.current > 0 && !imCommentAuthor.current) {
                toast("New comments are available", {
                    duration: 6000,
                    action: {
                        label: "View Comments",
                        onClick: () => {
                            router.visit(url, {
                                only: ["comments"],
                                reset: ["comments"],
                                preserveScroll: false,
                                onSuccess: () => scrollToComments(),
                            });
                        },
                    }
                });
            }

            commentCountRef.current = newCommentCount;
            imCommentAuthor.current = false;
        }

    }, [comments_count]);

    const handleCommentAdded = () => {
        imCommentAuthor.current = true;

        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });

        router.visit(url, {
            only: ["comments"],
            reset: ["comments"],
            preserveState: true,
        })
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {post.title}
                        </CardTitle>

                        <CardDescription>
                            By {post.user?.name} on {" "} {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                        <Deferred
                            data="likes"
                            fallback={
                                <LikeButton
                                    postId={post.id}
                                    count={likes?.count}
                                    liked={likes?.user_has_liked}
                                    isLoading={!likes}
                                />
                            }
                        >
                            <LikeButton
                                postId={post.id}
                                count={likes?.count}
                                liked={likes?.user_has_liked}
                            />
                        </Deferred>
                    </CardContent>
                </Card>

                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

                {/* Comments Section */}
                <div ref={commentsSectionRef}>
                    <InfiniteScroll data="comments">
                        <CommentList comments={comments.data} />
                    </InfiniteScroll>
                </div>
            </div>
        </AppLayout>
    );
}
