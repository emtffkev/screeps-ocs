const e=new Creep.Behaviour("pioneer");module.exports=e,e.inflowActions=(e=>Creep.behaviour.worker.inflowActions.call(this,e)),e.outflowActions=(e=>{let o;return o=e.room.controller&&e.room.controller.level<2?[Creep.action.feeding,Creep.action.upgrading,Creep.action.building,Creep.action.repairing,Creep.action.fueling,Creep.action.fortifying,Creep.action.charging,Creep.action.storing,Creep.action.picking]:[Creep.action.feeding,Creep.action.building,Creep.action.repairing,Creep.action.fueling,Creep.action.fortifying,Creep.action.charging,Creep.action.upgrading,Creep.action.storing,Creep.action.picking],e.room.controller&&e.room.controller.ticksToDowngrade<2e3&&o.unshift(Creep.action.upgrading),e.sum>e.carry.energy&&o.unshift(Creep.action.storing),o}),e.nextAction=function(e){var o;if(e.data.destiny&&(o=Game.flags[e.data.destiny.flagName]),o){if((!o.room||o.pos.roomName!=e.pos.roomName)&&Creep.action.travelling.assignRoom(e,o.pos.roomName))return Population.registerCreepFlag(e,o),!0;if(o.room&&o.room.my){let r=FlagDir.find(FLAG_COLOR.claim.spawn,e.pos,!0);if(r)if(r.room.structures.spawns&&r.room.structures.spawns.length>0){r.remove();let e=e=>Game.flags[e.name].remove();_.forEach(FlagDir.filter(FLAG_COLOR.invade.exploit,r.pos,!0),e)}else{let e=o.room.myConstructionSites.some(e=>e.structureType===STRUCTURE_SPAWN);e||o.room.createConstructionSite(r,STRUCTURE_SPAWN)}}}return this.nextEnergyAction(e)};