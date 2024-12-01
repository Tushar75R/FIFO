export interface IPv4Packet {
  version: 4;
  headerLength: number;
  typeOfService: number;
  totalLength: number;
  identification: number;
  flags: number;
  fragmentOffset: number;
  ttl: number;
  protocol: string;
  headerChecksum: number;
  sourceAddress: string;
  destinationAddress: string;
  options?: string;
  payload: string;
}

export interface IPv6Packet {
  version: 6;
  trafficClass: number;
  flowLabel: number;
  payloadLength: number;
  nextHeader: string;
  hopLimit: number;
  sourceAddress: string;
  destinationAddress: string;
  payload: string;
  protocol: string; // Add this line
}
