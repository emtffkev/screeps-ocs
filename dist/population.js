let e={};module.exports=e,e.getCreep=function(e){return Memory.population[e]},e.setCreep=function(e){return Memory.population[e.creepName]=e,Memory.population[e.creepName]},e.registerCreep=function(e,t,a,i,o,n,r=null){var p=this.setCreep({creepName:e,creepType:t,weight:a,roomName:i.name,homeRoom:i.name,motherSpawn:o,actionName:null,targetId:null,spawningTime:0,flagName:null,body:_.countBy(n),destiny:r});this.countCreep(i,p)},e.unregisterCreep=function(e){delete Memory.population[e],delete Memory.creeps[e]},e.registerAction=function(e,t,a,i){if(global.DEBUG&&global.TRACE&&trace("Population",{creepName:this.name,registerAction:t.name,target:a.name||a.id,Population:"registerAction"}),e===a)throw new Error("attempt to register self target");void 0===i&&(i=this.getCreep(e.name)),i.carryCapacityLeft=e.carryCapacity-e.sum;let o=e.room;void 0===o.population&&(o.population={typeCount:{},typeWeight:{},actionCount:{},actionWeight:{}}),e.action&&(void 0===o.population.actionCount[e.action.name]?o.population.actionCount[e.action.name]=0:o.population.actionCount[e.action.name]--,void 0===o.population.actionWeight[e.action.name]?o.population.actionWeight[e.action.name]=0:o.population.actionWeight[e.action.name]-=i.weight,void 0===this.actionCount[e.action.name]?this.actionCount[e.action.name]=0:this.actionCount[e.action.name]--,void 0===this.actionWeight[e.action.name]?this.actionWeight[e.action.name]=0:this.actionWeight[e.action.name]-=i.weight,delete e.data.determinatedSpot,delete e.data.determinatedTarget),i.actionName=t.name,void 0===o.population.actionCount[t.name]?o.population.actionCount[t.name]=1:o.population.actionCount[t.name]++,void 0===o.population.actionWeight[t.name]?o.population.actionWeight[t.name]=i.weight:o.population.actionWeight[t.name]+=i.weight,void 0===this.actionCount[t.name]?this.actionCount[t.name]=1:this.actionCount[t.name]++,void 0===this.actionWeight[t.name]?this.actionWeight[t.name]=i.weight:this.actionWeight[t.name]+=i.weight;let n,r=a.id||a.name;if(i.targetId){let t=i.targetId?Game.getObjectById(i.targetId)||Game.spawns[i.targetId]||Game.flags[i.targetId]:null;if(t&&(n=t.id||t.name,t.targetOf)){let a=t=>t.creepName===e.name,i=t.targetOf.findIndex(a);i>-1&&t.targetOf.splice(i,1)}}i.targetId=r,a&&!FlagDir.isSpecialFlag(a)&&(void 0===a.targetOf?a.targetOf=[i]:a.targetOf.push(i)),r!=n&&delete i.path,e.action=t,e.target=a,e.data=i},e.registerCreepFlag=function(e,t){if(!(t&&e.data&&e.data.flagName&&e.data.flagName==t.name&&e.flag.name==t.name)){if(e.data&&e.data.flagName){let t=Game.flags[e.data.flagName];if(t&&t.targetOf){let a=t=>t.creepName===e.name,i=t.targetOf.findIndex(a);i>-1&&t.targetOf.splice(i,1)}}t?(void 0===t.targetOf?t.targetOf=[e.data]:t.targetOf.push(e.data),e.flag=t,e.data.flagName=t.name):(delete e.data.flagName,delete e.flag)}},e.countCreep=function(e,t){t.roomName=e.name,void 0===e.population&&(e.population={typeCount:{},typeWeight:{},actionCount:{},actionWeight:{}}),void 0===e.population.typeCount[t.creepType]?e.population.typeCount[t.creepType]=1:e.population.typeCount[t.creepType]++,void 0===e.population.typeWeight[t.creepType]?e.population.typeWeight[t.creepType]=t.weight:e.population.typeWeight[t.creepType]+=t.weight,void 0===this.typeCount[t.creepType]?this.typeCount[t.creepType]=1:this.typeCount[t.creepType]++,void 0===this.typeWeight[t.creepType]?this.typeWeight[t.creepType]=t.weight:this.typeWeight[t.creepType]+=t.weight},e.flush=function(){this.typeCount={},this.typeWeight={},this.actionCount={},this.actionWeight={},this.died=[],this.predictedRenewal=[],this.spawned=[],this.spawnsToProbe=[],_.isUndefined(Memory.population)&&(Memory.population={})},e.analyze=function(){const t=Util.startProfiling("Population.analyze",{enabled:PROFILING.CREEPS});let a=t=>{let a=Game.creeps[t.creepName];if(a){if(a.data=t,delete a.action,delete a.target,delete a.flag,a.spawning?t.spawningTime++:a.ticksToLive>0&&!a.data.spawned?(a.data.spawned=!0,this.spawned.push(t.creepName),Game.spawns[t.motherSpawn]&&this.spawnsToProbe.push(t.motherSpawn)):a.ticksToLive<=(t.predictedRenewal?t.predictedRenewal:t.spawningTime)&&!a.data.nearDeath&&(a.data.nearDeath=!0,CENSUS_ANNOUNCEMENTS&&console.log(dye(CRAYON.system,t.creepName+" &gt; ")+dye(CRAYON.death,"Farewell!"),Util.stack()),this.predictedRenewal.push(a.name),!this.spawnsToProbe.includes(t.motherSpawn)&&"unknown"!=t.motherSpawn&&Game.spawns[t.motherSpawn]&&this.spawnsToProbe.push(t.motherSpawn)),t.ttl=a.ticksToLive,t.creepType&&(void 0===a.ticksToLive||Creep.Setup.isWorkingAge(t))&&this.countCreep(a.room,t),t.flagName){var i=Game.flags[t.flagName];i?(void 0===i.targetOf?i.targetOf=[t]:i.targetOf.push(t),a.flag=i):delete t.flagName}let o=t.actionName&&Creep.action[t.actionName]?Creep.action[t.actionName]:null,n=o&&t.targetId?Game.getObjectById(t.targetId)||Game.spawns[t.targetId]||Game.flags[t.targetId]:null;n&&n.id===a.id&&(n=FlagDir.specialFlag()),o&&n?this.registerAction(a,o,n,t):(delete t.actionName,delete t.targetId,a.action=null,a.target=null),void 0===t.hull&&_.assign(t,e.getCombatStats(a.body)),a.data=t}else CENSUS_ANNOUNCEMENTS&&global.logSystem(t.homeRoom,dye(CRAYON.death,"Good night "+t.creepName+"!")),this.died.push(t.creepName)};_.forEach(Memory.population,e=>{a(e),t.checkCPU("Register: "+e.creepName,PROFILING.ANALYZE_LIMIT/2)});let i=e=>{let t=Game.creeps[e.creepName];if(t&&t.action&&t.target){let a=t.target.id||t.target.name,i=t.action.validateActionTarget(t,t.target);i?(a!=i.id||i.name)&&this.registerAction(t,t.action,i,e):(delete e.actionName,delete e.targetId,t.action=null,t.target=null)}};_.forEach(Memory.population,e=>{i(e),t.checkCPU("Validate: "+e.creepName,PROFILING.ANALYZE_LIMIT/2)})},e.execute=function(){const e=Util.startProfiling("Population.execute",{enabled:PROFILING.CREEPS});let t=e=>Creep.spawningCompleted.trigger(Game.creeps[e]);this.spawned.forEach(t),e.checkCPU("triggerCompleted",PROFILING.EXECUTE_LIMIT/4),Creep.died.on(e=>{const t=Memory.population[e];t&&t.determinatedSpot&&t.roomName&&Room.costMatrixInvalid.trigger(t.roomName)});let a=e=>Creep.died.trigger(e);this.died.forEach(a),e.checkCPU("triggerDied",PROFILING.EXECUTE_LIMIT/4);let i=e=>Creep.predictedRenewal.trigger(Game.creeps[e]);if(this.predictedRenewal.forEach(i),e.checkCPU("triggerRenewal",PROFILING.EXECUTE_LIMIT/4),Game.time%SPAWN_INTERVAL!=0){let t=e=>Game.spawns[e].execute();this.spawnsToProbe.forEach(t),e.checkCPU("probeSpawn",PROFILING.EXECUTE_LIMIT/4)}},e.cleanup=function(){const e=Util.startProfiling("Population.cleanup",{enabled:PROFILING.CREEPS});let t=e=>Population.unregisterCreep(e);this.died.forEach(t),e.checkCPU("died",PROFILING.FLUSH_LIMIT)},e.sortEntries=function(){let e={};_.map(_.sortBy(Memory.population,e=>e.creepName),t=>e[t.creepName]=t),Memory.population=e},e.stats={creep:{coreParts:{[MOVE]:!0,[HEAL]:!0},boost:{hits:{[RESOURCE_GHODIUM_OXIDE]:143,[RESOURCE_GHODIUM_ALKALIDE]:200,[RESOURCE_CATALYZED_GHODIUM_ALKALIDE]:334}}}},e.getCombatStats=function(e){let t=0,a=99,i=100*e.length-99;for(;t<e.length&&!Population.stats.creep.coreParts[e[t].type];t++)a+=Population.stats.creep.boost.hits[e[t].boost]||100,i-=100;return{hull:a,coreHits:i}},e.findCircular=function(){const e={creeps:Game.creeps,structures:Game.structures,memory:Memory},t={};for(let a in e){const i=e[a];for(let o in i){const e=i[o],n=a+"."+o;t[o]=n,this.checkCircular(o,t,e,n,1)}}},e.checkCircular=function(t,a,i,o,n){if(n>10)return void logError("Checking for circulars, very deep path",{rootPath:o,depth:n});for(let r in i){const p=o+"."+r,c=i[r];if(_.isObject(c)){const i=c.id||c.name;if(i===t)throw new Error("circular structure:"+i+" at:"+p+" and at:"+a[i]);i&&!a[i]&&(a[i]=p,e.checkCircular(t,a,c,p,n+1))}}};