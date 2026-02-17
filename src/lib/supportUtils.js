/**
 * Support Utilities
 * Provides functions for users to safely export and share logs with support team
 */

import logger from './logger';
import sanitizer from './sanitizer';

class SupportUtils {
  /**
   * Get a summary of the current session for support
   */
  static getSessionSummary() {
    const logs = logger.getLogs();
    const stats = logger.getStats();
    const redactionStats = sanitizer.getRedactionStats(logs);

    return {
      sessionTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      logStats: stats,
      redactionStats: redactionStats,
      totalLogs: logs.length,
      recentErrors: logger.getLogsByLevel('ERROR').slice(-10)
    };
  }

  /**
   * Export all logs as sanitized JSON (safe for user to share)
   */
  static exportSanitizedLogs() {
    logger.exportLogsAsJSON();
  }

  /**
   * Export all logs as sanitized CSV (safe for user to share)
   */
  static exportSanitizedLogsAsCSV() {
    logger.exportLogsAsCSV();
  }

  /**
   * Export all logs as sanitized text (safe for user to share)
   */
  static exportSanitizedLogsAsText() {
    logger.exportLogsAsText();
  }

  /**
   * Get sanitized logs for display in a support dialog
   */
  static getSanitizedLogsForDisplay(limit = 100) {
    return logger.getSanitizedLogs(limit);
  }

  /**
   * Get recent errors (last 20)
   */
  static getRecentErrors() {
    return logger.getLogsByLevel('ERROR').slice(-20);
  }

  /**
   * Get logs from a specific time range
   */
  static getLogsByTimeRange(startMinutesAgo, endMinutesAgo = 0) {
    const logs = logger.getLogs();
    const now = Date.now();
    const startTime = now - startMinutesAgo * 60 * 1000;
    const endTime = now - endMinutesAgo * 60 * 1000;

    return logs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime >= startTime && logTime <= endTime;
    });
  }

  /**
   * Copy sanitized logs to clipboard
   */
  static async copySanitizedLogsToClipboard() {
    try {
      const logs = logger.getLogs();
      const sanitized = logger.getSanitizedLogs();
      const text = sanitized
        .map(log => `[${log.timestamp}] ${log.level} [${log.source}] ${log.message}`)
        .join('\n');

      await navigator.clipboard.writeText(text);
      return { success: true, message: 'Logs copied to clipboard' };
    } catch (error) {
      return { success: false, message: `Failed to copy: ${error.message}` };
    }
  }

  /**
   * Generate a support report with sanitized logs
   */
  static generateSupportReport() {
    const summary = this.getSessionSummary();
    const recentLogs = logger.getSanitizedLogs(50);

    const report = {
      reportTime: new Date().toISOString(),
      sessionSummary: summary,
      recentLogs: recentLogs,
      instructions: 'This report contains sanitized logs safe to share with support team. Sensitive data has been redacted.'
    };

    return report;
  }

  /**
   * Download support report as JSON
   */
  static downloadSupportReport() {
    const report = this.generateSupportReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `support-report-${new Date().toISOString().slice(0, 19)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get redaction statistics
   */
  static getRedactionStats() {
    return sanitizer.getRedactionStats(logger.getLogs());
  }

  /**
   * Clear logs (user action)
   */
  static clearLogs() {
    logger.clearLogs();
    return { success: true, message: 'Logs cleared' };
  }
}

export default SupportUtils;
