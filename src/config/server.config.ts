/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServerConfig } from '../types';

/**
 * WINTRO SMP Central Configuration
 *
 * NOTE: Strict Server Information Rule enforced.
 * No fabricated server IPs, Discord URLs, YouTube links, player counts, or launch dates.
 * Replace placeholders once official endpoints are confirmed.
 */
export const SERVER_CONFIG: ServerConfig = {
  name: 'WINTRO SMP',
  wordmark: 'WINTRO SMP',
  tagline: 'BUILD YOUR WORLD. PLAY YOUR WAY.',
  subTagline: 'A peaceful, living Minecraft survival experience crafted for builders, traders, and explorers.',
  status: 'coming_soon',
  statusLabel: 'LAUNCHING SOON',
  launchDatePlaceholder: '[LAUNCH DATE COMING SOON]',

  connection: {
    serverIpPlaceholder: '[SERVER IP COMING SOON]',
    bedrockPortPlaceholder: '[BEDROCK PORT COMING SOON]',
    javaVersionRecommended: '1.21.x (Java & Bedrock compatible)',
    bedrockSupported: true,
  },

  socials: {
    discord: 'https://discord.gg/aqnK92T6P',
    youtube: '[YOUTUBE COMING SOON]',
  },

  /**
   * Official Confirmed Features
   */
  confirmedFeatures: [
    {
      id: 'peaceful-survival',
      title: 'Peaceful Survival',
      shortSummary: 'A calm, grief-free wilderness where you can build, explore, and thrive without hostile frustration.',
      plannedSectionId: 'peaceful-survival',
    },
    {
      id: 'land-claiming',
      title: 'Land Claiming',
      shortSummary: 'Effortless protection for your bases, farms, and architectural builds with intuitive boundary controls.',
      plannedSectionId: 'land-claiming',
    },
    {
      id: 'redstone-shops',
      title: 'Player-built Redstone Shops',
      shortSummary: 'Automated commerce engineered by players using mechanical hoppers, droppers, and custom logic.',
      plannedSectionId: 'redstone-shops',
    },
    {
      id: 'diamond-economy',
      title: 'Diamond-based Economy',
      shortSummary: 'A tangible, inflation-resistant economic standard backed purely by mined diamonds and player trade.',
      plannedSectionId: 'diamond-economy',
    },
    {
      id: 'pvp-arena',
      title: 'PvP Arena',
      shortSummary: 'Dedicated, voluntary battlegrounds for competitive combat and tournaments without risking your survival sanctuary.',
      plannedSectionId: 'pvp-arena',
    },
    {
      id: 'build-and-play',
      title: 'Build and Play Your Way',
      shortSummary: 'Complete player autonomy to craft mega-builds, homesteads, cooperative towns, or solo retreats.',
      plannedSectionId: 'community',
    },
  ],

  /**
   * Future Website Storytelling Sequence
   * (Hero -> Peaceful Survival -> Land Claiming -> Redstone Shops -> Diamond Economy -> PvP Arena -> Community -> Launch)
   */
  roadmapSections: [
    {
      id: 'hero',
      label: 'World Entry',
      description: 'Layered landscape, environmental mist, and cinematic brand reveal.',
    },
    {
      id: 'peaceful-survival',
      label: 'Peaceful Survival',
      description: 'Natural biomes, serene ambience, and grief-free community living.',
    },
    {
      id: 'land-claiming',
      label: 'Land Claiming',
      description: 'Interactive claim boundary showcase and sanctuary protection.',
    },
    {
      id: 'redstone-shops',
      label: 'Redstone Shops',
      description: 'Player automated engineering, hopper logistics, and market stalls.',
    },
    {
      id: 'diamond-economy',
      label: 'Diamond Economy',
      description: 'Physical vault reserves, bartering, and crystalline currency.',
    },
    {
      id: 'pvp-arena',
      label: 'PvP Arena',
      description: 'Opt-in gladiator colosseum for friendly tournaments.',
    },
    {
      id: 'community',
      label: 'Community',
      description: 'Builders, redstone tinkerers, and explorers united.',
    },
    {
      id: 'launch',
      label: 'Launch Portal',
      description: 'Connection guide, whitelist notice, and server status.',
    },
  ],
};
