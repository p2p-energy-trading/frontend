// src/components/ErrorBoundary.jsx
 
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-error">Something went wrong!</h2>
              <p className="text-base-content/70">
                We're sorry, but something unexpected happened. Please refresh
                the page and try again.
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
              {import.meta.env.NODE_ENV === "development" && (
                <div className="collapse collapse-arrow bg-base-200 mt-4">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium">
                    Error Details (Development)
                  </div>
                  <div className="collapse-content">
                    <pre className="text-xs overflow-auto">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
