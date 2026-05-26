import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled UI error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#FBF5E8',
            color: '#4A2E2C',
          }}
        >
          <div
            style={{
              maxWidth: '42rem',
              width: '100%',
              border: '2px solid #4A2E2C',
              borderRadius: '1rem',
              padding: '2rem',
              backgroundColor: '#FBF5E8',
              boxShadow: '0 10px 25px rgba(74, 46, 44, 0.15)',
            }}
          >
            <h1 style={{ margin: 0, color: '#FF9933' }}>Something went wrong</h1>
            <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              We hit an unexpected issue while loading this page. Please refresh and try again.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f3e7d0',
                  border: '1px solid #d2b48c',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
