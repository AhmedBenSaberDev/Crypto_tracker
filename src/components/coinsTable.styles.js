import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
    textArea:{
        width:'100%',
        marginBottom:'20px',
    },

    tableRow:{
        backgroundColor:'rgb(41, 38, 55)',
        cursor:"pointer",
        '&:hover':{
            backgroundColor:'rgba(63,81,181,0.6)'
        },
        transition:"all 0.2s"
        
    },
    pagination:{
        width:'100%',
        display:'flex' , 
        justifyContent:'center',
        margin:'20px 0',
        "& .MuiPaginationItem-root":{
            color:'#3f51b5'
        }
    },
    tableCell:{
        borderColor:'darkgrey',
        color:"#FFFFFFCC"
    },
    
}));


export default useStyles;