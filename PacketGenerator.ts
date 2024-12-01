import FIFOQueue from "./FIFOQueue.js";
import { IPv4Packet, IPv6Packet } from "./ProtocolTypes.js";
import fs from "fs";

const qosPriorityMap = new Map<string, number>([
  ["TCP", 2],
  ["UDP", 1],
  ["ICMP", 0],
]);

const queue = new FIFOQueue(10, 8, qosPriorityMap); // Fixed queue size of 10, initial congestion threshold of 8

function generateRandomIPv4Packet(): IPv4Packet {
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
    sourceAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256
    )}`,
    destinationAddress: `192.168.${Math.floor(
      Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}`,
    payload: "Some data",
  };
}

function generateRandomIPv6Packet(): IPv6Packet {
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
  }, Math.random() * 1000 + 500); // Randomize packet generation interval between 500ms and 1500ms
}

// Randomize congestion threshold every 10 seconds
setInterval(() => {
  queue.setCongestionThreshold(Math.floor(Math.random() * 10) + 5); // Randomize between 5 and 14
}, 10000);

// Start the process
generatePackets();
transmitPackets();

// Log transition details to a CSV file
const logStream = fs.createWriteStream("transition_details.csv", {
  flags: "a",
});
logStream.write("Timestamp,Event,PacketDetails,Reason\n");

queue.on("packetDrop", (packet, reason) => {
  setTimeout(() => {
    logStream.write(`${Date.now()},Drop,${JSON.stringify(packet)},${reason}\n`);
  }, Math.random() * 1000); // Random delay before logging drop event
});

queue.on("packetTransmit", (packet) => {
  logStream.write(`${Date.now()},Transmit,${JSON.stringify(packet)},-\n`);
});

queue.on("congestionThresholdChange", (newThreshold) => {
  logStream.write(`${Date.now()},ThresholdChange,${newThreshold},-\n`);
});
