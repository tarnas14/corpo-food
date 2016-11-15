import test from 'tape-catch';
import sinon from 'sinon';

import Order from '../../src/models/order';
import {list} from '../../src/controllers/orders';

const stubShit = () => {
    sinon.stub(Order, 'find');
};

const resetStubs = () => {
    Order.find.restore();
};

const beforEach = () => {
    // resetStubs();
    stubShit();
};

const getOrderWithId = id => ({
    _id: id,
    meals: [],
});

test('should be able to stub mongoose find', t => {
    beforEach();

    const ordersInDb = [getOrderWithId('a'), getOrderWithId('b')];

    Order.find.yields(null, ordersInDb);
    const req = {};
    const res = {json: sinon.spy()};

    list(req, res);

    t.true(res.json.calledOnce);
    const listedOrders = res.json.args[0][0];

    t.deepEqual(listedOrders.map(o => o.id), ['a', 'b']);
    t.end();
});
