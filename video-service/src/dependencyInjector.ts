import {StreamVideoRestController} from "./infrastructure/controller/StreamVideoRestController";
import {StreamVideoUseCase} from "./application/useCase/StreamVideoUseCase";
import {RedisVideoCacheRepository} from "./infrastructure/repository/RedisVideoCacheRepository";
import {PostgresVideoRepository} from "./infrastructure/repository/PostgresVideoRepository";
import {InternalVideoCdnService} from "./infrastructure/service/InternalVideoCdnService";
import {GetVideoDetailUseCase} from "./application/useCase/GetVideoDetailUseCase";
import {AnalyticalVideoService} from "./infrastructure/service/AnalyticalVideoService";
import {KafkaAnalyticalMessageProducerService} from "./infrastructure/service/KafkaAnalyticalMessageProducerService";
import config from "./config/env";

const services = {
    InternalVideoCdnService: new InternalVideoCdnService(config.cdnBasePath),
    AnalyticalVideoService: new AnalyticalVideoService(config.analyticalServiceUrl),
    KafkaAnalyticalMessageProducerService: new KafkaAnalyticalMessageProducerService()
}

const repositories = {
    PostgresVideoRepository: new PostgresVideoRepository(),
    RedisCacheRepository: new RedisVideoCacheRepository()
}

const useCases = {
    StreamVideoUseCase: new StreamVideoUseCase(
        repositories.RedisCacheRepository,
        repositories.PostgresVideoRepository,
        services.InternalVideoCdnService
    ),
    GetVideoDetailUseCase: new GetVideoDetailUseCase(
        repositories.PostgresVideoRepository,
        services.AnalyticalVideoService,
        services.KafkaAnalyticalMessageProducerService
    )
}

export const controllers = {
    StreamVideoRestController: new StreamVideoRestController(
        useCases.StreamVideoUseCase,
        useCases.GetVideoDetailUseCase
    )
}