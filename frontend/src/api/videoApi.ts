
// create next type for GetDTO
import {config} from "../tempEnv";

export type Video = {
    qualities: number[],
    title: string,
    totalViews: number
}

export const getVideo = async (): Promise<Video> => {
    const response = await fetch(config.videoServiceUrl + '/video/1');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return {
        qualities: data.qualities,
        title: data.title,
        totalViews: data.totalViews,
    }
}
