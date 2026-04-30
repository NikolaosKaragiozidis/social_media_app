import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Comment } from "@/types";
import { usePage } from "@inertiajs/react";
import CommentActionsDropdown from "@/components/comment-actions-dropdown";

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
    const { auth } = usePage<any>().props;

    const canEditComment = auth.user !== null && auth.user.id === comment.user_id;
    const canDeleteComment = auth.user !== null && auth.user.id === comment.user_id;

    return (
        <Card className="rounded-none border-b-0 last:border-b">
            <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                    <CardTitle className="text-base">
                        {comment.user?.name}
                    </CardTitle>
                    <CardDescription>
                        {new Date(comment.created_at).toLocaleDateString()}
                    </CardDescription>
                </div>

                <CommentActionsDropdown
                    commentId={comment.id}
                    canUpdate={canEditComment}
                    canDelete={canDeleteComment}
                />
            </CardHeader>
            <CardContent>{comment.body}</CardContent>
        </Card>
    );
}
