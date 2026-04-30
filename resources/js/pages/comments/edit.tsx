import AppLayout from "@/layouts/app-layout";
import {Form} from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {InputError} from "@/components/input-error";
import {update} from "@/actions/App/Http/Controllers/CommentController";
import {Comment} from "@/types";

interface CommentEditProps {
    comment: Comment;
}

export default function CommentsEdit({comment}: CommentEditProps)
{
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Comment</CardTitle>
                    <CardDescription>Edit an existing comment</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={update(comment.id)} className="space-y-4" method="patch">
                        {({errors}) => (
                        <>
                            <div className="space-y-3">
                                <Label htmlFor="body">Body</Label>
                                <Textarea id="body"
                                          name="body"
                                          aria-invalid={!!errors.body}
                                          defaultValue={comment.body}
                                />
                                <InputError message={errors.body}/>
                            </div>

                            <Button>Edit</Button>
                        </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
