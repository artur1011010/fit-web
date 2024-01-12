export interface Opinion {
    id: number;
    addedDate: string | null;
    userName: string | null;
    userEmail: string | null;
    rating: number;
    content: string | null;
}