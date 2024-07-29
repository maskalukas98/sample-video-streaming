import {KafkaViewConsumer} from "../infrastructure/consumer/KafkaViewConsumer";
import {IncreaseViewUseCase} from "../application/useCase/IncreaseViewUseCase";
import {CassandraVideoStatsRepository} from "../infrastructure/repository/CassandraVideoStatsRepository";
import {GetViewUseCase} from "../application/useCase/GetViewUseCase";
import {RestViewController} from "../infrastructure/controller/RestViewController";

const services = {
}

const repositories = {
    CassandraVideoStatsRepository: new CassandraVideoStatsRepository()
}

const useCases = {
    IncreaseViewUseCase: new IncreaseViewUseCase(repositories.CassandraVideoStatsRepository),
    GetViewUseCase: new GetViewUseCase(repositories.CassandraVideoStatsRepository)
}

export const controllers = {
    RestViewController: new RestViewController(useCases.GetViewUseCase)
}

export const consumers = {
    KafkaViewConsumer: new KafkaViewConsumer(useCases.IncreaseViewUseCase)
}