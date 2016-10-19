import test from 'tape-catch';

import * as reducers from '../../../src/store/orders';

test('activeOrder should be fetching by default', t => {
    t.ok(reducers.activeOrder(undefined, {}).fetching);
    t.end();
})

test('activeOrder should have fetching set as true after FETCHING_ORDER', t => {
    const state = reducers.activeOrder({}, {type: 'FETCHING_ORDER'});

    t.true(state.fetching);
    t.end();
});

test('activeOrder should reset fetching to false after setting order with GET_ORDER', t => {
    const state = reducers.activeOrder({fetching: true}, {type: 'GET_ORDER', activeOrder: {hello: 'world'}});

    t.false(state.fetching);
    t.equal(state.hello, 'world');
    t.end();
});

