export class VideoId<T = number> {
    constructor(
        private id: T
    ) {}

    public get(): T {
        return this.id
    }
}