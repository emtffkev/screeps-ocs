let e=new Creep.Action("harvesting");module.exports=e,e.renewTarget=!1,e.isValidAction=function(e){return e.sum<e.carryCapacity&&e.room.sourceEnergyAvailable>0},e.isValidTarget=function(e){return null!==e&&null!==e.energy&&e.energy>0&&(void 0===e.targetOf||e.targetOf.length<=e.accessibleFields&&!_.some(e.targetOf,e=>("miner"===e.creepType||"remoteMiner"===e.creepType)&&e.body.work>=5&&(e.ticksToLive||CREEP_LIFE_TIME)>=(e.data&&e.data.predictedRenewal||0)))},e.isAddableTarget=function(e,r){return(!r.room.controller||(!r.room.controller.owner||r.room.controller.my)&&(!r.room.controller.reservation||r.room.controller.reservation.username==r.owner.username))&&(void 0===e.targetOf||e.targetOf.length<e.accessibleFields)},e.newTarget=function(e){let r=null,t=999;for(var o=_.sortBy(e.room.sources,r=>e.pos.getRangeTo(r)),n=0;n<o.length;n++){let a=o[n];if(this.isValidTarget(a)&&this.isAddableTarget(a,e)){if(void 0===a.targetOf){t=0,r=a;break}{let o=_.countBy(a.targetOf,"creepType"),n=o[e.data.creepType];n?n<t&&(t=n,r=a):(t=0,r=a)}}}return r},e.work=function(e){return e.harvest(e.target)};