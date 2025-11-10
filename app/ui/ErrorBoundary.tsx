"use client";

import React from "react";
import ErrorFallback from "./ErrorFallback";

type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  override state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: any) {
    // console + optional monitoring
    console.error("[ErrorBoundary]", error, info);
    // e.g. if using Sentry:
    // (window as any).Sentry?.captureException(error)
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error ?? undefined}
          reset={this.reset}
        />
      );
    }
    return this.props.children as React.ReactElement;
  }
}
