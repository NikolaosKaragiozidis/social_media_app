import AppLayout from "@/layouts/app-layout";
import {Form} from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {InputError} from "@/components/input-error";
import {update} from "@/actions/App/Http/Controllers/PostController";
import {Post} from "@/types";

interface PostEditProps {
    post: Post;
}

export default function PostsEdit({post}: PostEditProps)
{
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>Edit an existing post</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={update(post.id)} className="space-y-4">
                        {({errors}) => (
                            <>
                                <div className="space-y-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title"
                                           name="title"
                                           type="text"
                                           aria-invalid={!!errors.title}
                                           defaultValue={post.title}
                                    />
                                    <InputError message={errors.title}/>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea id="body"
                                              name="body"
                                              aria-invalid={!!errors.body}
                                              defaultValue={post.body}
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
