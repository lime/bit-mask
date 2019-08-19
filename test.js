var should = require("should");
var request = require("request");
var BitMask = require('./bit-mask');
var OwnershipMask = BitMask.OwnershipMask;

describe('BitMask', function(){
    describe('.getBit()', function(){
      it('reads bits set on initialization', function(){
        var mask = new BitMask('01111010', 2);
        mask.getBit(0).should.equal(false, 'bit 0');
        mask.getBit(1).should.equal(true, 'bit 0');
        mask.getBit(2).should.equal(false, 'bit 2');
        mask.getBit(3).should.equal(true, 'bit 3');
        mask.getBit(4).should.equal(true, 'bit 4');
        mask.getBit(5).should.equal(true, 'bit 5');
        mask.getBit(6).should.equal(true, 'bit 6');
        mask.getBit(7).should.equal(false, 'bit 7');

        for(var n=8; n < 31; n++){
          mask.getBit(n).should.equal(false, 'bit ' + n);
        }
      });

      it('reads bits set by setBit()', function(){
        var mask = new BitMask('0');

        mask.setBit(14, true);
        mask.getBit(14).should.equal(true, 'bit 14 should be set');

        mask.setBit(3, true);
        mask.getBit(3).should.equal(true, 'bit 3 should be set');
        mask.setBit(3, false);
        mask.getBit(3).should.equal(false, 'bit 3 should be unset');
      });
    });

    describe('> OwnershipMask', function(){
        var mask;

        before(function(){
            mask = new OwnershipMask('755');
        });

        it('user read [8]', function(){
            mask.getPosition('user', 'read').should.equal(8);
            mask.getBit(8).should.equal(mask.hasPermission('user', 'read'));
            mask.getBit(8).should.equal(true);
            mask.hasPermission('user', 'read').should.equal(true);
        });

        it('user write [7]', function(){
            mask.getPosition('user', 'write').should.equal(7);
            mask.getBit(7).should.equal(mask.hasPermission('user', 'write'));
            mask.getBit(7).should.equal(true);
            mask.hasPermission('user', 'write').should.equal(true);
        });

        it('user execute [6]', function(){
            mask.getPosition('user', 'execute').should.equal(6);
            mask.getBit(6).should.equal(mask.hasPermission('user', 'execute'));
            mask.getBit(6).should.equal(true);
            mask.hasPermission('user', 'execute').should.equal(true);
        });

        it('group read [5]', function(){
            mask.getPosition('group', 'read').should.equal(5);
            mask.getBit(5).should.equal(mask.hasPermission('group', 'read'));
            mask.getBit(5).should.equal(true);
            mask.hasPermission('group', 'read').should.equal(true);
        });

        it('group write [4]', function(){
            mask.getPosition('group', 'write').should.equal(4);
            mask.getBit(4).should.equal(mask.hasPermission('group', 'write'));
            mask.getBit(4).should.equal(false);
            mask.hasPermission('group', 'write').should.equal(false);
        });

        it('group execute [3]', function(){
            mask.getPosition('group', 'execute').should.equal(3);
            mask.getBit(3).should.equal(mask.hasPermission('group', 'execute'));
            mask.getBit(3).should.equal(true);
            mask.hasPermission('group', 'execute').should.equal(true);
        });

        it('world read [2]', function(){
            mask.getPosition('world', 'read').should.equal(2);
            mask.getBit(2).should.equal(mask.hasPermission('world', 'read'));
            mask.getBit(2).should.equal(true);
        });

        it('world write [1]', function(){
            mask.getPosition('world', 'write').should.equal(1);
            mask.getBit(1).should.equal(mask.hasPermission('world', 'write'));
            mask.getBit(1).should.equal(false);
            mask.hasPermission('world', 'write').should.equal(false);
        });

        it('world execute [0]', function(){
            mask.getPosition('world', 'execute').should.equal(0);
            mask.getBit(0).should.equal(mask.hasPermission('world', 'execute'));
            mask.getBit(0).should.equal(true);
            mask.hasPermission('world', 'execute').should.equal(true);
        });
    });
});
