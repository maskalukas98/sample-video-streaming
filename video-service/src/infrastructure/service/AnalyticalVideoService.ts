import {AnalyticalServicePort} from "../../domain/port/output/AnalyticalServicePort";
import {VideoId} from "../../domain/valueObject/VideoId";
import axios from "axios";
import {contextManager} from "../../httpServer";
import config from "../../config/env";

export class AnalyticalVideoService implements AnalyticalServicePort {
    constructor(
        private analyticalServiceUrl: string
    ) {}

    public async getTotalViews(videoId: VideoId): Promise<{ totalViews: number }> {
        try {
            const response = await axios.get(`${this.analyticalServiceUrl}/${videoId.get()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'traceId': contextManager.getStore().get("traceId")
                }
            });

            return { totalViews: parseInt(response.data.totalViews, 10) };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    console.warn(`Video with ID ${videoId.get()} not found.`);
                }
                console.error('Error fetching total views:', error.message);
            } else {
                console.error('Error:');
            }

            return { totalViews: 0 }
        }
    }
}