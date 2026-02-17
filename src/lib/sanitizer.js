/**
 * Log Sanitizer
 * Redacts sensitive information from logs while preserving debugging information
 * Safe for users to share with support team
 */

class LogSanitizer {
  constructor() {
    this.patterns = this.initializePatterns();
  }

  /**
   * Initialize redaction patterns
   */
  initializePatterns() {
    return {
      // API Keys and Tokens
      apiKey: {
        pattern: /api[_-]?key[:\s]*['"]*([a-zA-Z0-9_\-]{20,})['"]*\b/gi,
        replacement: 'api_key: [REDACTED_API_KEY]'
      },
      bearerToken: {
        pattern: /Bearer\s+([a-zA-Z0-9_\-\.]+)/gi,
        replacement: 'Bearer [REDACTED_TOKEN]'
      },
      jwtToken: {
        pattern: /eyJ[a-zA-Z0-9_\-\.]+/gi,
        replacement: '[REDACTED_JWT]'
      },
      
      // Email addresses
      email: {
        pattern: /[\w\.-]+@[\w\.-]+\.\w+/g,
        replacement: '[USER_EMAIL]'
      },
      
      // Database IDs (UUID format)
      uuid: {
        pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        replacement: (match) => `[ID_${match.substring(0, 5).toUpperCase()}]`
      },
      
      // API URLs
      apiUrl: {
        pattern: /https?:\/\/api\.[a-zA-Z0-9\.-]+\//gi,
        replacement: '/api/'
      },
      
      // Full URLs
      url: {
        pattern: /https?:\/\/[^\s"'<>]+/g,
        replacement: '[URL_REDACTED]'
      },
      
      // Database connection strings
      connectionString: {
        pattern: /mongodb:\/\/[^\s"'<>]+/gi,
        replacement: 'mongodb://[REDACTED_CONNECTION]'
      },
      
      // AWS/Cloud credentials
      awsKey: {
        pattern: /AKIA[0-9A-Z]{16}/g,
        replacement: '[REDACTED_AWS_KEY]'
      },
      
      // Phone numbers
      phone: {
        pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
        replacement: '[PHONE_REDACTED]'
      },
      
      // Credit card numbers
      creditCard: {
        pattern: /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g,
        replacement: '[CARD_REDACTED]'
      },
      
      // API Response content (truncate)
      responseContent: {
        pattern: /"content":\s*"[^"]{500,}"/g,
        replacement: (match) => {
          const truncated = match.substring(0, 100) + '..."';
          return `"content": "${truncated}[TRUNCATED]`;
        }
      },
      
      // Chat/Message content (truncate long responses)
      messageContent: {
        pattern: /"message":\s*"[^"]{300,}"/g,
        replacement: (match) => {
          const truncated = match.substring(0, 80) + '..."';
          return `"message": "${truncated}[TRUNCATED]`;
        }
      }
    };
  }

  /**
   * Sanitize a single log entry
   */
  sanitizeLogEntry(logEntry) {
    if (!logEntry || typeof logEntry !== 'object') {
      return logEntry;
    }

    const sanitized = { ...logEntry };

    // Sanitize message
    if (sanitized.message) {
      sanitized.message = this.sanitizeString(sanitized.message);
    }

    // Sanitize URL
    if (sanitized.url) {
      sanitized.url = this.sanitizeString(sanitized.url);
    }

    return sanitized;
  }

  /**
   * Sanitize a string by applying all redaction patterns
   */
  sanitizeString(str) {
    if (typeof str !== 'string') {
      return str;
    }

    let sanitized = str;

    // Apply all patterns
    Object.values(this.patterns).forEach(({ pattern, replacement }) => {
      if (typeof replacement === 'function') {
        sanitized = sanitized.replace(pattern, replacement);
      } else {
        sanitized = sanitized.replace(pattern, replacement);
      }
    });

    return sanitized;
  }

  /**
   * Sanitize an array of logs
   */
  sanitizeLogs(logs) {
    if (!Array.isArray(logs)) {
      return [];
    }

    return logs.map(log => this.sanitizeLogEntry(log));
  }

  /**
   * Export sanitized logs as JSON (safe for user to share)
   */
  exportSanitizedJSON(logs) {
    const sanitized = this.sanitizeLogs(logs);
    const dataStr = JSON.stringify(sanitized, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `support-logs-sanitized-${new Date().toISOString().slice(0, 19)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Export sanitized logs as CSV (safe for user to share)
   */
  exportSanitizedCSV(logs) {
    const sanitized = this.sanitizeLogs(logs);
    const headers = ['Timestamp', 'Level', 'Source', 'Message'];
    const rows = sanitized.map(log => [
      log.timestamp,
      log.level,
      log.source,
      `"${log.message.replace(/"/g, '""')}"` // Escape quotes for CSV
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `support-logs-sanitized-${new Date().toISOString().slice(0, 19)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Export sanitized logs as plain text (for copy-paste to support)
   */
  exportSanitizedText(logs) {
    const sanitized = this.sanitizeLogs(logs);
    const text = sanitized
      .map(log => `[${log.timestamp}] ${log.level} [${log.source}] ${log.message}`)
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `support-logs-sanitized-${new Date().toISOString().slice(0, 19)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get sanitized logs for display in UI
   */
  getSanitizedForDisplay(logs, limit = 50) {
    const sanitized = this.sanitizeLogs(logs);
    return sanitized.slice(-limit); // Return last N logs
  }

  /**
   * Get statistics about what was redacted
   */
  getRedactionStats(logs) {
    const stats = {
      totalLogs: logs.length,
      redactedItems: {
        apiKeys: 0,
        tokens: 0,
        emails: 0,
        urls: 0,
        ids: 0,
        truncated: 0
      }
    };

    logs.forEach(log => {
      const message = log.message || '';
      
      if (/\[REDACTED_API_KEY\]|\[REDACTED_TOKEN\]|\[REDACTED_JWT\]/.test(message)) {
        stats.redactedItems.tokens++;
      }
      if (/\[USER_EMAIL\]/.test(message)) {
        stats.redactedItems.emails++;
      }
      if (/\[URL_REDACTED\]|\/api\//.test(message)) {
        stats.redactedItems.urls++;
      }
      if (/\[ID_[A-Z0-9]+\]/.test(message)) {
        stats.redactedItems.ids++;
      }
      if (/\[TRUNCATED\]/.test(message)) {
        stats.redactedItems.truncated++;
      }
    });

    return stats;
  }
}

// Create singleton instance
const sanitizer = new LogSanitizer();

export default sanitizer;
