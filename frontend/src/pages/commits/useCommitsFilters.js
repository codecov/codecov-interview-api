/* eslint-disable arrow-body-style */
import * as React from "react";

const ActionTypes = {
  SET_REPO: "SET_REPO",
  SET_PAGE: "SET_PAGE",
  SET_OWNER: "SET_OWNER",
  SET_BRANCH: "SET_BRANCH",
  SET_AUTHOR: "SET_AUTHOR",
  SET_PER_PAGE: "SET_PER_PAGE"
};

function gitFiltersReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_REPO: {
      return {
        ...state,
        filters: {...initialState.filters, perPage: state.perPage},
        query: {
          ...state.query,
          repo: action.payload
        }
      };
    }
    case ActionTypes.SET_OWNER: {
      return {
        ...state,
        filters: {...initialState.filters, perPage: state.perPage},
        query: {
          ...state.query,
          owner: action.payload
        }
      };
    }
    case ActionTypes.SET_AUTHOR: {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          page: initialState.filters.page,
          author: action.payload
        }
      };
    }
    case ActionTypes.SET_PAGE: {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          page: action.payload
        }
      };
    }
    case ActionTypes.SET_PER_PAGE: {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          perPage: action.payload
        }
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initialState = {
  query: {
    owner: "pytest-dev",
    repo: "pytest"
  },
  filters: {
    page: 1,
    author: undefined,
    perPage: 10
  }
};

export function useCommitsFilters(initialStateProp) {
  const [state, dispatch] = React.useReducer(
    gitFiltersReducer,
    initialStateProp ?? initialState
  );

  const updateAuthor = React.useCallback((author) => {
    dispatch({type: ActionTypes.SET_AUTHOR, payload: author});
  }, []);
  const updateRepo = React.useCallback((repo) => {
    dispatch({type: ActionTypes.SET_REPO, payload: repo});
  }, []);
  const updatePage = React.useCallback((page) => {
    dispatch({type: ActionTypes.SET_PAGE, payload: page});
  }, []);
  const updatePerPage = React.useCallback((perPage) => {
    dispatch({type: ActionTypes.SET_PER_PAGE, payload: perPage});
  }, []);
  const updateOwner = React.useCallback((owner) => {
    dispatch({type: ActionTypes.SET_OWNER, payload: owner});
  }, []);

  return {
    filters: state,
    updateRepo,
    updatePage,
    updateOwner,
    updateAuthor,
    updatePerPage
  };
}
