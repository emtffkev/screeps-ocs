let t=new Creep.Action("dropping");module.exports=t,t.targetRange=1,t.reachedRange=0,t.isValidAction=function(t){return t.sum>0},t.newTarget=function(t){let e=t.pos.findClosestByRange(t.room.structures.piles);return e||(e=t.pos.findClosestByRange(t.room.structures.spawns)),e||(e=t.pos.findClosestByRange(t.room.find(FIND_FLAGS,FlagDir.flagFilter(FLAG_COLOR.claim.spawn)))),e||(e=t.pos.findClosestByRange(_.filter(t.room.constructionSites,{structureType:STRUCTURE_SPAWN}))),e||(e=t.room.controller),e},t.work=function(t){let e=OK,r=t=>t&&Flag.compare(t,FLAG_COLOR.claim.spawn);if(!(t.target instanceof StructureSpawn||t.target instanceof ConstructionSite||t.target instanceof StructureController||r(t.target))){let r=t.pos.getRangeTo(t.target);if(r>0&&t.data.lastPos&&t.data.path&&!_.eq(t.pos,t.data.lastPos)){let r=t=>{return t.type==LOOK_TERRAIN&&"wall"==t.terrain||t.type==LOOK_CREEPS||t.type==LOOK_STRUCTURES&&OBSTACLE_OBJECT_TYPES.includes(t.structure.structureType)},o=t.room.lookAt(target);if(!_.some(o,r))return e}}for(let o in t.carry)e=t.drop(o);return e};