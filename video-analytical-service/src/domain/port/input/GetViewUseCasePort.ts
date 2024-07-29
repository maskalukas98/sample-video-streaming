
export interface GetViewUseCasePort {
    getById(videoId: number): Promise<number | undefined>;
}