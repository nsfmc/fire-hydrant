'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('fireHydrant', function () {
  var fireHydrant = require('../../lib');
  var toHydrant = fireHydrant.toHydrant;
  var fromHydrant = fireHydrant.fromHydrant;
  var serialize = fireHydrant.serialize;
  var deserialize = fireHydrant.deserialize;

  var regularObj = { a: 'something',
    b: [1, 2, 3],
    c: { foo: { bar: true } }
  };
  var partialImmutable = _extends({}, regularObj, { d: _immutable2.default.Map({ a: 'foo', b: 'bar' })
  });
  var topLevelImmutable = _immutable2.default.fromJS(regularObj);

  it('has toHydrant function', function () {
    return expect(toHydrant).toEqual(jasmine.any(Function));
  });
  it('has fromHydrant function', function () {
    return expect(fromHydrant).toEqual(jasmine.any(Function));
  });
  it('has serialize function', function () {
    return expect(serialize).toEqual(jasmine.any(Function));
  });
  it('has deserialize function', function () {
    return expect(deserialize).toEqual(jasmine.any(Function));
  });

  it('should toHydrant to an object', function () {
    return expect(toHydrant({ foo: 'bar' }, { Immutable: _immutable2.default })).toEqual(jasmine.any(Object));
  });
  it('should fromHydrant to an object', function () {
    return expect(fromHydrant({ foo: 'bar' }, { Immutable: _immutable2.default })).toEqual(jasmine.any(Object));
  });
  it('should serialize to a string', function () {
    return expect(serialize({ foo: 'bar' }, { Immutable: _immutable2.default })).toEqual(jasmine.any(String));
  });
  it('should deserialize to an object', function () {
    return expect(deserialize('{"foo": "bar"}', { Immutable: _immutable2.default })).toEqual(jasmine.any(Object));
  });

  it('should be able to toHydrant and fromHydrant back for regular object', function () {
    var hydrant = toHydrant(regularObj, { Immutable: _immutable2.default });
    var result = fromHydrant(hydrant, { Immutable: _immutable2.default });
    expect(result).toEqual(regularObj);
  });

  it('should be able to toHydrant and fromHydrant back for partial immutable', function () {
    var hydrant = toHydrant(partialImmutable, { Immutable: _immutable2.default });
    var result = fromHydrant(hydrant, { Immutable: _immutable2.default });
    expect(result).toEqual(partialImmutable);
  });

  it('should be able to toHydrant and fromHydrant back for top level immutable', function () {
    var hydrant = toHydrant(topLevelImmutable, { Immutable: _immutable2.default });
    var result = fromHydrant(hydrant, { Immutable: _immutable2.default });
    expect(result).toEqual(topLevelImmutable);
  });

  it('should be able to serialize and deserialize to same values for regular object', function () {
    var serialized = serialize(regularObj, { Immutable: _immutable2.default });
    var result = deserialize(serialized, { Immutable: _immutable2.default });
    expect(result).toEqual(regularObj);
  });

  it('should be able to serialize and deserialize to same values for partial immutable', function () {
    var serialized = serialize(partialImmutable, { Immutable: _immutable2.default });
    var result = deserialize(serialized, { Immutable: _immutable2.default });
    expect(result).toEqual(partialImmutable);
  });

  it('should be able to serialize and deserialize to same values for top level immutable', function () {
    var serialized = serialize(topLevelImmutable, { Immutable: _immutable2.default });
    var result = deserialize(serialized, { Immutable: _immutable2.default });
    expect(result).toEqual(topLevelImmutable);
  });
});