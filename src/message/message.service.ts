import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";


@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async create(_messageId: string, _user: string, _message: string): Promise<Message> {
        const newMessage = new this.messageModel({messageId: _messageId, user: _user, message: _message});
        return newMessage.save();
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}