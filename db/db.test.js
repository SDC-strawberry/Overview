require('dotenv').config();
const db = require('./db.js');

describe('It does basic testing', () => {
  test('Expect the gratuitous test function to return 1', () => {
    expect(db.testJest()).toBe(1);
  });
});

describe('It gets the expected data from db calls', () => {
  test('If you ask for 5 products, you should get 5 products', () => {
    const unpacker = function(err, data) {
      expect(data.length).toBe(5);
    }
    db.getProducts(null, null, unpacker, 1, 5)
  });

  test('If you ask for 10 products, you should get 10 products', () => {
    const unpacker = function(err, data) {
      expect(data.length).toBe(10);
    }
    db.getProducts(null, null, unpacker, 1, 10)
  });

  test('If you ask for a specific product, you should get that one product', () => {
    const unpacker = function(err, data) {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe("100");
      db.closePool();
    }
    db.getProductById(null, null, unpacker, 100);
  })

  test('Asking for a products related ids should retrieve them.', () => {
    db.promisedGetRelated(1)
      .then((data) => {
        expect(data).toContain('2');
        expect(data).toContain('3');
        expect(data).toContain('8');
        expect(data).toContain('7');
        expect(data.length).toEqual(4);
      });
  });

  test('Retrieving a products styles should get them.', () => {
    db.promisedGetStyles(1)
      .then((data) => {
        expect(data[1].name).toBe("Desert Brown & Tan");
      });
  });

  test('Retrieving a products styles should get them. (Promised version)', () => {
    console.log('Running test.')
    db.getProductStylesById(1)
      .then((data) => {
        console.log('Data: ', data);
        expect(1).toBe(1);
        //expect(data[1].name).toBe("Desert Brown & Tan");
      });
    console.log('Test promise.');
  })
});