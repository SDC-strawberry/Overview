import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    {duration: '30s', target: 20 },
    {duration: '1m30s', target: 10 },
    {duration: '20s', target: 0 },
  ],
};

export default function() {
  var url = 'http://localhost:3000/products/1';
  http.get(url);
}
