import Queue from 'bull';
import { REDIS_URL } from '../config';

export const myQueue = new Queue('myQueue', REDIS_URL);

// Example processor
myQueue.process(async (job) => {
  console.log('Processing job:', job.data);
  return Promise.resolve();
});
