import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    {duration: '30s', target: 20 },
    {duration: '1m30s', target: 10 },
    {duration: '20s', target: 0 },
  ],
  //vus: 10,
  //duration: '30s',
};

export default function() {
  http.get('https://test.k6.io');
  sleep(1);
}
