export interface ITodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface IJournal {
    id: number;
    title: string;
    entry: string;
    created_at: string;
    updated_at: string;
}
export interface TData {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface JData {
    title?: string;
    description?: string;
    completed?: boolean;
}
