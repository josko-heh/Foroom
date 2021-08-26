import { Thread } from "./thread.model";

export class Category {
    id: number;
    name: string;
    threads: Thread[];
}