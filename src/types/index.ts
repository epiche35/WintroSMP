/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServerStatus = 'coming_soon' | 'in_development' | 'whitelist_only' | 'online' | 'maintenance';

export interface ConfirmedFeature {
  id: string;
  title: string;
  shortSummary: string;
  plannedSectionId: string;
}

export interface SocialLinks {
  discord: string;
  youtube: string;
  twitter?: string;
  tiktok?: string;
}

export interface ServerConnectionInfo {
  serverIpPlaceholder: string;
  bedrockPortPlaceholder?: string;
  javaVersionRecommended: string;
  bedrockSupported: boolean;
}

export interface ServerConfig {
  name: string;
  wordmark: string;
  tagline: string;
  subTagline: string;
  status: ServerStatus;
  statusLabel: string;
  launchDatePlaceholder: string;
  connection: ServerConnectionInfo;
  socials: SocialLinks;
  confirmedFeatures: ConfirmedFeature[];
  roadmapSections: {
    id: string;
    label: string;
    description: string;
  }[];
}
