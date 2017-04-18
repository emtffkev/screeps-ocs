// cancle
var RoomName = 'W82S67', labID = '58eca89ba852ca4678cfd6f7';
Game.rooms[RoomName].setStore(labID, RESOURCE_ENERGY, 0);
Game.rooms[RoomName].setStore(labID, RESOURCE_CATALYZED_GHODIUM_ACID, 0);
// add
var RoomName = 'W82S67', labID = '58eca89ba852ca4678cfd6f7';
Game.rooms[RoomName].setStore(labID, RESOURCE_ENERGY, 2000);
Game.rooms[RoomName].setStore(labID, RESOURCE_CATALYZED_GHODIUM_ACID, 3000)
// buy
var RoomName = 'W82S67';
Game.market.createOrder(ORDER_BUY, RESOURCE_CATALYZED_GHODIUM_ACID, 1.2, 1000, RoomName);
// link
Task.mining.carry('W89S68')
var RoomName = 'W89S68';
Task.mining.carry(RoomName, -Task.mining.carry(RoomName) + 18)

