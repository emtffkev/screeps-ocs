let e=new Creep.Action("idle");module.exports=e,e.targetRange=3,e.isValidAction=function(e){return!0},e.isAddableAction=function(e){return!0},e.isAddableTarget=function(e){return!0},e.newTarget=function(e){return FlagDir.specialFlag()},e.step=function(e){CHATTY&&e.say(this.name,SAY_PUBLIC),e.idleMove(),delete e.data.actionName,delete e.data.targetId};