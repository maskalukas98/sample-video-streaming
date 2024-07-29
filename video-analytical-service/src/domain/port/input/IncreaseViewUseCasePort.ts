export interface IncreaseViewUseCasePort {
    execute: (videoId: number) => Promise<void>;
}