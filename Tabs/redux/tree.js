// Types
export const LOAD_TREES="LOAD_TREES";
export const CHANGE_TREES="CHANGE_TREES";
export const FILTER_TREES="FILTER_TREES";

// Defined Actions
export const changeTrees = (parameter) => (
    {
        type:FILTER_TREES,
        payload:parameter
    }
)

// Tree layout:
// tree {
//      tag:
//      common_name:
//      scientific_name:
//      plot_id:
//      forest_type:
//      reserve:
//      status:
//}
// measurement {
//      tag:
//      date:
//      measurement:
//      carbon:
// }

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
        case LOAD_TREES:{
            
        }
        default: {
            return state;
        }
    }
}
export default treeReducer;
