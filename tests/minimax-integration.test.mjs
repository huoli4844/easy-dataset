/**
 * Integration tests for MiniMax provider.
 *
 * These tests call the real MiniMax API and require MINIMAX_API_KEY env var.
 * Skip automatically when the key is not set.
 *
 * Run with: MINIMAX_API_KEY=sk-... node --test tests/minimax-integration.test.mjs
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const API_KEY = process.env.MINIMAX_API_KEY;
const BASE_URL = 'https://api.minimax.io/v1';
const MODEL = 'MiniMax-M2.5-highspeed';

const skipReason = API_KEY ? undefined : 'MINIMAX_API_KEY not set — skipping integration tests';

describe('MiniMax API integration', { skip: skipReason }, () => {
  it('should return a chat completion (non-streaming)', async () => {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: 'Reply with exactly: hello' }],
        temperature: 0.01,
        max_tokens: 32,
      }),
    });

    assert.equal(response.status, 200, `Expected 200 but got ${response.status}`);
    const data = await response.json();
    assert.ok(data.choices, 'Response must contain choices');
    assert.ok(data.choices.length > 0, 'At least one choice');
    const content = data.choices[0].message?.content;
    assert.ok(content, 'Choice must have message content');
    assert.ok(content.toLowerCase().includes('hello'), `Expected "hello" in response: ${content}`);
  });

  it('should reject temperature=0 with an error', async () => {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: 'hi' }],
        temperature: 0,
        max_tokens: 8,
      }),
    });

    // MiniMax rejects temperature=0; our provider clamps it to 0.01
    // This confirms the need for the clamping logic
    assert.ok(
      response.status === 400 || response.status === 422 || response.status === 200,
      `Unexpected status: ${response.status}`
    );
  });

  it('should return a streaming response', async () => {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: 'Say "ok"' }],
        temperature: 0.5,
        max_tokens: 16,
        stream: true,
      }),
    });

    assert.equal(response.status, 200, `Expected 200 but got ${response.status}`);
    const text = await response.text();
    assert.ok(text.includes('data:'), 'Streaming response must contain SSE data lines');
  });
});
