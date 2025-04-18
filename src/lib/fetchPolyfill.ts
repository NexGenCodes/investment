if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  window.fetch = async (url, options = {}) => {
    const sessionId = localStorage.getItem("session-id");
    if (sessionId && typeof url === "string" && url.includes("/auth/otp")) {
      options.headers = {
        ...options.headers,
        "X-Session-Id": sessionId,
      };
    }
    return originalFetch(url, options);
  };
}
