import { SetMetadata, applyDecorators } from "@nestjs/common";
import { SubscribeMessage } from "@nestjs/websockets";

export function SubscribeEvent(eventName: string) {
  return applyDecorators(
    SubscribeMessage(eventName),
    SetMetadata('eventName', eventName)
  )
}