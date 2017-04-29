// This task will react on yellow/yellow flags, sending a guarding creep to the flags position.
let a={};module.exports=a,a.name="guard",a.minControllerLevel=3,a.register=(()=>{}),a.handleFlagFound=(e=>{e.compareTo(FLAG_COLOR.defense)&&Task.nextCreepCheck(e,a.name)&&(Util.set(e.memory,"task",a.name),Task.guard.checkForRequiredCreeps(e))}),a.creep={guard:{fixedBody:[RANGED_ATTACK,MOVE],multiBody:{[HEAL]:1,[MOVE]:2,[RANGED_ATTACK]:2,[TOUGH]:1},name:"guard",behaviour:"ranger",queue:"Low"}},a.checkForRequiredCreeps=(e=>{let n=Task.guard.memory(e);Task.validateAll(n,e,a.name,{roomName:e.pos.roomName,checkValid:!0});let m=n.queued.length+n.spawning.length+n.running.length;m<1&&Task.spawn(Task.guard.creep.guard,{task:"guard",targetName:e.name,flagName:e.name},{targetRoom:e.pos.roomName,minEnergyCapacity:200,rangeRclRatio:1.8,allowTargetRoom:!0},a=>{let n=Task.guard.memory(Game.flags[a.destiny.targetName]);n.queued.push({room:a.queueRoom,name:a.name,targetName:e.name})})}),a.handleSpawningStarted=(e=>{if(e.destiny&&e.destiny.task&&"guard"==e.destiny.task){let n=Game.flags[e.destiny.flagName];if(n){let m=Task.guard.memory(n);m.spawning.push(e),Task.validateQueued(m,n,a.name)}}}),a.handleSpawningCompleted=(e=>{if(e.data&&e.data.destiny&&e.data.destiny.task&&"guard"==e.data.destiny.task){let n=Game.flags[e.data.destiny.flagName];if(n){e.data.predictedRenewal=e.data.spawningTime+50*routeRange(e.data.homeRoom,n.pos.roomName);let m=Task.guard.memory(n);m.running.push(e.name),Task.validateSpawning(m,n,a.name)}}}),a.handleCreepDied=(e=>{let n=Memory.population[e];if(n&&n.destiny&&n.destiny.task&&"guard"==n.destiny.task){let m=Game.flags[n.destiny.flagName];if(m){const n=Task.guard.memory(m);Task.validateRunning(n,m,a.name,{roomName:m.pos.roomName,deadCreep:e})}}}),a.memory=(a=>{return a.memory.tasks||(a.memory.tasks={}),a.memory.tasks.guard||(a.memory.tasks.guard={queued:[],spawning:[],running:[]}),a.memory.tasks.guard});