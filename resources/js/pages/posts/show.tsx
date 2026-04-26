import AppLayout from "@/layouts/app-layout";
import {Post, Comment} from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import {Deferred, usePoll} from "@inertiajs/react";
import {useEffect, useRef} from "react";
import {toast} from "sonner";
import CommentList from "@/components/comment-list";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function PostsShow({ post, comments }: PostsShowProps)
{
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentCountRef = useRef(comments?.length ?? 0);
    const imCommentAuthor = useRef(false);

    const scrollToComments = () =>
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    usePoll(3000, {
        only: ["comments"],
    });

    useEffect(() => {
        const newCommentCount = comments?.length ?? 0;

        if (newCommentCount > commentCountRef.current) {
            if (commentCountRef.current > 0 && !imCommentAuthor.current) {
                toast("New comments are available", {
                    duration: 6000,
                    action: {
                        label: "View Comments",
                        onClick: scrollToComments,
                    }
                });
            }

            commentCountRef.current = newCommentCount;
            imCommentAuthor.current = false;
        }

    }, [comments]);

    const handleCommentAdded = () => {
        imCommentAuthor.current = true;

        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
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
                    <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                    </CardContent>
                </Card>

                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

                {/* Comments Section */}
                <div ref={commentsSectionRef}>
                    <Deferred
                        data="comments"
                        fallback={<CommentList comments={comments} />}
                    >
                        <CommentList comments={comments} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
