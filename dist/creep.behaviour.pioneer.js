let t={};module.exports=t,t.name="pioneer",t.run=function(t){t.data.targetId;null!=t.action&&"idle"!=t.action.name||(t.data.destiny&&t.data.destiny.task&&Task[t.data.destiny.task]&&Task[t.data.destiny.task].nextAction?Task[t.data.destiny.task].nextAction(t):this.nextAction(t)),t.action&&t.target?t.action.step(t):logError("Creep without action/activity!\nCreep: "+t.name+"\ndata: "+JSON.stringify(t.data))},t.nextAction=function(t){var e;if(t.data.destiny&&(e=Game.flags[t.data.destiny.flagName]),e){if((!e.room||e.pos.roomName!=t.pos.roomName)&&Creep.action.travelling.assignRoom(t,e.pos.roomName))return Population.registerCreepFlag(t,e),!0;if(e.room&&e.room.my){let a=FlagDir.find(FLAG_COLOR.claim.spawn,t.pos,!0);if(a)if(a.room.structures.spawns&&a.room.structures.spawns.length>0){a.remove();let t=t=>Game.flags[t.name].remove();_.forEach(FlagDir.filter(FLAG_COLOR.invade.exploit,a.pos,!0),t)}else{let t=e.room.myConstructionSites.some(t=>t.structureType===STRUCTURE_SPAWN);t||e.room.createConstructionSite(a,STRUCTURE_SPAWN)}}}Creep.behaviour.worker.nextAction(t)};