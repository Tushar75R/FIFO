import FIFOQueue from "./FIFOQueue.js";
const qosPriorityMap = new Map([
    ["TCP", 2],
    ["UDP", 1],
    ["ICMP", 0],
]);
const queue = new FIFOQueue(10, 8, qosPriorityMap); // Fixed queue size of 10, congestion threshold of 8
function generateRandomIPv4Packet() {
    return {
        version: 4,
        headerLength: Math.floor(Math.random() * 16),
        typeOfService: Math.floor(Math.random() * 256),
        totalLength: Math.floor(Math.random() * 65536),
        identification: Math.floor(Math.random() * 65536),
        flags: Math.floor(Math.random() * 8),
        fragmentOffset: Math.floor(Math.random() * 8192),
        ttl: Math.floor(Math.random() * 256),
        protocol: ["TCP", "UDP", "ICMP"][Math.floor(Math.random() * 3)],
        headerChecksum: Math.floor(Math.random() * 65536),
        sourceAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        destinationAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        payload: "Some data",
    };
}
function generateRandomIPv6Packet() {
    const protocol = ["TCP", "UDP", "ICMP"][Math.floor(Math.random() * 3)];
    return {
        version: 6,
        trafficClass: Math.floor(Math.random() * 256),
        flowLabel: Math.floor(Math.random() * 1048576),
        payloadLength: Math.floor(Math.random() * 65536),
        nextHeader: protocol,
        hopLimit: Math.floor(Math.random() * 256),
        sourceAddress: `2001:db8::${Math.floor(Math.random() * 65536)}`,
        destinationAddress: `2001:db8::${Math.floor(Math.random() * 65536)}`,
        payload: "Some data",
        protocol: protocol, // Add this line
    };
}
function sendRandomPacket() {
    const isIPv4 = Math.random() > 0.5;
    const packet = isIPv4
        ? generateRandomIPv4Packet()
        : generateRandomIPv6Packet();
    queue.enqueue(packet);
}
function transmitPackets() {
    setInterval(() => {
        if (!queue.isEmpty()) {
            queue.dequeue();
        }
    }, 1000); // Transmit a packet every second
}
function generatePackets() {
    setInterval(() => {
        sendRandomPacket();
    }, 500); // Generate a packet every 500ms
}
// Start the process
generatePackets();
transmitPackets();
