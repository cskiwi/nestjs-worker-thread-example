import { Controller, Get, Logger } from '@nestjs/common';
import { hello } from '@library/something';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  amIResponsive(): string {
    return 'Try calling this endpoint while the thread is calculating the fibonacci sum. If you receive this message it means the app is responsive. Call /runWorker?fibonacci=50 in a new tab and refresh this page.';
  }

  @Get('/runWorker')
  runWorker(): string {
    this.logger.log(`Hello ${hello}`);

    return this.appService.runWorker();
  }
}
