let t=new Creep.Action("uncharging");// get from container/link
module.exports=t,t.renewTarget=!1,t.maxPerTarget=1,t.isAddableAction=function(t){return!0},t.isValidAction=function(e){return e.getStrategyHandler([t.name],"isValidAction",e)},t.isValidTarget=function(t,e){if(!t)return!1;if("link"==t.structureType)return t.energy>0;if("container"==t.structureType){let r=0;return r=t.source===!0&&1==t.controller?t.storeCapacity*MANAGED_CONTAINER_TRIGGER:e.data.creepType.indexOf("remote")>=0?250:500,t.sum>r}return!1},t.newTarget=function(t){if(t.room.structures.links.storage.length>0){let e=t.room.structures.links.storage.find(t=>t.energy>0);if(e){let r=t.room.structures.links.controller.find(t=>t.energy<.15*t.energyCapacity);if(!r||e.energy<=.85*e.energyCapacity)return e}}var e=this;if(t.room.structures.container.in.length>0){let r;r=t.data.creepType.indexOf("remote")>=0?250:500;let n=null,a=0,i=i=>{if(e.isValidTarget(i,t)){let e=i.sum;if(i.targetOf&&(e-=_.sum(i.targetOf.map(t=>"uncharging"==t.actionName?t.carryCapacityLeft:0))),e<Math.min(t.carryCapacity-t.sum,r))return;e>a&&(a=e,n=i)}};return _.forEach(t.room.structures.container.in,i),n}},t.work=function(t){let e=OK;if(t.target.source===!0&&1==t.target.controller){let r=t.target.sum-t.target.storeCapacity*(1-MANAGED_CONTAINER_TRIGGER);if(r<1)e=ERR_NOT_ENOUGH_RESOURCES;else{let n=t.carryCapacity-t.sum,a=_.min([t.target.store.energy,r,n]);t.target._sum-=a,e=t.withdraw(t.target,RESOURCE_ENERGY,a)}}else if(null!=t.target.store){let r=r=>{t.target.store[r]>0&&(e=t.withdraw(t.target,r))};_.forEach(Object.keys(t.target.store),r)}else e=t.withdraw(t.target,RESOURCE_ENERGY);return delete t.data.actionName,delete t.data.targetId,t.action=null,t.target=null,e},t.defaultStrategy.isValidAction=function(t){return t.sum<t.carryCapacity||!1};