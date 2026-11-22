export interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  homepage?: string;
  topics: string[];
  featured?: boolean;
}

/**
 * Curated from the public repos of https://github.com/matteoPhre
 * (forks and profile/meta repos intentionally omitted).
 */
export const projects: Project[] = [
  {
    name: 'pagina-me',
    description:
      'Zero-dependency, framework-agnostic cursor-based pagination utilities for TypeScript.',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/pagina-me',
    topics: ['cursor', 'cursor-pagination', 'npm-package', 'typescript', 'zero-dependencies'],
    featured: true,
  },
  {
    name: 'canovaccio',
    description: 'Zero-dependency TypeScript engine for SAGA orchestration and choreography.',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/canovaccio',
    topics: ['saga', 'orchestration', 'choreography', 'distributed-transactions', 'zero-dependency'],
    featured: true,
  },
  {
    name: 'dirama',
    description:
      'An asynchronous, compositional pipeline and conditional-stage orchestration engine written in TypeScript.',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/dirama',
    topics: ['async', 'middleware-pipeline', 'orchestration', 'pipeline', 'typescript'],
    featured: true,
  },
  {
    name: 'gatekeeper-policies',
    description: 'An enterprise-grade, database-agnostic password policy engine for Node.js.',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/gatekeeper-policies',
    topics: ['security', 'password-policy', 'password-strength', 'rotation', 'expiration'],
    featured: true,
  },
  {
    name: 'binlayout',
    description:
      'Zero-dependency TypeScript library for defining and parsing binary protocols with full type safety.',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/binlayout',
    topics: ['binary-parser', 'protocol-parser', 'iot', 'serialization', 'typescript'],
    featured: true,
  },
  {
    name: 'nestjs-pagina-me',
    description: 'NestJS integration for cursor-based pagination with @matteophre/pagina-me.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/matteoPhre/nestjs-pagina-me',
    topics: ['nestjs', 'pagination', 'typescript'],
  },
  {
    name: 'gatekeeper-policies-express',
    description: 'Express playground for @matteophre/gatekeeper-policies.',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/gatekeeper-policies-express',
    topics: ['express', 'security', 'example'],
  },
  {
    name: 'gatekeeper-policies-fastify',
    description: 'Fastify playground for @matteophre/gatekeeper-policies.',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/gatekeeper-policies-fastify',
    topics: ['fastify', 'security', 'example'],
  },
  {
    name: 'infrastructure',
    description:
      'Reusable infrastructure features: CQRS, event sourcing, Consul, object storage, message brokers, logging, outbox, Swagger and repository patterns.',
    language: 'C#',
    stars: 0,
    url: 'https://github.com/matteoPhre/infrastructure',
    topics: ['cqrs', 'event-sourcing', 'outbox', 'dotnet'],
  },
  {
    name: 'HealthCheckMiddleware',
    description: 'An Express middleware implementing customisable health-check APIs.',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/HealthCheckMiddleware',
    topics: ['express', 'healthcheck', 'middleware'],
  },
  {
    name: 'sqlite3-win',
    description: 'Node sqlite3 built against sqlcipher for Windows x64.',
    language: 'C',
    stars: 1,
    url: 'https://github.com/matteoPhre/sqlite3-win',
    topics: ['sqlite3', 'sqlcipher', 'nodejs'],
  },
  {
    name: 'golang_wb_app_demo',
    description: 'A small Go web application demo.',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/matteoPhre/golang_wb_app_demo',
    topics: ['go', 'demo'],
  },
];
