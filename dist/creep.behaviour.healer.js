let t={};module.exports=t,t.name="healer",t.run=function(t){t.data.targetId;(null==t.action||["guarding","idle"].includes(t.action.name))&&this.nextAction(t),t.action&&t.target?t.action.step(t):logError("Creep without action/activity!\nCreep: "+t.name+"\ndata: "+JSON.stringify(t.data))},t.nextAction=function(t){let e=[Creep.action.healing,Creep.action.guarding,Creep.action.idle];for(var n=0;n<e.length;n++){var a=e[n];if(a.isValidAction(t)&&a.isAddableAction(t)&&a.assign(t))return}},t.strategies={defaultStrategy:{name:`default-${t.name}`,moveOptions:function(t){return t}}},t.selectStrategies=function(e){return[t.strategies.defaultStrategy,t.strategies[e]]};