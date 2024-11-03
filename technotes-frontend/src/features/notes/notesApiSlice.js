import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({})
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => "/notes",
            validateStatus: (response, result) => {
                return response.status === 200 && !response.isError
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: "Note", id: "LIST"},
                        ...result.ids.map(id => ({type: "Note", id: "LIST"}))
                    ]
                } else return [{type: "Note", id: "LIST"}]
            }
        }),
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: "/notes",
                method: "POST",
                body: {
                    ...initialNote
                }
            }),
            invalidatesTags: [{ type: "Note", id: "LIST"}]
        }),
        updateNote: builder.mutation({
            query: initialNote => ({
                url: "/notes",
                method: "PATCH",
                body: {
                    ...initialNote
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }]
        }),
        deleteNote: builder.mutation({
            query: ({id}) => ({
                url: "/notes",
                method: "DELETE",
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }]
        })
    })
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice

const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)