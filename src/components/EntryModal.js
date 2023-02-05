import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { documentId } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { categories } from '../utils/categories';
import { addEntry, updateEntry, deleteEntry } from '../utils/mutations';

// Modal component for individual entries.

/* EntryModal parameters:
entry: Data about the entry in question
type: Type of entry modal being opened. 
   This can be "add" (for adding a new entry) or 
   "edit" (for opening or editing an existing entry from table).
user: User making query (The current logged in user). */

//const sorted = React.createContext(false);

export default function EntryModal({ entry, type, user }) {

   // State variables for modal status
   //const[sorted, setSorted] = useState(false);

   // State variable to check if currently in edit mode
   const [editing, setEdit] = useState(false);

   const [open, setOpen] = useState(false);
   
   const [name, setName] = useState(entry.name);
   const [link, setLink] = useState(entry.link);
   const [description, setDescription] = useState(entry.description);
   const [category, setCategory] = React.useState(entry.category);
   const [clicks, setClicks] = useState(entry.clicks);

   // Modal visibility handlers

   const handleClickOpen = () => {
      setOpen(true);
      // If we're adding, set Edit to true automatically
      if (type == "add") setEdit(true);
      else setEdit(false);
      // console.log("got here !!");
      // console.log(user);
      
      setName(entry.name);
      setLink(entry.link);
      setDescription(entry.description);
      setCategory(entry.category);

      // The following logs the new click directly to database

      // console.log("before");
      // console.log(clicks);

      const newEntry = {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
         id: entry.id,
         clicks: clicks + 1
      };
      updateEntry(newEntry).catch(console.error);

      setClicks(clicks + 1);
      // console.log("after");
      // console.log(clicks);
   };

   const handleClose = () => {
      // No longer open or editing
      setOpen(false);
      setEdit(false);
   };

   // Mutation handlers

   const handleAdd = () => {
      const newEntry = {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
         id: entry.id,
         clicks: 0
      };


      // console.log("Adding user id");
      // console.log(user?.displayName);
      // console.log(user?.uid);
      addEntry(newEntry).catch(console.error);
      handleClose();
   };

   // Edit Mutation Handler -- just sets mode to editing
   const handleEdit = () => {
      // console.log("Editing user: ");
      // console.log(user);
      // console.log(user.displayName);
      // console.log(user.uid);
      setEdit(true); 

   };

   // Confirm Mutation Handler -- when the user confirms edits,
   // logs to the database
   const handleConfirm = () => {

      // console.log(user);
      // console.log(user.displayName);
      // console.log(user.uid);

      const newEntry = {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
         id: entry.id,
         clicks: entry.clicks
      };

      // console.log(user);

      // console.log(user.displayName);
      // console.log(user.uid);
      // console.log(" ");
      // console.log(name);
      // console.log(entry.id);
      
      // Calls corresponding function in mutations.js
      updateEntry(newEntry).catch(console.error);
      handleClose();
   };

   // Delete Mutation Handler
   const handleDelete = () => {
      const newEntry = {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
         id: entry.id,
         clicks: entry.clicks
      };

      // Calls corresponding function in mutations.js
      deleteEntry(newEntry).catch(console.error);
      handleClose();
   };

   // Sorting functionality

   // const handleSort = () => {
   //    window.sorted = true;
      
   //    console.log(window.sorted);

   // }

   // Button handlers for modal opening and inside-modal actions.
   // These buttons are displayed conditionally based on if adding or editing/opening.

   const openButton =
      type === "edit" ? <IconButton onClick={handleClickOpen}>
         <OpenInNewIcon />
      </IconButton>
         : type === "add" ? <Button variant="contained" onClick={handleClickOpen}>
            Add entry
         </Button>
            : null;
   
//    const sortButton = 
//    type === "add" ?
//    <Button variant="contained" onClick={handleSort}>
//    Sort by name
// </Button> : null;

   // Displays buttons based on whether in add mode, opened an existing entry, or actively editing an existing entry
   // In the case of an existing entry, if actively editing, shows Confirm button, otherwise shows Edit button
   const actionButtons =
      type === "edit" ?
         editing ?
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
               <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </DialogActions>
            : 
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleEdit}>Edit</Button>
               <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </DialogActions>
         : type === "add" ?
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleAdd}>Add Entry</Button>
               
            </DialogActions>
            : null;

   return (
      <div>
         {openButton} 
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
            <DialogContent>
               {/* Disables text fields if not in edit mode. */}
               <TextField
                  margin="normal"
                  id="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={!editing}
               />
               <TextField
                  margin="normal"
                  id="link"
                  label="Link"
                  placeholder="e.g. https://google.com"
                  fullWidth
                  variant="standard"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  disabled={!editing}
               />
               <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={8}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={!editing}
               />

               <FormControl fullWidth sx={{ "margin-top": 20 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={(event) => setCategory(event.target.value)}
                     disabled={!editing}
                  >
                     {categories.map((category) => (<MenuItem value={category.id}>{category.name}</MenuItem>))}
                  </Select>
               </FormControl>
            </DialogContent>
            {actionButtons}
         </Dialog>
      </div>
   );
}