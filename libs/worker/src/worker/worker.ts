import { NestFactory } from '@nestjs/core';
import { parentPort } from 'worker_threads';
import { hello } from '@app/other';
import { WorkerModule } from '../worker.module';

async function run() {
  await NestFactory.createApplicationContext(WorkerModule);

  parentPort.postMessage(`Hello from worker thread ${hello}`);
}

run();
