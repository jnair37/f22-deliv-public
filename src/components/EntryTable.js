import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';

import firebase from 'firebase/compat/app';

// Table component that displays entries on home screen

export default function EntryTable({ entries, sorted }) {

   // console.log("table");
   // console.log(sorted);

   // Boolean variable toggles name/views sorting
   if (sorted) 
   {
      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Link</TableCell>
                     <TableCell align="right">User</TableCell>
                     <TableCell align="right">Category</TableCell>
                     <TableCell align="right">Open</TableCell>
                     <TableCell align="right">Views </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {entries.sort((a, b) => a.name.localeCompare(b.name)).map((entry) => (
                     <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {entry.name}
                        </TableCell>
                        <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                        <TableCell align="right">{entry.user}</TableCell>
                        <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                        <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                           <EntryModal entry={entry} type="edit" user={firebase.auth().currentUser}/>
                        </TableCell>
                        <TableCell align="right">{entry.clicks}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   } 
   else
   {

   // Added column for clicks (new table cells in both header and body)
      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Link</TableCell>
                     <TableCell align="right">User</TableCell>
                     <TableCell align="right">Category</TableCell>
                     <TableCell align="right">Open</TableCell>
                     <TableCell align="right">Views </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {entries.sort((a, b) => b.clicks - a.clicks).map((entry) => (
                     <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {entry.name}
                        </TableCell>
                        <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                        <TableCell align="right">{entry.user}</TableCell>
                        <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                        <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                           <EntryModal entry={entry} type="edit" user={firebase.auth().currentUser}/>
                        </TableCell>
                        <TableCell align="right">{entry.clicks}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   }
   
}
