import chalk from "chalk";
class FIFOQueue {
    constructor(maxSize, congestionThreshold, qosPriorityMap) {
        this.queue = [];
        this.maxSize = maxSize;
        this.congestionThreshold = congestionThreshold;
        this.qosPriorityMap = qosPriorityMap;
    }
    enqueue(packet) {
        if (this.queue.length >= this.maxSize) {
            console.log(chalk.red(`Packet dropped: ${this.formatPacket(packet)}`));
            return;
        }
        // Apply QoS priority
        const protocol = this.getProtocol(packet);
        const priority = this.qosPriorityMap.get(protocol) || 0;
        if (priority > 0) {
            this.queue.splice(this.queue.length - priority, 0, packet);
        }
        else {
            this.queue.push(packet);
        }
        // Apply congestion control
        if (this.queue.length >= this.congestionThreshold) {
            console.log(chalk.yellow(`Congestion detected. Dropping low priority packets.`));
            this.queue = this.queue.filter((p) => {
                const pProtocol = this.getProtocol(p);
                return this.qosPriorityMap.get(pProtocol) !== undefined;
            });
        }
    }
    dequeue() {
        const packet = this.queue.shift();
        if (packet) {
            console.log(chalk.green(`Packet transmitted successfully: ${this.formatPacket(packet)}`));
        }
        return packet;
    }
    isFull() {
        return this.queue.length >= this.maxSize;
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    formatPacket(packet) {
        if (packet.version === 4) {
            const ipv4Packet = packet;
            return `
                ${chalk.blue("IPv4 Packet")}
                Version: ${ipv4Packet.version}
                Header Length: ${ipv4Packet.headerLength}
                Type of Service: ${ipv4Packet.typeOfService}
                Total Length: ${ipv4Packet.totalLength}
                Identification: ${ipv4Packet.identification}
                Flags: ${ipv4Packet.flags}
                Fragment Offset: ${ipv4Packet.fragmentOffset}
                TTL: ${ipv4Packet.ttl}
                Protocol: ${ipv4Packet.protocol}
                Header Checksum: ${ipv4Packet.headerChecksum}
                Source Address: ${ipv4Packet.sourceAddress}
                Destination Address: ${ipv4Packet.destinationAddress}
                Payload: ${ipv4Packet.payload}
            `.trim();
        }
        else {
            const ipv6Packet = packet;
            return `
                ${chalk.blue("IPv6 Packet")}
                Version: ${ipv6Packet.version}
                Traffic Class: ${ipv6Packet.trafficClass}
                Flow Label: ${ipv6Packet.flowLabel}
                Payload Length: ${ipv6Packet.payloadLength}
                Next Header: ${ipv6Packet.nextHeader}
                Hop Limit: ${ipv6Packet.hopLimit}
                Source Address: ${ipv6Packet.sourceAddress}
                Destination Address: ${ipv6Packet.destinationAddress}
                Payload: ${ipv6Packet.payload}
            `.trim();
        }
    }
    getProtocol(packet) {
        if ("nextHeader" in packet) {
            return packet.nextHeader;
        }
        else if ("protocol" in packet) {
            return packet.protocol;
        }
        else {
            throw new Error("Packet does not have a protocol or nextHeader property");
        }
    }
}
export default FIFOQueue;
