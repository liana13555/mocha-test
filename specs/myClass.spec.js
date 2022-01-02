var MyClass = require('../src/myClass');
var sinon = require('sinon');
var myObj = new MyClass();
var chai = require('chai');
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);
const nock = require("nock");

describe('Test suit', function () {
    after(function () {
        console.log("===================== After the test suit");
    })
    before(function () {
        console.log("===================== Before the test suit");
    });
    afterEach(function () {
        console.log("======= After each test case inside this test suit");
    });
    beforeEach(function () {
        // Sinon wrappers must be restored before or after a test case.
        // Hooks makes it easier implement
        sinon.restore();
        console.log("======= Before each test case inside this test suit");
    });
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

    it('copy spy the add method', function () {
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
    });

    it('Mock the sayHello method', function () {
        var mock = sinon.mock(myObj);
        var expectation = mock.expects('sayHello');
        expectation.exactly(1);
        expectation.withArgs('hello world');
        myObj.callAnotherFn(10, 20);
        mock.verify();
    })
});

describe.skip("Test suit for stub", function () {
    it("Stub the add method", function () {
        var stub = sinon.stub(myObj, "add");
        stub.withArgs(10, 20)
            .onFirstCall()
            .returns(100)
            .onSecondCall()
            .returns(200);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
    });
});

describe.skip("Test the promise", function () {
    it("Promise test case", function (done) {
        this.timeout(4000);
        myObj.testPromise().then(function (result) {
            expect(result).to.be.equal(6);
            done();
        });
    });
});

describe.skip("Test the promise", function () {
    it("Promise test case with chai-as-promised", function () {
        this.timeout(0);
        return expect(myObj.testPromise()).to.eventually.equal(6);
    });
});

describe("XHR test suit", function () {
    it("Mock and stub xhr call", function (done) {
        var obj = { id: 123 };
        const scope = nock("https://echo-service-new.herokuapp.com")
            .post("/echo")
            .reply(200, obj);
        myObj
            .xhrFn()
            .then(function (result) {
                // console.log(result);
                expect(result).to.be.eql(obj);
                // expect(result).to.be.eql({ id: 1234 });
                done();
            })
            .catch(error => {
                done(new Error("test case failed: " + error));
            });
    });
});



/* describe(a,b) — это самый простой способ сгруппировать тесты в Mocha. 
Мы можем объединять тесты в различные группы исходя из желаний. Функция принимает два аргумента:
a — имя тестовой группы,
b — функция обратного вызова. */