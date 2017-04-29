let e={};module.exports=e,e.name="privateer",e.run=function(e){e.data.targetId;if(null!==e.action&&"idle"!=e.action.name&&e.flag&&e.flag.pos.roomName!=e.pos.roomName||(e.data.destiny&&e.data.destiny.task&&Task[e.data.destiny.task]&&Task[e.data.destiny.task].nextAction?Task[e.data.destiny.task].nextAction(e):this.nextAction(e)),e.action&&e.target?e.action.step(e):logError("Creep without action/activity!\nCreep: "+e.name+"\ndata: "+JSON.stringify(e.data)),e.hits<e.hitsMax&&(e.data.nearestHome&&Game.rooms[e.data.nearestHome]||(e.data.nearestHome=Room.bestSpawnRoomFor(e.pos.roomName)),e.data.nearestHome))return void Creep.action.travelling.assignRoom(e,e.data.homeRoom)},e.nextAction=function(e){let o=e.sum;if(e.pos.roomName==e.data.homeRoom){if(o>0){let t=[];if(e.carry.energy==o&&(t=e.room.structures.links.privateers),e.room.storage&&t.push(e.room.storage),e.room.structures.container&&(t=t.concat(e.room.structures.container.privateers)),t.length>0){let o=e.pos.findClosestByRange(t);if(o.structureType==STRUCTURE_STORAGE&&Creep.action.storing.assign(e,o))return;if(Creep.action.charging.assign(e,o))return}if(Creep.action.charging.assign(e))return;if(!e.room.ally&&Creep.action.storing.assign(e))return;return void Creep.behaviour.worker.nextAction(e)}return this.exploitNextRoom(e)?void 0:void Creep.behaviour.worker.nextAction(e)}if(e.flag&&e.flag.pos.roomName==e.pos.roomName){if(e.room.situation.invasion&&!e.flag.compareTo(FLAG_COLOR.invade.robbing))return e.flag.cloaking=50,void this.exploitNextRoom(e);if(e.sum<.4*e.carryCapacity){if(0===e.room.sourceEnergyAvailable)return e.flag.cloaking=_.max([e.room.ticksToNextRegeneration-20,0]),void this.exploitNextRoom(e);for(var t=[Creep.action.dismantling,Creep.action.picking,Creep.action.robbing,Creep.action.harvesting],a=0;a<t.length;a++){var i=t[a];if(i.isValidAction(e)&&i.isAddableAction(e)&&i.assign(e))return}return e.flag.cloaking=50,void this.exploitNextRoom(e)}for(var t=[Creep.action.building],a=0;a<t.length;a++){var i=t[a];if(i.isValidAction(e)&&i.isAddableAction(e)&&i.assign(e))return}return Population.registerCreepFlag(e,null),void Creep.action.travelling.assignRoom(e,e.data.homeRoom)}return void this.exploitNextRoom(e)},e.exploitNextRoom=function(e){if(e.sum<.4*e.carryCapacity){let o=e=>Flag.compare(e,FLAG_COLOR.invade.exploit)||Flag.compare(e,FLAG_COLOR.invade.robbing),t=FlagDir.find(o,new RoomPosition(25,25,e.data.homeRoom),!1,FlagDir.exploitMod,e.name);if(t&&Creep.action.travelling.assignRoom(e,t.pos.roomName))return Population.registerCreepFlag(e,t),!0}return Population.registerCreepFlag(e,null),e.room.name!==e.data.homeRoom&&Creep.action.travelling.assignRoom(e,e.data.homeRoom),!1},e.strategies={defaultStrategy:{name:`default-${e.name}`,moveOptions:function(e){return e}},withdrawing:{name:`withdrawing-${e.name}`,isValidAction:function(e){return!1}}},e.selectStrategies=function(o){return[e.strategies.defaultStrategy,e.strategies[o]]};