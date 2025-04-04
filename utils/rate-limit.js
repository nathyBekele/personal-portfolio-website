export function rateLimit({ interval, uniqueTokenPerInterval }) {
  const tokens = new Map();
  
  return {
    async check(limit, token) {
      const now = Date.now();
      const tokenCount = tokens.get(token) || [0];
      const [tokenLastReset, count] = tokenCount;

      if (now - tokenLastReset > interval) {
        tokens.set(token, [now, 1]);
        return;
      }

      if (count >= limit) {
        throw new Error('Rate limit exceeded');
      }

      tokens.set(token, [tokenLastReset, count + 1]);
      
      // Cleanup old tokens
      if (tokens.size > uniqueTokenPerInterval) {
        const oldTokens = [...tokens.entries()]
          .filter(([_, [timestamp]]) => now - timestamp > interval);
        for (const [key] of oldTokens) {
          tokens.delete(key);
        }
      }
    }
  };
} 