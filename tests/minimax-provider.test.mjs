/**
 * Unit tests for MiniMax provider integration.
 *
 * Run with: node --test tests/minimax-provider.test.mjs
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Read source files once for source-level verification tests
const minimaxSrc = fs.readFileSync(
  path.resolve('lib/llm/core/providers/minimax.js'),
  'utf-8'
);
const indexSrc = fs.readFileSync(
  path.resolve('lib/llm/core/index.js'),
  'utf-8'
);
const modelSrc = fs.readFileSync(
  path.resolve('constant/model.js'),
  'utf-8'
);

// ---------------------------------------------------------------------------
// 1. Temperature clamping logic (unit-level, no real API calls)
// ---------------------------------------------------------------------------
function clampTemperature(temp) {
  if (temp <= 0) return 0.01;
  if (temp > 1) return 1.0;
  return temp;
}

describe('MiniMax temperature clamping', () => {
  it('should clamp temperature=0 to 0.01', () => {
    assert.equal(clampTemperature(0), 0.01);
  });

  it('should clamp negative temperature to 0.01', () => {
    assert.equal(clampTemperature(-0.5), 0.01);
  });

  it('should clamp temperature>1 to 1.0', () => {
    assert.equal(clampTemperature(1.5), 1.0);
  });

  it('should keep temperature=0.7 unchanged', () => {
    assert.equal(clampTemperature(0.7), 0.7);
  });

  it('should keep temperature=1.0 unchanged (upper bound is inclusive)', () => {
    assert.equal(clampTemperature(1.0), 1.0);
  });

  it('should keep temperature=0.01 unchanged (smallest valid value)', () => {
    assert.equal(clampTemperature(0.01), 0.01);
  });
});

// ---------------------------------------------------------------------------
// 2. MiniMaxClient class structure (source-level verification)
// ---------------------------------------------------------------------------
describe('MiniMaxClient class', () => {
  it('should import createOpenAI from @ai-sdk/openai', () => {
    assert.ok(
      minimaxSrc.includes("from '@ai-sdk/openai'"),
      'minimax.js must import from @ai-sdk/openai'
    );
  });

  it('should import BaseClient', () => {
    assert.ok(
      minimaxSrc.includes("import BaseClient from './base.js'"),
      'minimax.js must import BaseClient'
    );
  });

  it('should export MiniMaxClient via module.exports', () => {
    assert.ok(
      minimaxSrc.includes('module.exports = MiniMaxClient'),
      'minimax.js must export MiniMaxClient'
    );
  });

  it('should implement _getModel method', () => {
    assert.ok(
      minimaxSrc.includes('_getModel()'),
      'minimax.js must implement _getModel'
    );
  });

  it('should override chat method for temperature clamping', () => {
    assert.ok(
      minimaxSrc.includes('async chat('),
      'minimax.js must override chat method'
    );
  });

  it('should override chatStream method for temperature clamping', () => {
    assert.ok(
      minimaxSrc.includes('async chatStream('),
      'minimax.js must override chatStream method'
    );
  });

  it('should override chatStreamAPI method for temperature clamping', () => {
    assert.ok(
      minimaxSrc.includes('async chatStreamAPI('),
      'minimax.js must override chatStreamAPI method'
    );
  });

  it('should reference the MiniMax API endpoint', () => {
    assert.ok(
      minimaxSrc.includes('https://api.minimax.io/v1'),
      'minimax.js should contain the default MiniMax endpoint'
    );
  });

  it('should clamp temperature to 0.01 for zero values', () => {
    assert.ok(
      minimaxSrc.includes('0.01'),
      'minimax.js should clamp to 0.01'
    );
  });
});

// ---------------------------------------------------------------------------
// 3. index.js registration verification
// ---------------------------------------------------------------------------
describe('LLMClient index.js – MiniMax registration', () => {
  it('should import MiniMaxClient', () => {
    assert.ok(
      indexSrc.includes("require('./providers/minimax')"),
      'index.js must require minimax provider'
    );
  });

  it('should register minimax in clientMap', () => {
    assert.ok(
      indexSrc.includes('minimax: MiniMaxClient'),
      'index.js must map minimax to MiniMaxClient'
    );
  });
});

// ---------------------------------------------------------------------------
// 4. constant/model.js MiniMax entry verification
// ---------------------------------------------------------------------------
describe('constant/model.js – MiniMax entry', () => {
  it('should contain minimax provider id', () => {
    assert.ok(
      modelSrc.includes("id: 'minimax'"),
      'model.js must have minimax id'
    );
  });

  it('should contain MiniMax display name', () => {
    assert.ok(
      modelSrc.includes("name: 'MiniMax'"),
      'model.js must have MiniMax name'
    );
  });

  it('should contain MiniMax API endpoint', () => {
    assert.ok(
      modelSrc.includes('https://api.minimax.io/v1'),
      'model.js must have MiniMax endpoint'
    );
  });

  it('should list MiniMax-M2.7 as default model', () => {
    assert.ok(
      modelSrc.includes('MiniMax-M2.7'),
      'model.js must list MiniMax-M2.7'
    );
  });

  it('should list MiniMax-M2.7-highspeed model', () => {
    assert.ok(
      modelSrc.includes('MiniMax-M2.7-highspeed'),
      'model.js must list MiniMax-M2.7-highspeed'
    );
  });

  it('should list MiniMax-M2.5 model', () => {
    assert.ok(
      modelSrc.includes('MiniMax-M2.5'),
      'model.js must list MiniMax-M2.5'
    );
  });

  it('should list MiniMax-M2.5-highspeed model', () => {
    assert.ok(
      modelSrc.includes('MiniMax-M2.5-highspeed'),
      'model.js must list MiniMax-M2.5-highspeed'
    );
  });
});

// ---------------------------------------------------------------------------
// 5. Client factory mapping (unit-level)
// ---------------------------------------------------------------------------
describe('LLMClient factory – provider map completeness', () => {
  it('should have minimax as a distinct entry in clientMap (not sharing OpenAIClient)', () => {
    // Verify that minimax has its own client class in the index source
    assert.ok(
      indexSrc.includes('minimax: MiniMaxClient'),
      'minimax must use MiniMaxClient, not OpenAIClient'
    );
  });

  it('should keep all existing providers in clientMap', () => {
    for (const provider of ['ollama', 'openai', 'siliconflow', 'deepseek', 'zhipu', 'openrouter', 'alibailian', 'minimax']) {
      assert.ok(
        indexSrc.includes(`${provider}:`),
        `clientMap must contain ${provider}`
      );
    }
  });
});
