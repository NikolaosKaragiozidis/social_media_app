import { Comment } from "@/types";
import CommentCard from "@/components/comment-card";
import LoadingCard from "@/components/loading-card";

interface CommentListProps {
    comments?: Comment[];
}

export default function CommentList({comments}: CommentListProps) {
    if (comments === undefined) {
        return <LoadingCard message="Loading comments..."/>;
    }

    if (comments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No comments yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
