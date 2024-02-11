import React from "react";
import IsMobileContext from "./context";

// Define the shape of the state and props for TypeScript
interface State {
  size: {
    width: number;
    height: number;
  };
}

interface Props {}

const INITIAL_STATE: State = {
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

/*
 * We need a custom HOC for the provider because we need to update on resize.
 * This could be done within the provider definition, but it would get messy,
 * so we encapsulate it with its own HOC for clarity and maintainability.
 */
const withIsMobileViewProvider = (Component: React.ComponentType<Props>) => {
  class WithIsMobileViewProvider extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = INITIAL_STATE;
    }

    // Add listener to handle window resizing
    componentDidMount() {
      window.addEventListener("resize", this.handleWindowSizeChange);
    }

    // Ensure to clean up the event listener when the component unmounts
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({
        size: { width: window.innerWidth, height: window.innerHeight }
      });
    };

    render() {
      const isMobileView = this.state.size.width <= 600;
      return (
        <IsMobileContext.Provider value={isMobileView}>
          <Component {...this.props} />
        </IsMobileContext.Provider>
      );
    }
  }
  return WithIsMobileViewProvider;
};

export default withIsMobileViewProvider;
