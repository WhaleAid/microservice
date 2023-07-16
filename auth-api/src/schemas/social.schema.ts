import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Social>;

@Schema()
export class Social {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const SocialSchema = SchemaFactory.createForClass(Social);
