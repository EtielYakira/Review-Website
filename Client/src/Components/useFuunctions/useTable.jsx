import { Table,TableContainer ,Paper } from "@material-ui/core"
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
  });
function useTable(records,headCells) {
    const classes = useStyles();
    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
    return {TblContainer}
}

export default useTable
