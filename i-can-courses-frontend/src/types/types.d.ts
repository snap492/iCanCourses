// src/types/types.d.ts
export { };

declare global {
    interface Window {
        chrome?: {
            webview?: {
                postMessage: (message: any) => void;
                addEventListener: (
                    event: string,
                    listener: (event: any) => void
                ) => void;
                removeEventListener: (
                    event: string,
                    listener: (event: any) => void
                ) => void;
            };
        };
    }
}
