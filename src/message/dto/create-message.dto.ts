import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";

import { User } from "../type/user.type";

export class CreateMessageDTO {
    @ApiProperty({
        description: "unique message id (uuid)"
    })
    @IsDefined()
    @IsString()
    @MinLength(1)
    messageId: string;

    @ApiProperty({
        description: "owner of message",
        examples: ["human", "bot"]
    })
    @IsDefined()
    @IsString()
    @MinLength(1)
    user: User;

    @ApiProperty({
        description: "content of the message",
        example: "this is a sample message content"
    })
    @IsDefined()
    @IsString()
    @MinLength(1)
    message: string;
};