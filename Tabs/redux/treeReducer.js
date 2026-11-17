// Types
export const CHANGE_TREES="CHANGE_TREES";
export const FILTER_TREES="FILTER_TREES";

// Defined Actions
export const changeTrees = (parameter) => (
    {
        type:FILTER_TREES,
        payload:parameter
    }
)

const initialState = {
    trees:{
        selected: [],
        unselected: []
    },
    measurements:[]
}

// Reducer
const treeReducer = (state=initialState,action)=>{
    switch(action.type){
        case FILTER_TREES:{

        }
        default: {
            return state;
        }
    }
}
export default treeReducer;
