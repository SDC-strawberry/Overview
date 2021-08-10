import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    {duration: '5s', target: 5000 },
    {duration: '14s', target: 5000 },
    {duration: '3s', target: 0 },
  ],
};

let url;
let randId;
let randPage;

export default function() {
  randId = Math.floor(Math.random() * 10000);
  randPage = Math.floor(Math.random() * 1000);
//  url = `http://localhost:3000/products/${randId}`;
  url = `http://localhost:3000/products?page=${randPage}&count=5`;
//  url = `http://localhost:3000/products/${randId}/styles`;
//  url = `http://localhost:3000/products/${randId}/related`;
  http.get(url);
  sleep(1);
}
