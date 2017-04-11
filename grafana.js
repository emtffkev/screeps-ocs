let mod = {};

mod.run = function () {
	let stats = {
		// time
		'time'             : Game.time,
		// gcl
		'gcl.progress'     : Game.gcl.progress,
		'gcl.progressTotal': Game.gcl.progressTotal,
		'gcl.level'        : Game.gcl.level,
		// cpu
		'cpu.bucket'       : Game.cpu.bucket,
		'cpu.limit'        : Game.cpu.limit,
		'cpu.getUsed'      : Game.cpu.getUsed(),
		// market
		'market.credits'   : Game.market.credits,
		// creeps
		'creeps'           : _.size(Game.creeps)
	};

	// ROOMS
	for (let roomName in Game.rooms) {
		const room = Game.rooms[roomName];
		if (!room) continue;
		if (!room.my) continue;
		// room
		stats[`room.${roomName}.myRoom`]                  = 1;
		// energy
		stats[`room.${roomName}.energyAvailable`]         = room.energyAvailable;
		stats[`room.${roomName}.energyCapacityAvailable`] = room.energyCapacityAvailable;
		// rcl
		const controller                                  = room.controller;
		stats[`room.${roomName}.rcl`]                     = controller.level;
		stats[`room.${roomName}.controllerProgress`]      = controller.progress;
		stats[`room.${roomName}.controllerProgressTotal`] = controller.progressTotal;
		// storage
		const storage                                     = room.storage;
		try {
			stats[`room.${roomName}.storedEnergy`]  = storage.store[RESOURCE_ENERGY];
			stats[`room.${roomName}.storedMineral`] = _.sum(storage.store) - storage.store[RESOURCE_ENERGY];
		} catch (e) {
			stats[`room.${roomName}.storedEnergy`]  = 0;
			stats[`room.${roomName}.storedMineral`] = 0;
		}
		// terminals
		const terminal = room.terminal;
		try {
			stats[`room.${roomName}.terminalEnergy`]  = terminal.store[RESOURCE_ENERGY];
			stats[`room.${roomName}.terminalMineral`] = _.sum(terminal.store) - terminal.store[RESOURCE_ENERGY];
		} catch (e) {
			stats[`room.${roomName}.terminalEnergy`]  = 0;
			stats[`room.${roomName}.terminalMineral`] = 0;
		}
	}

	_.forEach(Memory.creeps, (c = {}) => {
		const roomName = c.homeRoom,
		      role     = c.creepType;
		(stats[`room.${roomName}.roles.${role}`]) ? stats[`room.${roomName}.roles.${role}`] = 1 : stats[`room.${roomName}.roles.${role}`]++;
	});

	Memory.stats = stats;
};

module.exports = mod;