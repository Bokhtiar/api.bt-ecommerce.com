"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqCategoryConsumer = void 0;
const rabbitmq_config_1 = require("../../../config/rabbitmq.config");
const category_service_1 = require("../../../services/admin/category.service");
const mqCategoryConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    const queueName = "category";
    console.log(queueName);
    /* establish connection */
    const connection = yield (0, rabbitmq_config_1.mqConnection)();
    console.log("connection create asdfa asdfasd ");
    if (connection) {
        /* create a channel */
        const channel = yield connection.createChannel();
        /* consume message from the queue */
        const consumer = (channel) => __awaiter(void 0, void 0, void 0, function* () {
            return (msg) => {
                if (msg) {
                    const parsedData = JSON.parse(msg.content.toString());
                    console.log('consumer ready');
                    /* update or create to database */
                    const documents = {
                        name: parsedData.name,
                        icon: parsedData.icon,
                        banner_image: parsedData.banner_image
                    };
                    category_service_1.adminCategoryService.categoryCreate({ documents });
                    /* Acknowledge the message */
                    channel.ack(msg);
                }
            };
        });
        yield channel.consume(queueName, yield consumer(channel));
    }
});
exports.mqCategoryConsumer = mqCategoryConsumer;
