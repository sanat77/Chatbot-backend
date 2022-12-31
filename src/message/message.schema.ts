import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

import { User } from "./type/user.type";

export type MessageDocument = Message & Document;

@Schema({timestamps: true})
export class Message {

    @ApiProperty({
        description: "unique message id (uuid)"
    })
    @Prop({ unique: true })
    messageId: string;

    @ApiProperty({
        description: "owner of message",
        examples: ["human", "bot"]
    })
    @Prop()
    user: User;

    @ApiProperty({
        description: "content of the message",
        example: "this is a sample message content"
    })
    @Prop()
    message: string;
};

export const MessageSchema = SchemaFactory.createForClass(Message);