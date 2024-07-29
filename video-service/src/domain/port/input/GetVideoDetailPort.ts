import {GetVideoDetailResponse} from "../../../application/command/GetVideoDetail";


export interface GetVideoDetailPort {
    getById(videoId: number): Promise<GetVideoDetailResponse>
}
