global._ME=_(Game.rooms).map("controller").filter("my").map("owner.username").first();let R={ME:_ME,CHATTY:!0,HONK:!0,OOPS:!0,SAY_ASSIGNMENT:!0,SAY_PUBLIC:!1,DEBUG:!0,DEBUG_STACKS:!1,TRACE:!1,PROFILE:!1,PROFILING:{ANALYZE_LIMIT:2,AVERAGE_USAGE:!1,BASIC_ONLY:!0,CREEPS:!1,CREEP_TYPE:"",EXECUTE_LIMIT:5,FLAGS:!1,FLUSH_LIMIT:5,MAIN:!0,MIN_THRESHOLD:.5,REGISTER_LIMIT:2,ROOMS:!1,VISUALS:!1,VISUALS_LIMIT:.2},TRAVELER_STUCK_TICKS:2,TRAVELER_THRESHOLD:5,USE_UNBUILT_ROADS:!0,GRAFANA:!0,GRAFANA_INTERVAL:3,CENSUS_ANNOUNCEMENTS:!0,SELL_NOTIFICATION:!1,SPAWN_INTERVAL:5,ROOM_VISUALS:!0,ROOM_VISUALS_ALL:!1,VISUALS:{VISIBLE_ONLY:!1,ROOM:!1,ROOM_GLOBAL:!1,INFO_PIE_CHART:!1,CPU:!1,ROOM_ORDERS:!0,ROOM_OFFERS:!0,SPAWN:!0,CONTROLLER:!0,STORAGE:!0,TERMINAL:!0,TOWER:!1,TRANSACTIONS:!0,LABS:!0,MINERAL:!0,SOURCE:!0,CREEP:!0,WALL:!1,RAMPART:!1,ROAD:!1,HEATMAP:!1,HEATMAP_INTERVAL:2,ACTION_ASSIGNMENT:!0},SEMI_AUTOMATIC_CONSTRUCTION:!0,REMOVE_CONSTRUCTION_FLAG:!0,MAX_STORAGE_ENERGY:{1:2e3,2:2e3,3:2e3,4:5e3,5:1e4,6:25e3,7:5e4,8:3e5},MIN_STORAGE_ENERGY:{1:1e3,2:1e3,3:1e3,4:1e3,5:5e3,6:1e4,7:25e3,8:5e4},MAX_STORAGE_MINERAL:6e4,ROOM_TRADING:!0,FILL_POWERSPAWN:!0,MIN_MINERAL_SELL_AMOUNT:1e3,ENERGY_VALUE_CREDITS:.02,TERMINAL_ENERGY:5e4,MIN_SELL_RATIO:{H:.05,O:.05,U:.15,L:.15,K:.15,Z:.15,X:.3},MAX_REPAIR_LIMIT:{1:1e3,2:1e3,3:2e3,4:4e3,5:8e3,6:15e3,7:2e4,8:4e4},MAX_FORTIFY_LIMIT:{1:1e3,2:1e3,3:2e3,4:5e4,5:1e5,6:3e5,7:75e4,8:3e8},MAX_FORTIFY_CONTAINER:5e4,LIMIT_URGENT_REPAIRING:750,GAP_REPAIR_DECAYABLE:800,MEMORY_RESYNC_INTERVAL:500,PROCESS_ORDERS_INTERVAL:500,TIME_REPORT:28e3,REPORT_MAX_LENGTH:500,REPORTS_PER_LOOP:18,SEND_STATISTIC_REPORTS:!0,ROAD_CONSTRUCTION_ENABLE:!1,ROAD_CONSTRUCTION_INTERVAL:500,ROAD_CONSTRUCTION_MIN_DEVIATION:1.2,ROAD_CONSTRUCTION_ABS_MIN:3,TIME_ZONE:1,USE_SUMMERTIME:!0,SPAWN_DEFENSE_ON_ATTACK:!1,MANAGED_CONTAINER_TRIGGER:.25,ROUTE_ROOM_COST:{},TRAVELLING_BORDER_RANGE:22,NOTIFICATE_INVADER:!1,NOTIFICATE_INTRUDER:!0,NOTIFICATE_HOSTILES:!0,COMBAT_CREEPS_RESPECT_RAMPARTS:!1,COST_MATRIX_VALIDITY:1e3,CONSTRUCTION_PRIORITY:[STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_LINK,STRUCTURE_TERMINAL,STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_POWER_SPAWN,STRUCTURE_NUKER,STRUCTURE_OBSERVER,STRUCTURE_ROAD,STRUCTURE_CONTAINER,STRUCTURE_EXTRACTOR,STRUCTURE_LAB,STRUCTURE_WALL,STRUCTURE_RAMPART],CONTROLLER_SIGN:!0,CONTROLLER_SIGN_MESSAGE:`Belong to CanisMinor ${String.fromCodePoint(55357)+String.fromCodePoint(56856)}`,CONTROLLER_SIGN_UPDATE:!0,MINERS_AUTO_BUILD:!0,MINER_WORK_THRESHOLD:50,REMOTE_HAULER:{ALLOW_OVER_CAPACITY:2450,DRIVE_BY_BUILD_ALL:!1,DRIVE_BY_BUILD_RANGE:1,DRIVE_BY_BUILDING:!0,DRIVE_BY_REPAIR_RANGE:0,MIN_LOAD:.75,MIN_WEIGHT:800,MULTIPLIER:2,REHOME:!0},TASK_CREEP_CHECK_INTERVAL:250,REMOTE_RESERVE_HAUL_CAPACITY:.1,PIONEER_UNOWNED:!1,DRIVE_BY_REPAIR_RANGE:2,REMOTE_WORKER_MULTIPLIER:1,PLAYER_WHITELIST:["CanisMinor","canisminor1990","Ruo","FanHua","kikooo"],DEFENSE_BLACKLIST:[],CRITICAL_BUCKET_LEVEL:1e3,CRITICAL_BUCKET_OVERFILL:200,CRITICAL_ROLES:["worker","collapseWorker","melee","ranger","healer","miner","hauler","upgrader"],ROBBER_REHOME:!0,OBSERVER_OBSERVE_RANGE:3,OBSERVER_OBSERVE_HIGHWAYS_ONLY:!0,ACTION_SAY:{ATTACK_CONTROLLER:String.fromCodePoint(128481)+String.fromCodePoint(9971),AVOIDING:String.fromCodePoint(8617),BOOSTING:String.fromCodePoint(128170),BUILDING:String.fromCodePoint(9874),BULLDOZING:String.fromCodePoint(128668),CHARGING:String.fromCodePoint(128268),CLAIMING:String.fromCodePoint(9971),DEFENDING:String.fromCodePoint(9876),DISMANTLING:String.fromCodePoint(128295),DROPPING:String.fromCodePoint(128169),FEEDING:String.fromCodePoint(127829),FORTIFYING:String.fromCodePoint(128296),FUELING:String.fromCodePoint(9981),GUARDING:String.fromCodePoint(128110)+String.fromCodePoint(127996),HARVESTING:String.fromCodePoint(9935),HEALING:String.fromCodePoint(9960),IDLE:String.fromCodePoint(127925),INVADING:String.fromCodePoint(128299),PICKING:String.fromCodePoint(9196),REALLOCATING:String.fromCodePoint(8596),RECYCLING:String.fromCodePoint(9851),REPAIRING:String.fromCodePoint(128296),RESERVING:String.fromCodePoint(9971),ROBBING:String.fromCodePoint(128128),STORING:String.fromCodePoint(128229)+String.fromCodePoint(65038),TRAVELLING:String.fromCodePoint(127939),UNCHARGING:String.fromCodePoint(128267),UPGRADING:String.fromCodePoint(128509),WITHDRAWING:String.fromCodePoint(128228)+String.fromCodePoint(65038)}};module.exports=R;