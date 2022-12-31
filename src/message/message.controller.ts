import { Body, Controller, HttpStatus, Post, Get, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

// schema import
import { Message } from "./message.schema";

// DTO import
import { CreateMessageDTO } from "./dto/create-message.dto";

// service import
import { MessageService } from "./message.service";


@ApiTags('Message')
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post('human')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: "creates a new message to the collection"})
    @ApiCreatedResponse({ description: "message successfully saved to database", type: Message })
    @ApiBadRequestResponse({ description: "message could not be saved" })
    @ApiUnauthorizedResponse({ description: "unauthorized access" })
    async PostHumanMessage(@Res() response, @Body() body: CreateMessageDTO) {
        const messageId = body.messageId;
        const user = body.user;
        const message = body.message;
        // find an answer from ML model based on the message text
        const newMessage = await this.messageService.create(messageId, user, message);
        if (!newMessage) {
            return response.status(HttpStatus.BAD_REQUEST).json({});
        }
        return response.status(HttpStatus.CREATED).json(newMessage);
    }


    @Post('bot')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: "creates a new message to the collection"})
    @ApiCreatedResponse({ description: "message successfully saved to database", type: Message })
    @ApiBadRequestResponse({ description: "message could not be saved" })
    @ApiUnauthorizedResponse({ description: "unauthorized access" })
    async PostBotMessage(@Res() response, @Body() body: CreateMessageDTO) {
        const messageId = body.messageId;
        const user = body.user;
        const message = body.message;
        const newMessage = await this.messageService.create(messageId, user, message);
        if (!newMessage) {
            return response.status(HttpStatus.BAD_REQUEST).json({});
        }
        return response.status(HttpStatus.CREATED).json(newMessage);
    }

    @Get()
    @ApiOperation({ summary: "gets all messages"})
    @ApiCreatedResponse({ description: "message successfully received from database", type: Message })
    @ApiBadRequestResponse({ description: "message not received" })
    @ApiUnauthorizedResponse({ description: "unauthorized access" })
    async GetAllMessages(@Res() response) {
        const allMessages = await this.messageService.findAll();
        if (!allMessages) {
            return response.status(HttpStatus.BAD_REQUEST).json({});
        }
        return response.status(HttpStatus.CREATED).json(allMessages);
    }
}