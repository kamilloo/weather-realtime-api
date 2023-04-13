import {Container} from "inversify";
import {MessageController} from "./app/ws/Controllers/MessageController";
import {ForecastController} from "./app/ws/Controllers/ForecastController";
import {TrendController} from "./app/ws/Controllers/TrendController";
import {PlanningController} from "./app/ws/Controllers/PlanningController";
import {WebSocketHandler} from "./app/ws/WebSocketHandler";
import {ForecastService} from "./forecast/ForecastService";
import {IForecastApi} from "./forecast/contracts/IForecastApi";
import {FakeApi} from "./forecast/fake/FakeApi";
import {ForecastApi} from "./forecast/api/ForecastApi";
import {DailyForecastParser} from "./forecast/DailyForecastParser";
import TYPES from "./type";

const container = new Container()

container.bind<MessageController>(ForecastController).to(ForecastController);
container.bind<MessageController>(TrendController).to(TrendController);
container.bind<PlanningController>(PlanningController).to(PlanningController);
container.bind<WebSocketHandler>(WebSocketHandler).to(WebSocketHandler)
container.bind<ForecastService>(ForecastService).to(ForecastService)
container.bind<IForecastApi>(TYPES.FakeApi).to(FakeApi)
container.bind<IForecastApi>(TYPES.ForecastApi).to(ForecastApi)
container.bind<DailyForecastParser>(DailyForecastParser).to(DailyForecastParser)

export default container;