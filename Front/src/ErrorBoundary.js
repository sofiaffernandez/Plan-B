//https://reactjs.org/docs/error-boundaries.html

import React from "react";

// Componente clasico (con class)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // donde devuelvo JSX
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        // Pongo fallback para mensaje personalizado
        return this.props.fallback;
      } else {
        return <h1>Algo falló</h1>;
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

