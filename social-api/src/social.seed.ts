import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SocialService } from './social.service';

@Injectable()
export class SocialSeed {
  constructor(private readonly socialService: SocialService) {}

  @Command({
    command: 'create:social',
    describe: 'create a social',
  })
  async create() {
    const social = await this.socialService.createMany([{
      name: 'bananes',
      price: 100,
    },
    {
      name: 'pommes',
      price: 200,
    }
  ]);
    console.log(social);
  }
}
