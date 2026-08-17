import { Component } from "react";

/**
 * Catches render errors from the whole tree so the app never goes fully blank.
 * Shows a friendly fallback with a reload button instead.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 text-center text-white">
          <p className="font-disp text-6xl font-bold text-primary">Oops!</p>
          <h1 className="mt-4 font-disp text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 max-w-md text-white/60">
            An unexpected error occurred on this page. Please try reloading.
          </p>
          <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-8">
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

