const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

const namespaces = [];

let wikiNs = new Namespace(0, 'Wiki', '', '/wikipedia');
let mozNs = new Namespace(1, 'Mozilla', '', '/mozilla');
let linuxNs = new Namespace(2, 'Linux', '', '/linux');

wikiNs.addRoom(new Room(0, 'New Arcticles', 'Wiki'));
wikiNs.addRoom(new Room(1, 'Editors', 'Wiki'));
wikiNs.addRoom(new Room(2, 'Other', 'Wiki'));


mozNs.addRoom(new Room(0, 'Firefox', 'Mozilla'));
mozNs.addRoom(new Room(1, 'SeaMonkey', 'Mozilla'));
mozNs.addRoom(new Room(2, 'SpiderMonkey', 'Mozilla'));
mozNs.addRoom(new Room(3, 'Rust', 'Mozilla'));

linuxNs.addRoom(new Room(0, 'Debian', 'Linux'));
linuxNs.addRoom(new Room(1, 'Red Hat', 'Linux'));
linuxNs.addRoom(new Room(2, 'MacOs', 'Linux'));
linuxNs.addRoom(new Room(3, 'Kernel Development', 'Linux'));

namespaces.push(wikiNs, mozNs, linuxNs);

module.exports = namespaces;