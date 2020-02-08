import {
  SUBSCRIBE_BASE_AA,
  LOAD_AA_LIST_REQUEST,
  LOAD_AA_LIST_SUCCESS,
  ADD_AA_TO_LIST,
  SUBSCRIBE_AA,
  CHANGE_ACTIVE_AA,
  ASSET_REQUEST,
  UPDATE_INFO_ACTIVE_AA
} from "../types/aa";

const initialState = {
  listByBase: [],
  listByBaseLoaded: [],
  active: null,
  activeInfo: null,
  activeAssetRequest: false,
  activeParams: {},
  activeCoins: {},
  activeDataFeed: null,
  activeDataFeedMa: null,
  subscribeBase: false,
  subscriptions: []
};

export const aaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_BASE_AA: {
      return {
        ...state,
        subscribeBase: true
      };
    }
    case LOAD_AA_LIST_REQUEST: {
      return {
        ...state,
        listByBaseLoaded: false
      };
    }
    case LOAD_AA_LIST_SUCCESS: {
      return {
        ...state,
        listByBase: action.payload,
        listByBaseLoaded: true
      };
    }
    case ASSET_REQUEST: {
      return {
        ...state,
        activeAssetRequest: true
      };
    }
    case ADD_AA_TO_LIST: {
      const newListByBase = state.listByBase.filter(
        aa => aa.address !== action.payload.address
      );
      return {
        ...state,
        listByBase: [...newListByBase, action.payload]
      };
    }
    case SUBSCRIBE_AA: {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload]
      };
    }
    case CHANGE_ACTIVE_AA: {
      return {
        ...state,
        active: action.payload.address,
        activeInfo: action.payload.aaVars || null,
        activeParams: action.payload.params,
        activeCoins: action.payload.coins,
        activeDataFeed: action.payload.data_feed,
        activeDataFeedMa: action.payload.data_feed_ma,
        // activeBalance: {
        //   loading: false
        // },
        activeAssetRequest: false
      };
    }
    case UPDATE_INFO_ACTIVE_AA: {
      return {
        ...state,
        activeInfo: action.payload.aaVars || null,
        activeCoins: action.payload.coins,
        activeDataFeed: action.payload.data_feed,
        activeDataFeedMa: action.payload.data_feed_ma
      };
    }
    default:
      return state;
  }
};
