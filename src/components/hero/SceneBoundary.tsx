import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface SceneBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface SceneBoundaryState {
  hasError: boolean
}

// If the 3D scene throws (for example the GPU context cannot be created), show the fallback instead.
export default class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { hasError: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('3D scene failed, showing static fallback.', error, info.componentStack)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}