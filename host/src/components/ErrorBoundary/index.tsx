import { Component, ErrorInfo, ReactNode } from "react";

import { Alert } from "react-bootstrap"; 
interface Props {
  children?: ReactNode;
  errorWrapperContent?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.errorWrapperContent ?? (
          <>
            <Alert variant="warning" className="d-flex align-items-center">
              <Alert.Heading className="mr-2">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </Alert.Heading>
              <p>Something went wrong! </p>
            </Alert>
          </>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
