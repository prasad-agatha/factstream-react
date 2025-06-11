import React from 'react';

export interface IWalkThroughState {
  annotation?: any;
}
export const initialState = {
  annotation: null,
};
export const WalkThroughContext = React.createContext<IWalkThroughState>(initialState);
export const WalkThroughDispatchContext = React.createContext<any>(undefined);
export const WalkThroughReducer = (state: IWalkThroughState, action: any) => {
  switch (action.type) {
    case 'parsed_data':
      return {
        ...state,
        annotation: action.payload,
      };

    default:
      return state;
  }
};
export const AppProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(WalkThroughReducer, initialState);
  // console.log(state);

  return (
    <WalkThroughContext.Provider value={state}>
      <WalkThroughDispatchContext.Provider value={dispatch}>
        {props.children}
      </WalkThroughDispatchContext.Provider>
    </WalkThroughContext.Provider>
  );
};
export const useWalkThroughState = () => {
  const data = React.useContext(WalkThroughContext);
  return data;
};
export const useWalkThroughDispatch = () => {
  const dispatch = React.useContext(WalkThroughDispatchContext);
  return dispatch;
};
