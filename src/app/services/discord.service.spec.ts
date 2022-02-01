/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscordService } from './discord.service';

describe('Service: Discord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscordService]
    });
  });

  it('should ...', inject([DiscordService], (service: DiscordService) => {
    expect(service).toBeTruthy();
  }));
});
