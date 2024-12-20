# FIFO(Network Packet Queue) Simulation

## Overview

This project implements a First-In-First-Out (FIFO) queue simulation for network packets, supporting both IPv4 and IPv6 packet types with Quality of Service (QoS) and congestion control mechanisms.

## Project Structure

- `FIFOQueue.ts`: Core queue implementation with advanced packet handling
- `PacketGenerator.ts`: Generates random IPv4 and IPv6 packets
- `ProtocolTypes.ts`: Defines packet interface types
- `package.json`: Project configuration and dependencies

## Features

### FIFO Queue Capabilities
- Support for IPv4 and IPv6 packet types
- Dynamic queue size management
- Quality of Service (QoS) priority handling
- Congestion control mechanisms
- Packet drop events with detailed logging
- Event-driven packet transmission

### QoS Priority Mapping
The default priority configuration is:
- TCP: High priority (2)
- UDP: Medium priority (1)
- ICMP: Low priority (0)

### Congestion Control
- Configurable congestion threshold
- Automatic low-priority packet dropping during congestion
- Dynamic threshold adjustment

## Requirements

- Node.js
- TypeScript
- chalk (for colorful console logging)

## Installation

1. Clone the repository
2. Run `npm install`
3. Compile TypeScript: `npx tsc`

## Running the Simulation

```bash
node PacketGenerator.js
```

## Logging

The simulation logs packet transitions to `transition_details.csv`, including:
- Packet drops
- Packet transmissions
- Congestion threshold changes

## Events

The `FIFOQueue` supports the following events:
- `packetDrop`: Triggered when a packet is dropped
- `packetTransmit`: Triggered when a packet is transmitted
- `congestionThresholdChange`: Triggered when congestion threshold is modified

## Customization

You can easily modify:
- Queue size
- Initial congestion threshold
- QoS priority mappings
- Packet generation intervals
