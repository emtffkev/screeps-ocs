// This task will react on robbing flags (invade/rob or red/yellow), sending 2 creeps to rob that room
let e={};module.exports=e,e.name="robbing",e.register=(()=>{}),e.handleFlagFound=(o=>{o.compareTo(FLAG_COLOR.invade.robbing)&&Task.nextCreepCheck(o,e.name)&&(Util.set(o.memory,"task",e.name),Task.robbing.checkForRequiredCreeps(o))}),e.checkForRequiredCreeps=(o=>{let a=Task.robbing.memory(o);Task.validateAll(a,o,e.name,{roomName:o.pos.roomName,checkValid:!0});const n=a.queued.length+a.spawning.length+a.running.length,t=o.pos.roomName;if(n<(a.numRobbers||2)){const a=e.strategies.robber.spawnRoom({roomName:t});if(!a)return;const n=ROBBER_REHOME&&(e.strategies.robber.homeRoom(o)||a);Task.spawn(Task.robbing.creep.robbing,{task:e.name,targetName:o.name,homeRoom:n.name},{targetRoom:t,explicit:a.name},e=>{let o=Task.robbing.memory(Game.flags[e.destiny.targetName]);o.queued.push({room:e.queueRoom,name:e.name})})}}),e.handleSpawningStarted=(o=>{if(o.destiny&&o.destiny.task&&"robbing"==o.destiny.task){let a=Game.flags[o.destiny.targetName||o.destiny.flagName];if(a){let n=Task.robbing.memory(a);n.spawning.push(o),Task.validateQueued(n,a,e.name)}}}),e.handleSpawningCompleted=(o=>{if(o.data&&o.data.destiny&&o.data.destiny.task&&"robbing"==o.data.destiny.task){o.data.destiny.homeRoom&&(o.data.homeRoom=o.data.destiny.homeRoom);let a=Game.flags[o.data.destiny.targetName||o.data.destiny.flagName];if(a){o.data.predictedRenewal=o.data.spawningTime+50*routeRange(o.data.homeRoom,a.pos.roomName);let n=Task.robbing.memory(a);n.running.push(o.name),Task.validateSpawning(n,a,e.name)}}}),e.handleCreepDied=(o=>{let a=Memory.population[o];if(a&&a.destiny&&a.destiny.task&&"robbing"==a.destiny.task){let n=Game.flags[a.destiny.targetName||a.destiny.flagName];if(n){const a=Task.robbing.memory(n);Task.validateRunning(a,n,e.name,{roomName:n.pos.roomName,deadCreep:o})}}}),e.memory=(e=>{return e.memory.tasks||(e.memory.tasks={}),e.memory.tasks.robbing||(e.memory.tasks.robbing={queued:[],spawning:[],running:[],numRobbers:2}),e.memory.tasks.robbing}),e.nextAction=(o=>{let a=o.sum;if(o.pos.roomName==o.data.homeRoom){if(a>0){DEBUG&&TRACE&&trace("Task",{creepName:o.name,pos:o.pos,nextAction:"storing?",robbing:"nextAction",Task:"robbing"});let e=[];if(o.carry.energy==a&&(e=o.room.structures.links.privateers),o.room.storage&&e.push(o.room.storage),o.room.structures.container&&(e=e.concat(o.room.structures.container.privateers)),e.length>0){let a=o.pos.findClosestByRange(e);if(a.structureType==STRUCTURE_STORAGE&&Creep.action.storing.assign(o,a))return;if(Creep.action.charging.assign(o,a))return}if(Creep.action.charging.assign(o))return;if(!o.room.ally&&Creep.action.storing.assign(o))return;if(Creep.action.dropping.assign(o))return;return void Creep.behaviour.worker.nextAction(o)}return Task[o.data.destiny.task].exploitNextRoom(o)?void(DEBUG&&TRACE&&trace("Task",{creepName:o.name,pos:o.pos,nextAction:"travelling",robbing:"nextAction",Task:"robbing"})):(DEBUG&&TRACE&&trace("Task",{creepName:o.name,pos:o.pos,nextAction:"working",robbing:"nextAction",Task:"robbing"}),void Creep.behaviour.worker.nextAction(o))}if(o.flag&&o.flag.pos.roomName===o.pos.roomName){if(DEBUG&&TRACE&&trace("Task",{creepName:o.name,pos:o.pos,nextAction:"robbing",robbing:"nextAction",Task:"robbing"}),o.sum<.4*o.carryCapacity){for(var n=[Creep.action.picking,Creep.action.robbing],t=0;t<n.length;t++){var r=n[t];if(r.isValidAction(o)&&r.isAddableAction(o)&&r.assign(o))return}return o.flag&&(o.flag.cloaking=50),void Task[o.data.destiny.task].exploitNextRoom(o)}return void e.goHome(o)}return DEBUG&&TRACE&&trace("Task",{creepName:o.name,pos:o.pos,nextAction:"travelling2",robbing:"nextAction",Task:"robbing"}),void Task[o.data.destiny.task].exploitNextRoom(o)}),e.exploitNextRoom=(o=>{if(o.sum<.4*o.carryCapacity){var a;if(o.data.destiny&&(a=Game.flags[o.data.destiny.flagName]),a||(a=e.getFlag(o.data.homeRoom)),a)return e.gotoTargetRoom(o,a)}return e.goHome(o)}),e.goHome=(e=>{return Population.registerCreepFlag(e,null),Creep.action.travelling.assignRoom(e,e.data.homeRoom),!1}),e.getFlag=function(e){let o=e=>e.color==FLAG_COLOR.invade.robbing.color&&e.secondaryColor==FLAG_COLOR.invade.robbing.secondaryColor;return FlagDir.find(o,new RoomPosition(25,25,e),!1)},e.storage=function(o,a){const n=Task.robbing.memory(e.getFlag(o));if(a){const t=n.storageRoom;return n.storageRoom=a,`Task.${e.name}: room ${o}, now sending haulers to ${a}, (was ${t})`}if(n.storageRoom){if(a===!1){const a=n.storageRoom;return delete n.storageRoom,`Task.${e.name}: room ${o}, cleared custom storage room (was ${a})`}return`Task.${e.name}: room ${o}, sending haulers to ${n.storageRoom}`}return`Task.${e.name}: room ${o}, no custom storage destination`},e.gotoTargetRoom=((e,o)=>{if(Creep.action.travelling.assignRoom(e,o.pos.roomName))return Population.registerCreepFlag(e,o),!0}),e.creep={robbing:{fixedBody:[WORK,CARRY,MOVE],multiBody:[CARRY,CARRY,MOVE],name:"robber",behaviour:"privateer",queue:"Low"}},e.strategies={defaultStrategy:{name:`default-${e.name}`},robber:{name:`robber-${e.name}`,homeRoom:function(e){const o=Task.robbing.memory(e);return o.storageRoom?Game.rooms[o.storageRoom]:Room.bestSpawnRoomFor(e.pos.roomName)},spawnRoom:function({roomName,minWeight}){return Room.findSpawnRoom({targetRoom:roomName,minEnergyCapacity:minWeight||250})}}};