import { Injectable, Logger } from '@nestjs/common';
import { Worker, isMainThread } from 'worker_threads';
import { workerThreadFilePath } from '@app/worker';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  checkMainThread() {
    this.logger.debug(
      'Are we on the main thread here?',
      isMainThread ? 'Yes.' : 'No.',
    );
  }

  // do not run this from the worker thread or you will spawn an infinite number of threads in cascade
  runWorker(): string {
    this.checkMainThread();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const worker = new Worker(workerThreadFilePath, {});
    worker.on('message', (message) => {
      this.logger.verbose('message', message);
    });
    worker.on('error', (e) => this.logger.error('on error', e));
    worker.on('exit', (code) => this.logger.warn('on exit', code));

    return 'Processing the fibonacci sum... Check NestJS app console for the result.';
  }
}
