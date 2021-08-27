import { User } from "../shared/user.model";
import { Comment } from "./thread/comment.model";

export class Thread {
    id: number;
    title: string;
    datetime: string;
    user: User;
    comments: Comment[];
}