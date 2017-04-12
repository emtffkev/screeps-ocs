let t={};module.exports=t,t.name="remoteHauler",t.run=function(t){t.data.targetId;null!=t.action&&"idle"!=t.action.name||this.nextAction(t),t.action&&t.target?t.action.step(t):logError("Creep without action/activity!\nCreep: "+t.name+"\ndata: "+JSON.stringify(t.data))},t.nextAction=function(t){if(t.pos.roomName==t.data.homeRoom){if(t.sum>0){let e=[];if(t.carry.energy==t.sum&&(e=t.room.structures.links.privateers),t.room.storage&&e.push(t.room.storage),t.room.structures.container&&(e=e.concat(t.room.structures.container.privateers)),e.length>0){let r=t.pos.findClosestByRange(e);if(r.structureType==STRUCTURE_STORAGE&&this.assign(t,Creep.action.storing,r))return;if(this.assign(t,Creep.action.charging,r))return;if(this.assign(t,Creep.action.storing))return}if(this.assign(t,Creep.action.charging))return;if(this.assign(t,Creep.action.feeding))return;if(this.assign(t,Creep.action.dropping))return;{const e=e=>{t.carry[e]>0&&t.drop(e)};return _.forEach(Object.keys(t.carry),e),this.assign(t,Creep.action.idle)}}if(this.gotoTargetRoom(t))return}else{if(t.data.destiny.room==t.pos.roomName){if(t.sum/t.carryCapacity>REMOTE_HAULER.MIN_LOAD)return void this.goHome(t);if(this.assign(t,Creep.action.uncharging))return;if(this.assign(t,Creep.action.picking))return;if(0===t.sum){let e=t.pos.findClosestByRange(t.room.sources);if(t.room&&e&&t.pos.getRangeTo(e)>3)return t.data.travelRange=3,Creep.action.travelling.assign(t,e)}return this.assign(t,Creep.action.idle)}{let e=!1;if(e=t.sum/t.carryCapacity>REMOTE_HAULER.MIN_LOAD?this.goHome(t):this.gotoTargetRoom(t))return}}let e=Game.spawns[t.data.motherSpawn];e&&this.assign(t,Creep.action.recycling,e)},t.assign=function(t,e,r){return e.isValidAction(t)&&e.isAddableAction(t)&&e.assign(t,r)},t.gotoTargetRoom=function(t){const e=t.data.destiny?Game.flags[t.data.destiny.targetName]:null;if(e)return Creep.action.travelling.assignRoom(t,e.pos.roomName)},t.goHome=function(t){return Creep.action.travelling.assignRoom(t,t.data.homeRoom)},t.selectStrategies=function(e){return[t.strategies.defaultStrategy,t.strategies[e]]},t.strategies={defaultStrategy:{name:`default-${t.name}`},picking:{name:`picking-${t.name}`,energyOnly:!1}};