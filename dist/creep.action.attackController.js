let r=new Creep.Action("attackController");module.exports=r,r.isValidAction=function(r){return!0},r.isValidTarget=function(r,t){return r&&(!r.reservation||!Task.reputation.allyOwner(r.reservation))&&t.flag},r.isAddableAction=function(){return!0},r.isAddableTarget=function(r){return r&&(r instanceof Flag||"controller"===r.structureType&&(r.reservation||r.owner))},r.newTarget=function(r){let t=r=>Flag.compare(r,FLAG_COLOR.invade.attackController);var e;return r.data.destiny&&(e=Game.flags[r.data.destiny.targetName]),e||(e=FlagDir.find(t,r.pos,!1,FlagDir.reserveMod,r.name)),e?(Population.registerCreepFlag(r,e),r.flag.room&&r.flag.pos.roomName==r.pos.roomName?r.flag.room.controller:r.flag):null},r.step=function(t){if(global.CHATTY&&t.say(this.name,global.SAY_PUBLIC),t.target.color)return t.flag.pos.roomName==t.pos.roomName&&(t.data.targetId=null),void t.travelTo(t.target);let e=t.pos.getRangeTo(t.target);if(e<=this.targetRange){var a=this.work(t);a!=OK&&t.handleError({errorCode:a,action:r,target:t.target,range:e,creep:t})}else t.travelTo(t.target)},r.work=function(r){var t;return r.controllerSign(),t=r.target.owner&&!r.target.my||r.target.reservation&&!Task.reputation.allyOwner(r.target.reservation)?r.attackController(r.target):r.claimController(r.target)},r.defaultStrategy.moveOptions=function(r){return r};