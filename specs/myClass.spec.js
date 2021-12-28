var MyClass = require('../src/myClass');
var sinon = require('sinon');
var myObj = new MyClass();
var chai = require('chai');
var expect = chai.expect;

describe('Test suit', function () {    // test suit
    it('Test the add method', function () {
        expect(myObj.add(1, 2)).to.be.equal(3)
    });

    it('Spy the add method', function () {
        var spy = sinon.spy(myObj, "add");
        var arg1 = 10, arg2 = 20;
        myObj.callAnotherFn(arg1, arg2);
        // sinon.assert.calledTwice(spy);
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(10, 20)).to.be.true;
    });

    it('Spy the callback method', function () {
        var callback = sinon.spy();
        myObj.callTheCallback(callback);
        expect(callback.calledOnce).to.be.true;
    })
})



/* describe(a,b) — это самый простой способ сгруппировать тесты в Mocha. 
Мы можем объединять тесты в различные группы исходя из желаний. Функция принимает два аргумента:
a — имя тестовой группы,
b — функция обратного вызова. */