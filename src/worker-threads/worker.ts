import { NestFactory } from '@nestjs/core';
import { parentPort } from 'worker_threads';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { hello } from '@library/something';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  appService.checkMainThread();
  parentPort.postMessage(`Hello from worker thread ${hello}`);
}

run();
