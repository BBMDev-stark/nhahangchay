"use client";

import {
  Component,
  type ReactNode,
} from "react";

type DishCanvasBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError: () => void;
};

type DishCanvasBoundaryState = {
  failed: boolean;
};

export class DishCanvasBoundary extends Component<
  DishCanvasBoundaryProps,
  DishCanvasBoundaryState
> {
  state: DishCanvasBoundaryState = { failed: false };

  static getDerivedStateFromError(): DishCanvasBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
