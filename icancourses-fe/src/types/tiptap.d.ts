import '@tiptap/core';

declare module '@tiptap/core' {
    interface Commands<ReturnType = any> {
        columns: {
            insertColumns: (count?: number) => ReturnType;
            removeColumns: () => ReturnType;
        };
    }
}
