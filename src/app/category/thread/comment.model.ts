import { User } from "src/app/shared/user.model";

export class Comment {
    id: number;
    content: string;
    datetime: string;
    user: User;
}