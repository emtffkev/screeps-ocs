let r=new Creep.Action("fortifying");module.exports=r,r.maxPerTarget=1,r.maxPerAction=1,r.targetRange=3,r.isValidAction=function(r){return r.carry.energy>0&&(!r.room.storage||r.room.storage.charge>.6)},r.isValidTarget=function(r){return null!=r&&r.hits&&r.hits<r.hitsMax},r.newTarget=function(r){var t=this,e=e=>t.isAddableTarget(e,r);return _.find(r.room.structures.fortifyable,e)},r.work=function(r){return r.repair(r.target)};