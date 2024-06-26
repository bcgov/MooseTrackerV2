export interface AppConfig {
  DEBUG: boolean;
  MOBILE: boolean;

  API_BASE: string;

  COMMIT_HASH: string;

  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_URL: string;
  KEYCLOAK_ADAPTER: string;

  REDIRECT_URI: string;

  PUBLIC_MAP_URL: string;

  IAPP_GEOJSON_URL: string;

  // to easily disable features not ready for prod-use (or disable them on mobile/web)
  FEATURE_GATE: {
    PLAN_MY_TRIP: boolean;
    EMBEDDED_REPORTS: boolean;
    BATCH: boolean;
  };
}

/* global CONFIGURATION_SOURCE */
declare global {
  const CONFIGURATION_SOURCE: string;
  const CONFIGURATION_API_BASE: string | null;
  const CONFIGURATION_KEYCLOAK_CLIENT_ID: string | null;
  const CONFIGURATION_KEYCLOAK_REALM: string | null;
  const CONFIGURATION_KEYCLOAK_URL: string | null;
  const CONFIGURATION_KEYCLOAK_ADAPTER: string | null;
  const CONFIGURATION_REDIRECT_URI: string | null;
  const CONFIGURATION_PUBLIC_MAP_URL: string | null;
  const CONFIGURATION_IS_MOBILE: string | null;
  const INJECTED_COMMIT_HASH: string | null;
  const CONFIGURATION_IAPP_GEOJSON_URL: string | null;
}

let CONFIG: AppConfig;

let myvar = 'Hardcoded';
switch (myvar) {
  case 'Caddy':
    CONFIG = {
      COMMIT_HASH: INJECTED_COMMIT_HASH && INJECTED_COMMIT_HASH.length > 0 ? INJECTED_COMMIT_HASH : 'unknown',
      DEBUG: false,
      MOBILE: false,
      API_BASE: '{{env "API_BASE"}}',
      KEYCLOAK_CLIENT_ID: '{{env "KEYCLOAK_CLIENT_ID"}}',
      KEYCLOAK_REALM: '{{env "KEYCLOAK_REALM"}}',
      KEYCLOAK_URL: '{{env "KEYCLOAK_URL"}}',
      KEYCLOAK_ADAPTER: '{{env "KEYCLOAK_ADAPTER"}}',
      REDIRECT_URI: '{{env "REDIRECT_URI"}}',
      PUBLIC_MAP_URL: '{{env "PUBLIC_MAP_URL"}}',
      IAPP_GEOJSON_URL: '{{env "IAPP_GEOJSON_URL"}}',
      FEATURE_GATE: {
        PLAN_MY_TRIP: true,
        EMBEDDED_REPORTS: true,
        BATCH: '{{env "FEATURE_GATE_BATCH_ENABLED"}}'.toLowerCase() === 'true'
      }
    };
    break;
  case 'Provided':
    break;
  case 'Hardcoded':
  default:
    CONFIG = {
      DEBUG: true,
      MOBILE: false,
      COMMIT_HASH: 'local',
      API_BASE: 'http://localhost:3002',
      KEYCLOAK_CLIENT_ID: 'invasives-bc-1849',
      KEYCLOAK_REALM: 'onestopauth-business',
      KEYCLOAK_URL: 'https://dev.oidc.gov.bc.ca/auth',
      KEYCLOAK_ADAPTER: 'web',
      REDIRECT_URI: 'http://localhost:3000/home/landing',
      PUBLIC_MAP_URL: 'https://nrs.objectstore.gov.bc.ca/uphjps/invasives-local.pmtiles',
      IAPP_GEOJSON_URL: 'https://nrs.objectstore.gov.bc.ca/seeds/iapp_geojson_gzip.gz',
      FEATURE_GATE: {
        PLAN_MY_TRIP: false,
        EMBEDDED_REPORTS: true,
        BATCH: true
      }
    };
    break;
}

export { CONFIG };
