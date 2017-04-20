let e={};module.exports=e,e.name="collapseWorker",e.run=function(e){null!=e.action&&"idle"!==e.action.name||this.nextAction(e),e.action&&e.target?e.action.step(e):logError("Creep without action/activity!\nCreep: "+e.name+"\ndata: "+JSON.stringify(e.data))},e.nextAction=function(e){if(e.pos.roomName!==e.data.homeRoom)return global.DEBUG&&global.TRACE&&trace("Behaviour",{actionName:"travelling",behaviourName:this.name,creepName:e.name,assigned:!0,Behaviour:"nextAction",Action:"assign"}),Creep.action.travelling.assignRoom(e,e.data.homeRoom),!0;if(!e.room.collapsed)return global.DEBUG&&global.TRACE&&trace("Behaviour",{actionName:"recycling",behaviourName:this.name,creepName:e.name,assigned:!0,Behaviour:"nextAction",Action:"assign"}),Creep.action.recycling.assign(e);const a=e.room.situation.invasion&&e.room.controller&&e.room.controller.level>2,n=a?[Creep.action.feeding,Creep.action.fueling,Creep.action.repairing]:[Creep.action.feeding,Creep.action.fueling,Creep.action.charging,Creep.action.repairing,Creep.action.building,Creep.action.fortifying,Creep.action.upgrading];let i=n;e.sum<.5*e.carryCapacity?i=[Creep.action.picking,Creep.action.withdrawing,Creep.action.uncharging,Creep.action.harvesting,Creep.action.dismantling,Creep.action.reallocating,Creep.action.idle]:(a||(i.push(Creep.action.storing),i.push(Creep.action.picking)),e.room.controller&&e.room.controller.ticksToDowngrade<500&&i.unshift(Creep.action.upgrading),i.push(Creep.action.idle));for(var t=0;t<i.length;t++){var o=i[t];const a=o.isValidAction(e);if(global.DEBUG&&global.TRACE&&trace("Action",{actionName:o.name,behaviourName:this.name,creepName:e.name,valid:a,Action:"isValidAction"}),a){const a=o.isAddableAction(e);if(global.DEBUG&&global.TRACE&&trace("Action",{actionName:o.name,behaviourName:this.name,creepName:e.name,addable:a,Action:"isAddableAction"}),a){const a=o.assignDebounce?o.assignDebounce(e,n):o.assign(e);if(global.DEBUG&&global.TRACE&&trace("Action",{actionName:o.name,behaviourName:this.name,creepName:e.name,target:e.target,assigned:a,Action:"assign"}),a)return void("idle"!==o.name&&(e.data.lastAction=o.name,e.data.lastTarget=e.target.id))}}}return!1},e.strategies={defaultStrategy:{name:`default-${e.name}`,canWithdrawEnergy:function(e,a){return function(e){return e>0}}}},e.selectStrategies=function(a){return[e.strategies.defaultStrategy,e.strategies[a]]};